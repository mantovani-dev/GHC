import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import Seo from "@/components/Seo";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import AmbientBackground from "@/components/layout/AmbientBackground";
import { AnimateIn } from "@/components/ui/animate-in";
import { Flag } from "@/components/ui/flag";
import VacancyBoard from "@/components/vacancies/VacancyBoard";
import { vacancies, countries, countByCountry, VACANCIES_UPDATED_AT } from "@/data/vacancies";

const Vacancies = () => {
  const { t, i18n } = useTranslation();

  const updatedAt = new Date(`${VACANCIES_UPDATED_AT}T12:00:00`).toLocaleDateString(
    i18n.language,
    { day: "numeric", month: "long", year: "numeric" }
  );

  return (
    <>
      <Seo page="vacancies" />

      <div className="orbita relative">
        <AmbientBackground />

        <Header />

        <main className="relative z-[1]">
          <div className="wrap pb-[clamp(48px,6vw,72px)] pt-[clamp(28px,4vw,48px)]">
            <AnimateIn>
              <Link
                to="/"
                className="mono inline-flex items-center gap-2 text-foreground/40 transition-colors hover:text-accent"
              >
                <ArrowLeft className="h-[14px] w-[14px]" />
                {t("vacancies.backHome")}
              </Link>

              <span className="eyebrow mt-6 flex w-fit">
                <span className="eyebrow-dot" />
                {t("vacancies.tag")}
              </span>

              <h1 className="h1-orbita mt-[22px]">
                {t("vacancies.title", { count: vacancies.length })}{" "}
                <b className="grad">{t("vacancies.titleAccent")}</b>
              </h1>

              <p className="lead-orbita mt-[26px] max-w-[640px]">
                {t("vacancies.description")}
              </p>

              <p className="mono mt-4 text-foreground/40">
                {t("vacancies.updatedAt", { date: updatedAt })}
              </p>
            </AnimateIn>

            {/* Resumo por país */}
            <AnimateIn className="mt-9 flex flex-wrap gap-2.5">
              {countries.map((c) => (
                <span
                  key={c.code}
                  className="inline-flex items-center gap-2.5 rounded-pill border border-white/[0.08] bg-white/[0.02] px-4 py-2.5"
                >
                  <Flag code={c.code} />
                  <span className="text-[13.5px] font-medium">{c.name}</span>
                  <span className="mono text-foreground/45">
                    {t("vacancies.countLabel", { count: countByCountry(c.code) })}
                  </span>
                </span>
              ))}
            </AnimateIn>
          </div>

          <div className="wrap pb-[clamp(72px,8vw,120px)]">
            <VacancyBoard />
          </div>
        </main>

        <Footer />
      </div>

      <WhatsAppFloat />
    </>
  );
};

export default Vacancies;
