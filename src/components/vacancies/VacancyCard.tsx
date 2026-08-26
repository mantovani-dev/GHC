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
import { GlassCard } from "@/components/ui/glass-card";
import { Flag } from "@/components/ui/flag";
import { entryStyles } from "@/components/vacancies/entry-styles";
import { countryOf, type Vacancy } from "@/data/vacancies";

interface VacancyCardProps {
  vacancy: Vacancy;
  /** Link usado quando o país não tem formulário próprio. */
  communityLink: string;
}

const VacancyCard = ({ vacancy, communityLink }: VacancyCardProps) => {
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
        <span className="inline-flex items-center gap-2 text-[12.5px] font-medium text-foreground/60">
          <Flag code={vacancy.country} />
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
            <span className="text-[13px] font-normal text-foreground/40">
              {" "}
              / {t("vacancies.month")}
            </span>
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
      <div className="mt-auto pt-5">
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

export default VacancyCard;
