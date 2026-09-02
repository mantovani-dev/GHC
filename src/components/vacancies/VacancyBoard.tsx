import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { AnimateIn } from "@/components/ui/animate-in";
import { GlassCard } from "@/components/ui/glass-card";
import { Flag } from "@/components/ui/flag";
import { useCommunityLink } from "@/hooks/useCommunityLink";
import VacancyCard from "@/components/vacancies/VacancyCard";
import { entryStyles } from "@/components/vacancies/entry-styles";
import {
  vacancies,
  countries,
  countByCountry,
  type CountryCode,
  type EntryType,
} from "@/data/vacancies";

type Filter = CountryCode | "all";

const entryTypes: EntryType[] = [
  "imediato",
  "imediatoOuFuturo",
  "futuro",
  "confirmar",
];

/** Quadro completo: filtro por país, grade de vagas e as ressalvas. */
const VacancyBoard = () => {
  const { t } = useTranslation();
  const communityLink = useCommunityLink();
  const [filter, setFilter] = useState<Filter>("all");

  const shown = filter === "all" ? vacancies : vacancies.filter((v) => v.country === filter);

  return (
    <>
      {/* Filtro por país — trilha rolável no celular, linha única no desktop */}
      <AnimateIn>
        <div
          className="vac-filters"
          role="group"
          aria-label={t("vacancies.filterLabel")}
        >
          <button
            onClick={() => setFilter("all")}
            aria-pressed={filter === "all"}
            className={cn("vac-pill", filter === "all" && "vac-pill-on")}
          >
            {t("vacancies.filterAll")}
            <span className="vac-pill-count">{vacancies.length}</span>
          </button>

          {countries.map((c) => (
            <button
              key={c.code}
              onClick={() => setFilter(c.code)}
              aria-pressed={filter === c.code}
              className={cn("vac-pill", filter === c.code && "vac-pill-on")}
            >
              <Flag code={c.code} />
              {c.name}
              <span className="vac-pill-count">{countByCountry(c.code)}</span>
            </button>
          ))}
        </div>

        {/* Quantas vagas o filtro atual mostra */}
        <p className="mono mt-4 text-foreground/40" aria-live="polite">
          {t("vacancies.showing", { count: shown.length })}
        </p>
      </AnimateIn>

      {/* Legenda dos prazos de ingresso */}
      <AnimateIn className="mt-6">
        <GlassCard className="p-5">
          <dl className="vac-legend">
            {entryTypes.map((e) => (
              <div key={e}>
                <dt>
                  <span className={cn("vac-badge", entryStyles[e])}>
                    {t(`vacancies.entry.${e}.label`)}
                  </span>
                </dt>
                <dd>{t(`vacancies.entry.${e}.hint`)}</dd>
              </div>
            ))}
          </dl>
        </GlassCard>
      </AnimateIn>

      {/* Grade de vagas */}
      <div className="vac-grid mt-6">
        {shown.map((vacancy, index) => (
          <AnimateIn key={vacancy.code} delay={(index % 3) * 70}>
            <VacancyCard vacancy={vacancy} communityLink={communityLink} />
          </AnimateIn>
        ))}
      </div>

      {/* Ressalvas */}
      <AnimateIn className="mt-10">
        <GlassCard className="p-6 md:p-8">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-[18px] w-[18px] shrink-0 text-accent" />
            <div>
              <h2 className="text-[15px] font-semibold tracking-[-0.01em]">
                {t("vacancies.notice.title")}
              </h2>
              <ul className="mt-3 grid gap-2 text-[13.5px] leading-[1.6] text-foreground/60">
                {(t("vacancies.notice.items", { returnObjects: true }) as string[]).map(
                  (item, i) => (
                    <li key={i} className="flex gap-2">
                      <span aria-hidden="true" className="text-accent/60">
                        ·
                      </span>
                      {item}
                    </li>
                  )
                )}
              </ul>
              <p className="mt-4 text-[12.5px] leading-[1.55] text-foreground/40">
                {t("vacancies.exchangeNote")}
              </p>
            </div>
          </div>
        </GlassCard>
      </AnimateIn>
    </>
  );
};

export default VacancyBoard;
