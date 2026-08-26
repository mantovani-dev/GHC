/**
 * Itens de navegação, compartilhados por header, drawer e footer.
 *
 * `section` rola até um bloco da home; `path` navega para outra rota. Quando
 * um item de seção é clicado de fora da home, o link vira `/#secao` e o
 * Index.tsx rola até lá depois de montar.
 */
export interface NavLink {
  key: string;
  label: string;
  /** Id do bloco na home. */
  section?: string;
  /** Rota própria. */
  path?: string;
}

export const navLinks: NavLink[] = [
  { key: "inicio", label: "header.inicio", section: "inicio" },
  { key: "vagas", label: "header.vagas", path: "/vagas" },
  { key: "sobre", label: "header.sobre", section: "sobre" },
  { key: "como-funciona", label: "header.comoFunciona", section: "como-funciona" },
  { key: "cases", label: "header.cases", section: "cases" },
  { key: "contato", label: "header.contato", section: "contato" },
];

/** Só os que existem como bloco na home — usado pelo scroll-spy. */
export const sectionLinks = navLinks.filter((l) => l.section);
