import { useEffect, useState } from "react";
import { BLACK_FRIDAY_ENDS_AT, isBlackFridayActive } from "@/data/campaign";

/**
 * Diz se a campanha está no ar e vira sozinho no instante em que ela acaba.
 *
 * Não fica contando de segundo em segundo: agenda um único disparo para o
 * fim. Assim os cards e a troca de bloco na home não renderizam a cada
 * segundo à toa — só o relógio precisa disso.
 */
export const useBlackFridayActive = (): boolean => {
  const [ativa, setAtiva] = useState(() => isBlackFridayActive());

  useEffect(() => {
    if (!ativa) return;
    const falta = BLACK_FRIDAY_ENDS_AT - Date.now();
    /* setTimeout estoura acima de ~24,8 dias e dispararia na hora. Longe do
       fim, não agenda — a página certamente será recarregada antes. */
    if (falta > 2 ** 31 - 1) return;
    const id = window.setTimeout(() => setAtiva(false), Math.max(0, falta));
    return () => window.clearTimeout(id);
  }, [ativa]);

  return ativa;
};

/**
 * Tempo restante, atualizado a cada segundo — só para o relógio.
 *
 * setInterval, e não requestAnimationFrame: o rAF para em aba oculta, e o
 * relógio voltaria atrasado quando a pessoa retornasse.
 */
export const useCountdown = () => {
  const [agora, setAgora] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setAgora(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const total = Math.max(0, Math.floor((BLACK_FRIDAY_ENDS_AT - agora) / 1000));
  return {
    acabou: total === 0,
    dias: Math.floor(total / 86400),
    horas: Math.floor((total % 86400) / 3600),
    minutos: Math.floor((total % 3600) / 60),
    segundos: total % 60,
  };
};
