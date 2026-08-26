import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { vacancies, countries } from "@/data/vacancies";

/**
 * Mantém `<html lang>`, título e descrição em sincronia com o idioma escolhido.
 *
 * O SEO que importa para os buscadores já sai pronto no HTML: o plugin
 * `ghc-seo-tags` do vite.config.ts injeta título, meta, canonical, og:* em
 * index.html e vagas.html, e o JSON-LD de JobPosting só em vagas.html. Este
 * componente cobre apenas a troca de idioma feita depois que a página
 * carregou, que nenhum crawler chega a ver.
 *
 * Não usa react-helmet-async: a versão 2.0.5 instalada não aplica nada neste
 * projeto — não injeta título nem meta, nem montada logo abaixo do
 * HelmetProvider.
 */

type Page = "home" | "vacancies";

const countryList = countries.map((c) => c.name).join(", ");
const n = vacancies.length;

const copy: Record<string, Record<Page, { title: string; description: string }>> = {
  pt: {
    home: {
      title: "GHC | Recrutamento Internacional para Brasileiros e Latino-Americanos",
      description: `Conectamos profissionais latino-americanos a vagas de trabalho no exterior com contrato, documentação e suporte até o embarque. ${n} vagas abertas em ${countryList}.`,
    },
    vacancies: {
      title: `Vagas de Trabalho no Exterior | ${n} Empregos com Contrato na Europa | GHC`,
      description: `${n} vagas abertas em ${countryList} para brasileiros e latino-americanos. Salário em euro ou zloty, alojamento, transporte e apoio na documentação.`,
    },
  },
  en: {
    home: {
      title: "GHC | International Recruitment for Brazilians and Latin Americans",
      description: `We connect Latin American professionals to jobs abroad with a contract, paperwork and support up to departure. ${n} open roles in Poland, Croatia, Montenegro and Denmark.`,
    },
    vacancies: {
      title: `Jobs Abroad | ${n} Roles with a Contract in Europe | GHC`,
      description: `${n} open roles in Poland, Croatia, Montenegro and Denmark for Brazilians and Latin Americans. Paid in euro or zloty, with accommodation, transport and paperwork support.`,
    },
  },
  es: {
    home: {
      title: "GHC | Reclutamiento Internacional para Brasileños y Latinoamericanos",
      description: `Conectamos a profesionales latinoamericanos con empleos en el exterior con contrato, documentación y apoyo hasta el embarque. ${n} vacantes abiertas en Polonia, Croacia, Montenegro y Dinamarca.`,
    },
    vacancies: {
      title: `Empleos en el Exterior | ${n} Vacantes con Contrato en Europa | GHC`,
      description: `${n} vacantes abiertas en Polonia, Croacia, Montenegro y Dinamarca para brasileños y latinoamericanos. Salario en euro o esloti, con alojamiento, transporte y apoyo documental.`,
    },
  },
};

const setMeta = (selector: string, content: string) => {
  const el = document.head.querySelector<HTMLMetaElement>(selector);
  if (el) el.content = content;
};

const Seo = ({ page = "home" }: { page?: Page }) => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const lang = i18n.language?.split("-")[0] ?? "pt";
    const { title, description } = (copy[lang] ?? copy.pt)[page];

    document.documentElement.lang = lang === "pt" ? "pt-BR" : lang;
    document.title = title;
    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[name="twitter:title"]', title);
    setMeta('meta[name="twitter:description"]', description);
  }, [i18n.language, page]);

  return null;
};

export default Seo;
