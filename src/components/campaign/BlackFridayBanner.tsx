import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { AnimateIn } from "@/components/ui/animate-in";
import { vacancies } from "@/data/vacancies";
import { useCountdown } from "./useBlackFriday";

/** Duas casas sempre: o relógio não pode "pular" de largura entre 9 e 10. */
const duas = (n: number) => String(n).padStart(2, "0");

const Countdown = () => {
  const { t } = useTranslation();
  const { dias, horas, minutos, segundos } = useCountdown();

  const casas = [
    { valor: dias, rotulo: t("blackFriday.days") },
    { valor: horas, rotulo: t("blackFriday.hours") },
    { valor: minutos, rotulo: t("blackFriday.minutes") },
    { valor: segundos, rotulo: t("blackFriday.seconds") },
  ];

  return (
    <div>
      <p className="bf-clock-label">{t("blackFriday.endsIn")}</p>

      {/* role="timer" sem aria-live: anunciar a cada segundo tornaria a
          página inutilizável para quem usa leitor de tela. O prazo fixo,
          logo abaixo, é o que ele lê. */}
      <div className="bf-clock" role="timer" aria-live="off">
        {casas.map((c) => (
          <div key={c.rotulo} className="bf-tile">
            <span className="bf-num">{duas(c.valor)}</span>
            <span className="bf-unit">{c.rotulo}</span>
          </div>
        ))}
      </div>

      <p className="bf-deadline">{t("blackFriday.deadline")}</p>
    </div>
  );
};

interface BlackFridayBannerProps {
  /** "home" leva para /vagas; "board" fica no topo do próprio quadro. */
  variant: "home" | "board";
}

/**
 * Arte da campanha de Black Friday.
 *
 * Sem filter: blur nem backdrop-filter — os dois foram tirados do site por
 * travarem o Safari do iPhone. O brilho aqui é só gradiente e text-shadow,
 * que a GPU do celular desenha sem custo perceptível.
 */
const BlackFridayBanner = ({ variant }: BlackFridayBannerProps) => {
  const { t } = useTranslation();
  const chamada = `${t("blackFriday.ticker")} ✦`;

  const conteudo = (
    <div className="bf">
      {/* Faixa corrida no topo. Duplicada para o laço não ter emenda. */}
      <div className="bf-ticker" aria-hidden="true">
        <div className="bf-ticker-track">
          {Array.from({ length: 16 }, (_, i) => (
            <span key={i}>{chamada}</span>
          ))}
        </div>
      </div>

      <div className="bf-body">
        <div>
          <span className="bf-eyebrow">
            <span className="bf-eyebrow-dot" />
            {t("blackFriday.eyebrow")}
          </span>

          <h2 className="bf-title">
            <span>{t("blackFriday.title1")}</span>
            <span className="bf-outline">{t("blackFriday.title2")}</span>
          </h2>

          <p className="bf-lead">
            {t(variant === "home" ? "blackFriday.lead" : "blackFriday.leadBoard", {
              count: vacancies.length,
            })}
          </p>

          {variant === "home" && (
            <Button
              asChild
              variant="orbita"
              size="orbitaLg"
              className="mt-8 max-[600px]:w-full max-[600px]:justify-center"
            >
              <Link to="/vagas">
                {t("blackFriday.cta")}
                <ArrowRight />
              </Link>
            </Button>
          )}
        </div>

        <Countdown />
      </div>
    </div>
  );

  if (variant === "board") return <AnimateIn>{conteudo}</AnimateIn>;

  return (
    <section className="wrap sec pt-0">
      <AnimateIn>{conteudo}</AnimateIn>
    </section>
  );
};

export default BlackFridayBanner;
