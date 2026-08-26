import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { AnimateIn } from "@/components/ui/animate-in";
import { GlassCard } from "@/components/ui/glass-card";
import { Flag } from "@/components/ui/flag";
import { vacancies, countries, countByCountry, VACANCIES_UPDATED_AT } from "@/data/vacancies";

interface VacanciesTeaserProps {
  id?: string;
}

/**
 * Chamada enxuta na home. O quadro completo mora em /vagas — aqui fica só o
 * suficiente para quem rola a página descobrir que existem vagas abertas.
 */
const VacanciesTeaser = ({ id }: VacanciesTeaserProps) => {
  const { t, i18n } = useTranslation();

  const updatedAt = new Date(`${VACANCIES_UPDATED_AT}T12:00:00`).toLocaleDateString(
    i18n.language,
    { day: "numeric", month: "long", year: "numeric" }
  );

  return (
    <section id={id} className="wrap sec pt-0">
      <AnimateIn>
        <GlassCard className="overflow-hidden p-[clamp(28px,4vw,48px)]">
          <div className="grid items-center gap-[clamp(28px,4vw,56px)] min-[901px]:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            {/* Texto */}
            <div>
              <span className="eyebrow">
                <span className="eyebrow-dot" />
                {t("vacancies.tag")}
              </span>

              <h2 className="h2-orbita mt-[22px]">
                {t("vacancies.title", { count: vacancies.length })}{" "}
                <b className="grad">{t("vacancies.titleAccent")}</b>
              </h2>

              <p className="lead-orbita mt-[22px] max-w-[520px]">
                {t("vacancies.teaser")}
              </p>

              <p className="mono mt-4 text-foreground/40">
                {t("vacancies.updatedAt", { date: updatedAt })}
              </p>

              <Button
                asChild
                variant="orbita"
                size="orbitaLg"
                className="mt-8 max-[600px]:w-full max-[600px]:justify-center"
              >
                <Link to="/vagas">
                  {t("vacancies.heroCta")}
                  <ArrowRight />
                </Link>
              </Button>
            </div>

            {/* Países */}
            <ul className="grid gap-2.5">
              {countries.map((c) => (
                <li key={c.code}>
                  <Link
                    to="/vagas"
                    className="group flex items-center gap-3.5 rounded-glass border border-white/[0.07] bg-white/[0.02] px-4 py-3.5 transition-all duration-[240ms] ease-orbita hover:border-accent/40 hover:bg-accent/[0.05]"
                  >
                    <Flag code={c.code} className="h-[22px] w-[33px] rounded-[4px]" />
                    <span className="flex-1 text-[15px] font-semibold tracking-[-0.01em]">
                      {c.name}
                    </span>
                    <span className="mono text-foreground/45">
                      {t("vacancies.countLabel", { count: countByCountry(c.code) })}
                    </span>
                    <ArrowRight className="h-4 w-4 text-foreground/25 transition-colors group-hover:text-accent" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </GlassCard>
      </AnimateIn>
    </section>
  );
};

export default VacanciesTeaser;
