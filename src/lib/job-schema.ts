import {
  vacancies,
  countries,
  countryOf,
  currencyOf,
  VACANCIES_UPDATED_AT,
  type Vacancy,
} from "../data/vacancies";

export const SITE_URL = "https://ghc.com.br";

const COUNTRY_LIST = countries.map((c) => c.name).join(", ");

/** Título, descrição e canonical de cada página, injetados no HTML em build. */
export const seoMeta = {
  home: {
    path: "/",
    title: "GHC | Recrutamento Internacional para Brasileiros e Latino-Americanos",
    description:
      `Conectamos profissionais latino-americanos a vagas de trabalho no exterior com contrato, ` +
      `documentação e suporte até o embarque. ${vacancies.length} vagas abertas em ${COUNTRY_LIST}.`,
    keywords:
      "recrutamento internacional, trabalho no exterior, emprego no exterior, agência de recrutamento internacional, trabalhar na Europa, latino-americanos no exterior, GHC, Global Hiring Careers",
  },
  vacancies: {
    path: "/vagas",
    title: `Vagas de Trabalho no Exterior | ${vacancies.length} Empregos com Contrato na Europa | GHC`,
    description:
      `${vacancies.length} vagas abertas em ${COUNTRY_LIST} para brasileiros e latino-americanos. ` +
      `Salário em euro ou zloty, alojamento, transporte e apoio na documentação. Veja as vagas e inscreva-se.`,
    keywords:
      "vagas de trabalho no exterior, emprego no exterior, trabalhar na Europa, vagas na Polônia, trabalhar na Polônia, vagas na Croácia, vagas em Montenegro, vagas na Dinamarca, recrutamento internacional, vaga com contrato de trabalho no exterior, emprego para brasileiros na Europa, operador de armazém Polônia, trabalho em frigorífico na Europa, GHC",
  },
};

const ORG = {
  "@type": "Organization",
  name: "Global Hiring & Careers (GHC)",
  alternateName: "GHC",
  url: SITE_URL,
  sameAs: [
    "https://www.instagram.com/agencia_ghc/",
    "https://linkedin.com/company/global-hiring-careers/",
  ],
};

/**
 * Locais genéricos do quadro ("Polônia", "Croácia", "Projetos em todo o país")
 * não são cidades — nesses casos o JSON-LD leva só o país, sem addressLocality.
 */
const localityOf = (vacancy: Vacancy): string | null => {
  const countryNames = countries.map((c) => c.name);
  if (countryNames.includes(vacancy.location)) return null;
  if (/^Projetos/i.test(vacancy.location)) return null;
  // "Varsóvia · Wrocław · Poznań" — várias cidades, fica só o país
  if (vacancy.location.includes("·")) return null;
  return vacancy.location;
};

/** Descrição em HTML, como o Google pede para JobPosting. */
const descriptionOf = (vacancy: Vacancy): string => {
  const country = countryOf(vacancy.country);
  const cargo = vacancy.context ? `${vacancy.title} — ${vacancy.context}` : vacancy.title;
  const pay = vacancy.salaryBRL
    ? `${vacancy.salaryLocal} (aprox. ${vacancy.salaryBRL} por mês)`
    : vacancy.salaryLocal;

  return [
    `<p>Vaga de ${cargo} em ${vacancy.location}, ${country.name}, para brasileiros e latino-americanos.</p>`,
    `<p><strong>Remuneração:</strong> ${pay}</p>`,
    `<p><strong>Jornada:</strong> ${vacancy.schedule}</p>`,
    `<p><strong>Requisitos:</strong> ${vacancy.requirements}</p>`,
    `<p><strong>Benefícios:</strong> ${vacancy.benefits}</p>`,
    vacancy.warning ? `<p><strong>Atenção:</strong> ${vacancy.warning}</p>` : "",
  ].join("");
};

const jobPosting = (vacancy: Vacancy) => {
  const country = countryOf(vacancy.country);
  const locality = localityOf(vacancy);

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: vacancy.context ? `${vacancy.title} — ${vacancy.context}` : vacancy.title,
    description: descriptionOf(vacancy),
    identifier: {
      "@type": "PropertyValue",
      name: "GHC",
      value: vacancy.code,
    },
    datePosted: VACANCIES_UPDATED_AT,
    employmentType: "FULL_TIME",
    hiringOrganization: ORG,
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        ...(locality ? { addressLocality: locality } : {}),
        addressCountry: country.isoCode,
      },
    },
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: currencyOf(vacancy.country),
      value: {
        "@type": "QuantitativeValue",
        minValue: vacancy.salaryValue.min,
        ...(vacancy.salaryValue.max ? { maxValue: vacancy.salaryValue.max } : {}),
        unitText: vacancy.salaryValue.unit,
      },
    },
    /* A candidatura é feita no formulário do país, fora do site */
    directApply: false,
    url: `${SITE_URL}/#vaga-${vacancy.code}`,
  };
};

/** Um JobPosting por vaga — é assim que o Google Jobs espera receber. */
export const jobPostingSchemas = () => vacancies.map(jobPosting);

export const organizationSchema = () => ({
  "@context": "https://schema.org",
  ...ORG,
  "@type": "EmploymentAgency",
  description:
    "Agência de recrutamento internacional que conecta profissionais brasileiros e latino-americanos a vagas de trabalho com contrato na Europa.",
  areaServed: countries.map((c) => ({ "@type": "Country", name: c.isoCode })),
  email: "atendimento@globalhiringcareers.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Salgado Filho, 2120",
    addressLocality: "Guarulhos",
    addressRegion: "SP",
    addressCountry: "BR",
  },
});
