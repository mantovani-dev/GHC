import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { vacancies, countries } from "@/data/vacancies";

/**
 * Mantém `<html lang>`, título e descrição em sincronia com o idioma escolhido.
 *
 * O SEO que importa para os buscadores já sai pronto no HTML — o plugin
 * `ghc-seo-tags` do vite.config.ts injeta título, meta, canonical, og:* e o
 * JSON-LD de JobPosting em build. Este componente só cobre a troca de idioma
 * feita depois que a página carregou, que nenhum crawler chega a ver.
 *
 * Não usa react-helmet-async: a versão 2.0.5 instalada não aplica nada neste
 * projeto — não injeta título nem meta, nem quando montada logo abaixo do
 * HelmetProvider.
 */

const countryList = countries.map((c) => c.name).join(", ");

const copy: Record<string, { title: string; description: string }> = {
  pt: {
    title: `Vagas de Trabalho no Exterior | ${vacancies.length} Empregos com Contrato na Europa | GHC`,
    description: `${vacancies.length} vagas abertas em ${countryList} para brasileiros e latino-americanos. Salário em euro ou zloty, alojamento, transporte e apoio na documentação.`,
  },
  en: {
    title: `Jobs Abroad | ${vacancies.length} Roles with a Contract in Europe | GHC`,
    description: `${vacancies.length} open roles in Poland, Croatia, Montenegro and Denmark for Brazilians and Latin Americans. Paid in euro or zloty, with accommodation, transport and paperwork support.`,
  },
  es: {
    title: `Empleos en el Exterior | ${vacancies.length} Vacantes con Contrato en Europa | GHC`,
    description: `${vacancies.length} vacantes abiertas en Polonia, Croacia, Montenegro y Dinamarca para brasileños y latinoamericanos. Salario en euro o esloti, con alojamiento, transporte y apoyo documental.`,
  },
};

const setMeta = (selector: string, content: string) => {
  const el = document.head.querySelector<HTMLMetaElement>(selector);
  if (el) el.content = content;
};

const Seo = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const lang = i18n.language?.split("-")[0] ?? "pt";
    const { title, description } = copy[lang] ?? copy.pt;

    document.documentElement.lang = lang === "pt" ? "pt-BR" : lang;
    document.title = title;
    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[name="twitter:title"]', title);
    setMeta('meta[name="twitter:description"]', description);
  }, [i18n.language]);

  return null;
};

export default Seo;
