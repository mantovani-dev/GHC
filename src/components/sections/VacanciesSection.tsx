import { useState } from "react";
import {
  MapPin,
  Clock,
  ClipboardList,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ChevronDown,
  MessageCircle,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AnimateIn } from "@/components/ui/animate-in";
import { GlassCard } from "@/components/ui/glass-card";
import { useCommunityLink } from "@/hooks/useCommunityLink";
import {
  vacancies,
  countries,
  countryOf,
  countByCountry,
  VACANCIES_UPDATED_AT,
  type CountryCode,
  type EntryType,
  type Vacancy,
} from "@/data/vacancies";

interface VacanciesSectionProps {
  id?: string;
}

type Filter = CountryCode | "all";

/* Só tons da paleta: ciano para o que já pode embarcar, neutros para o resto */
const entryStyles: Record<EntryType, string> = {
  imediato: "border-accent/40 bg-accent/[0.12] text-accent",
  futuro: "border-white/[0.14] bg-white/[0.05] text-foreground/70",
  confirmar: "border-white/[0.1] text-foreground/45",
};

const VacanciesSection = ({ id }: VacanciesSectionProps) => {
  const { t, i18n } = useTranslation();
  const communityLink = useCommunityLink();
  const [filter, setFilter] = useState<Filter>("all");

  const updatedAt = new Date(`${VACANCIES_UPDATED_AT}T12:00:00`).toLocaleDateString(
    i18n.language,
    { day: "numeric", month: "long", year: "numeric" }
  );

  const shown = filter === "all" ? vacancies : vacancies.filter((v) => v.country === filter);

  const filters: { key: Filter; label: string; flag?: string; count: number }[] = [
    { key: "all", label: t("vacancies.filterAll"), count: vacancies.length },
    ...countries.map((c) => ({
      key: c.code as Filter,
      label: c.name,
      flag: c.flag,
      count: countByCountry(c.code),
    })),
  ];

  return (
    <section id={id} className="wrap sec pt-0">
      {/* Cabeçalho */}
      <AnimateIn>
        <span className="eyebrow">
          <span className="eyebrow-dot" />
          {t("vacancies.tag")}
        </span>

        <h2 className="h2-orbita mt-[22px]">
          {t("vacancies.title", { count: vacancies.length })}{" "}
          <b className="grad">{t("vacancies.titleAccent")}</b>
        </h2>

        <p className="lead-orbita mt-[26px] max-w-[640px]">{t("vacancies.description")}</p>

        <p className="mono mt-4 text-foreground/40">
          {t("vacancies.updatedAt", { date: updatedAt })}
        </p>
      </AnimateIn>

      {/* Filtro por país */}
      <AnimateIn className="mt-9 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            aria-pressed={filter === f.key}
            className={cn(
              "vac-pill",
              filter === f.key && "vac-pill-on"
            )}
          >
            {f.flag && <span aria-hidden="true">{f.flag}</span>}
            {f.label}
            <span className="vac-pill-count">{f.count}</span>
          </button>
        ))}
      </AnimateIn>

      {/* Legenda dos prazos de ingresso */}
      <AnimateIn className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[12.5px] leading-[1.5] text-foreground/45">
        {(["imediato", "futuro", "confirmar"] as EntryType[]).map((e) => (
          <span key={e} className="inline-flex items-start gap-2">
            <span className={cn("vac-badge mt-px shrink-0", entryStyles[e])}>
              {t(`vacancies.entry.${e}.label`)}
            </span>
            {t(`vacancies.entry.${e}.hint`)}
          </span>
        ))}
      </AnimateIn>

      {/* Quadro de vagas */}
      <div className="vac-grid mt-8">
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
              <h3 className="text-[15px] font-semibold tracking-[-0.01em]">
                {t("vacancies.notice.title")}
              </h3>
              <ul className="mt-3 grid gap-2 text-[13.5px] leading-[1.6] text-foreground/50">
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
              <p className="mt-4 text-[12.5px] leading-[1.55] text-foreground/35">
                {t("vacancies.exchangeNote")}
              </p>
            </div>
          </div>
        </GlassCard>
      </AnimateIn>
    </section>
  );
};

/* ------------------------------------------------------------------ */

const VacancyCard = ({
  vacancy,
  communityLink,
}: {
  vacancy: Vacancy;
  communityLink: string;
}) => {
  const { t } = useTranslation();
  const country = countryOf(vacancy.country);
  const applyUrl = country.formUrl ?? communityLink;

  const rows = [
    { icon: MapPin, value: vacancy.location },
    { icon: Clock, value: vacancy.schedule },
    { icon: ClipboardList, value: vacancy.requirements },
    { icon: CheckCircle2, value: vacancy.benefits },
  ];

  return (
    <GlassCard
      as="article"
      hover
      id={`vaga-${vacancy.code}`}
      className="flex h-full flex-col p-6"
    >
      {/* Topo: país + prazo de ingresso */}
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-foreground/60">
          <span aria-hidden="true">{country.flag}</span>
          {country.name}
        </span>
        <span className={cn("vac-badge shrink-0", entryStyles[vacancy.entry])}>
          {t(`vacancies.entry.${vacancy.entry}.label`)}
        </span>
      </div>

      {/* Código e selo de vaga nova */}
      <div className="mono mt-4 flex items-center gap-2 text-foreground/35">
        <span>#{vacancy.code}</span>
        {vacancy.isNew && <span className="text-accent">{t("vacancies.newBadge")}</span>}
      </div>

      <h3 className="mt-1.5 text-[17px] font-semibold leading-[1.3] tracking-[-0.015em]">
        {vacancy.title}
        {vacancy.context && (
          <span className="block text-[14px] font-normal text-foreground/50">
            {vacancy.context}
          </span>
        )}
      </h3>

      {/* Remuneração */}
      <div className="mt-4 border-t border-white/[0.07] pt-4">
        {vacancy.salaryBRL ? (
          <div className="text-[22px] font-semibold leading-none tracking-[-0.03em]">
            <span className="grad">{vacancy.salaryBRL}</span>
            <span className="text-[13px] font-normal text-foreground/40"> / {t("vacancies.month")}</span>
          </div>
        ) : (
          <div className="text-[17px] font-semibold leading-none tracking-[-0.02em] text-foreground/70">
            {t("vacancies.onRequest")}
          </div>
        )}
        <div className="mt-2 text-[12.5px] leading-[1.5] text-foreground/45">
          {vacancy.salaryLocal}
        </div>
      </div>

      {/* Detalhes — ficam no DOM mesmo fechados, para busca e leitores de tela */}
      <details className="vac-details mt-4">
        <summary>
          {t("vacancies.detailsLabel")}
          <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
        </summary>
        <div className="mt-3 grid gap-2.5">
          {rows.map((row, i) => (
            <div key={i} className="flex gap-2.5 text-[13px] leading-[1.55] text-foreground/50">
              <row.icon className="mt-0.5 h-[15px] w-[15px] shrink-0 text-accent/70" />
              <span>{row.value}</span>
            </div>
          ))}
          {vacancy.warning && (
            <div className="flex gap-2.5 text-[13px] leading-[1.55] text-foreground/70">
              <AlertTriangle className="mt-0.5 h-[15px] w-[15px] shrink-0 text-accent" />
              <span>{vacancy.warning}</span>
            </div>
          )}
        </div>
      </details>

      {/* Inscrição */}
      <div className="mt-5 pt-1">
        <Button
          variant="orbita"
          size="orbita"
          className="w-full justify-center"
          onClick={() => window.open(applyUrl, "_blank", "noopener,noreferrer")}
        >
          {country.formUrl ? (
            <>
              {t("vacancies.apply")}
              <ArrowRight />
            </>
          ) : (
            <>
              <MessageCircle />
              {t("vacancies.applyWhatsapp")}
            </>
          )}
        </Button>
      </div>
    </GlassCard>
  );
};

export default VacanciesSection;
