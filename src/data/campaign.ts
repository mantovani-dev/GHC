/**
 * Campanha de Black Friday.
 *
 * O fim é um instante absoluto, com o fuso de Brasília escrito na data: sem
 * o "-03:00", cada visitante veria o relógio zerar na meia-noite do próprio
 * fuso — quem acessa de Varsóvia veria a campanha acabar quatro horas antes.
 *
 * Depois do fim a arte some sozinha, no navegador, sem precisar de deploy.
 * As vagas continuam no quadro; só o destaque da campanha sai.
 */
export const BLACK_FRIDAY_ENDS_AT = new Date("2026-11-26T23:59:59-03:00").getTime();

export const isBlackFridayActive = (agora: number = Date.now()): boolean =>
  agora < BLACK_FRIDAY_ENDS_AT;
