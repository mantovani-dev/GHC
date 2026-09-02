import {
  vacancies,
  countries,
  countryOf,
  currencyOf,
  VACANCIES_POSTED_AT,
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
 * Extrai a cidade do campo `location` para o `addressLocality`.
 *
 * Boa parte dos locais do quadro não é cidade: "Polônia", "Projetos em todo o
 * país", "Região de Varsóvia", "Polônia — cidade definida conforme o projeto"
 * ou uma lista com "·". Nesses casos o JSON-LD leva só o país — um
 * addressLocality que não geocodifica atrapalha mais do que ajuda no Google
 * Jobs. Quando é cidade, o parêntese de contexto sai: "Siedlce (90 km de
 * Varsóvia)" vira "Siedlce".
 */
const localityOf = (vacancy: Vacancy): string | null => {
  const loc = vacancy.location;
  const countryNames = countries.map((c) => c.name);

  if (countryNames.some((n) => loc === n || loc.startsWith(n))) return null;
  if (/^(Projetos|Região)/i.test(loc)) return null;
  if (loc.includes("·")) return null;
  // Travessão indica um qualificador, não um município
  if (loc.includes("—")) return null;

  return loc.split(" (")[0].trim();
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
    vacancy.duties ? `<p><strong>O trabalho:</strong> ${vacancy.duties}</p>` : "",
    vacancy.documents
      ? `<p><strong>Documentação necessária:</strong> ${vacancy.documents}</p>`
      : "",
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
    datePosted: vacancy.postedAt ?? VACANCIES_POSTED_AT,
    /* Sem validThrough o Google expira o anúncio ~30 dias após o datePosted */
    ...(vacancy.validThrough ? { validThrough: vacancy.validThrough } : {}),
    employmentType: "FULL_TIME",
    ...(vacancy.duties ? { responsibilities: vacancy.duties } : {}),
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
    url: `${SITE_URL}${seoMeta.vacancies.path}#vaga-${vacancy.code}`,
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
