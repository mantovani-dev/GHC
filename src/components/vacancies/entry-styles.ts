import type { EntryType } from "@/data/vacancies";

/**
 * Cores do selo de prazo de ingresso.
 *
 * Só tons da paleta: ciano para o que já pode embarcar, neutros para o resto.
 * Fica em módulo próprio para não quebrar o fast refresh dos componentes que
 * o consomem.
 */
export const entryStyles: Record<EntryType, string> = {
  imediato: "border-accent/40 bg-accent/[0.12] text-accent",
  futuro: "border-white/[0.14] bg-white/[0.05] text-foreground/70",
  confirmar: "border-white/[0.1] text-foreground/45",
};
