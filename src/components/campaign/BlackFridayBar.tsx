import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { vacancies } from "@/data/vacancies";
import { useBlackFridayActive, useCountdown } from "./useBlackFriday";

const duas = (n: number) => String(n).padStart(2, "0");

/** Relógio compacto da faixa — só existe enquanto a campanha está no ar. */
const Relogio = () => {
  const { dias, horas, minutos, segundos } = useCountdown();
  return (
    <span className="bf-bar-clock" role="timer" aria-live="off">
      {duas(dias)}d {duas(horas)}h {duas(minutos)}m{" "}
      {/* Segundos ficam de fora no celular: a faixa precisa caber numa linha */}
      <span className="max-[600px]:hidden">{duas(segundos)}s</span>
    </span>
  );
};

/**
 * Faixa da Black Friday, acima do menu.
 *
 * Fica fora do <header> de propósito: o header é sticky, e se a faixa
 * morasse dentro dele grudaria no topo junto, comendo tela do celular o
 * tempo todo. Aqui ela aparece ao abrir a página e sai ao rolar; o menu
 * continua fixo como sempre.
 *
 * Some sozinha no fim do prazo, junto com a arte grande.
 */
const BlackFridayBar = () => {
  const { t } = useTranslation();
  const ativa = useBlackFridayActive();

  if (!ativa) return null;

  return (
    <Link to="/vagas" className="bf-bar" aria-label={t("blackFriday.barAria")}>
      <span className="bf-bar-inner">
        <span className="bf-bar-tag">{t("blackFriday.tag")}</span>

        <span className="bf-bar-text max-[760px]:hidden">
          {t("blackFriday.barText", { count: vacancies.length })}
        </span>

        <span className="bf-bar-ends">
          <span className="max-[420px]:hidden">{t("blackFriday.barEndsIn")} </span>
          <Relogio />
        </span>

        <span className="bf-bar-cta">
          <span className="max-[600px]:hidden">{t("blackFriday.barCta")}</span>
          <ArrowRight />
        </span>
      </span>
    </Link>
  );
};

export default BlackFridayBar;
