import {
  MapPin,
  Clock,
  AlertTriangle,
  ArrowRight,
  ChevronDown,
  MessageCircle,
  ListChecks,
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

  /* Cada informação do material vira um bloco nomeado. Local e jornada não
     entram aqui: ficam sempre visíveis, acima do botão de especificações. */
  const specs = [
    { label: t("vacancies.specs.requirements"), value: vacancy.requirements },
    /* Nem toda vaga do material descreve o dia a dia */
    ...(vacancy.duties ? [{ label: t("vacancies.specs.duties"), value: vacancy.duties }] : []),
    { label: t("vacancies.specs.benefits"), value: vacancy.benefits },
  ];

  return (
    <GlassCard as="article" hover id={`vaga-${vacancy.code}`} className="flex h-full flex-col p-6">
      {/* Topo: país + prazo de ingresso */}
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex items-center gap-2 text-[12.5px] font-medium text-foreground/70">
          <Flag code={vacancy.country} />
          {country.name}
        </span>
        <span className={cn("vac-badge shrink-0", entryStyles[vacancy.entry])}>
          {t(`vacancies.entry.${vacancy.entry}.label`)}
        </span>
      </div>

      {/* Código e selo de vaga nova */}
      <div className="mono mt-4 flex items-center gap-2 text-foreground/40">
        <span>#{vacancy.code}</span>
        {vacancy.isNew && <span className="text-accent">{t("vacancies.newBadge")}</span>}
      </div>

      <h3 className="mb-4 mt-1.5 text-[17px] font-semibold leading-[1.3] tracking-[-0.015em]">
        {vacancy.title}
        {vacancy.context && (
          <span className="block text-[14px] font-normal text-foreground/60">
            {vacancy.context}
          </span>
        )}
      </h3>

      {/* Remuneração: real em destaque, moeda local logo abaixo */}
      <div className="vac-pay">
        {vacancy.salaryBRL ? (
          <div className="vac-pay-brl">
            <span className="grad">{vacancy.salaryBRL}</span>
            <span className="text-[13px] font-normal text-foreground/45">
              {" "}
              / {t("vacancies.month")}
            </span>
          </div>
        ) : (
          <div className="vac-pay-brl text-foreground/75">{t("vacancies.onRequest")}</div>
        )}
        <div className="vac-pay-local">{vacancy.salaryLocal}</div>
      </div>

      {/* Local e jornada — o que mais se procura, sempre visível */}
      <ul className="vac-meta mt-4">
        <li>
          <MapPin className="h-[15px] w-[15px]" />
          <span>{vacancy.location}</span>
        </li>
        <li>
          <Clock className="h-[15px] w-[15px]" />
          <span>{vacancy.schedule}</span>
        </li>
      </ul>

      {/* Especificações — ficam no DOM mesmo fechadas, para busca e leitores de tela */}
      <details className="vac-details mt-4">
        <summary className="vac-toggle">
          <ListChecks className="h-4 w-4 shrink-0" />
          <span className="vac-when-closed">{t("vacancies.detailsShow")}</span>
          <span className="vac-when-open">{t("vacancies.detailsHide")}</span>
          <ChevronDown className="vac-chevron h-4 w-4 shrink-0" />
        </summary>

        <dl className="vac-specs">
          {specs.map((spec) => (
            <div key={spec.label}>
              <dt>{spec.label}</dt>
              <dd>{spec.value}</dd>
            </div>
          ))}
        </dl>

        {vacancy.warning && (
          <p className="vac-warning">
            <AlertTriangle className="h-[15px] w-[15px]" />
            <span>
              <strong className="font-semibold">{t("vacancies.specs.warning")}: </strong>
              {vacancy.warning}
            </span>
          </p>
        )}
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
