/**
 * Tipos, configuração e helpers do quadro de vagas.
 *
 * As vagas em si moram em `vacancies.generated.ts`, escrito pela GitHub
 * Action a partir da planilha de controle — não edite aquele arquivo à mão.
 * Aqui ficam só as coisas estáveis: os tipos, os países com seus
 * formulários de inscrição e as funções de apoio.
 */

export type CountryCode = "pl" | "me" | "hr" | "dk";

/**
 * Prazo de ingresso, como definido na legenda do material.
 *
 * `imediatoOuFuturo` cobre a vaga que aceita as duas vias: parte dos
 * candidatos embarca assim que aprovada, parte espera a permissão.
 */
export type EntryType = "imediato" | "imediatoOuFuturo" | "futuro" | "confirmar";

export interface Vacancy {
  /** Código interno da vaga, usado como âncora e identificador. */
  code: string;
  country: CountryCode;
  /** Cargo. */
  title: string;
  /** Contexto que vem depois do travessão no material (empresa/setor). */
  context?: string;
  /** Faixa em real, já convertida. `null` quando o material diz "sob consulta". */
  salaryBRL: string | null;
  /** Remuneração na moeda local, como escrita no material. */
  salaryLocal: string;
  /** Valores numéricos para o JSON-LD. */
  salaryValue: { min: number; max?: number; unit: "MONTH" | "HOUR" };
  location: string;
  schedule: string;
  requirements: string;
  benefits: string;
  /** O que a pessoa faz no dia a dia. Nem toda vaga do material traz isso. */
  duties?: string;
  /** Documentos que o candidato precisa apresentar. Separado dos requisitos
      de perfil, e do apoio documental que a GHC oferece em `benefits`. */
  documents?: string;
  entry: EntryType;
  /** Destaque de "VAGA NOVA" no material. */
  isNew?: boolean;
  /** Ressalva que aparece com ⚠ no material. */
  warning?: string;
  /** Data de publicação, quando difere da do quadro original. */
  postedAt?: string;
  /** Até quando a vaga vale (AAAA-MM-DD). Vira `validThrough` no JSON-LD;
      sem ela o Google expira o anúncio sozinho em ~30 dias. */
  validThrough?: string;
}

export interface Country {
  code: CountryCode;
  name: string;
  /** Formulário de inscrição do país. `null` = inscrição pelo WhatsApp. */
  formUrl: string | null;
  /** ISO 3166-1 alfa-2, usado no JSON-LD. */
  isoCode: string;
}

/**
 * Publicação padrão das vagas, usada no `datePosted` do JSON-LD. É a data do
 * material original; vagas incluídas depois trazem o próprio `postedAt`.
 */
export const VACANCIES_POSTED_AT = "2026-08-24";

export const countries: Country[] = [
  { code: "pl", name: "Polônia", isoCode: "PL", formUrl: "https://forms.gle/UFGi51QKLQFfRNA48" },
  { code: "hr", name: "Croácia", isoCode: "HR", formUrl: "https://forms.gle/xeRvXUuJAjmgp2Rq9" },
  { code: "me", name: "Montenegro", isoCode: "ME", formUrl: "https://forms.gle/EVKFuMc4gEqeX9jx9" },
  { code: "dk", name: "Dinamarca", isoCode: "DK", formUrl: null },
];

/* Importa e reexporta: o re-export puro nao traz o nome para o escopo
   local, e countByCountry() abaixo precisa dele. */
import { vacancies, VACANCIES_UPDATED_AT } from "./vacancies.generated";

export { vacancies, VACANCIES_UPDATED_AT };

/**
 * Quebra os campos que o material escreve como linha corrida separada por
 * "·" em itens independentes. Sem isso, alojamento, documentação e
 * transporte ficam escondidos no meio de uma frase só.
 */
export const splitList = (value: string): string[] =>
  value
    .split("·")
    .map((item) => item.trim())
    .filter(Boolean);

export const countryOf = (code: CountryCode): Country =>
  countries.find((c) => c.code === code) as Country;

export const countByCountry = (code: CountryCode): number =>
  vacancies.filter((v) => v.country === code).length;

/** Moeda local de cada país, para o JSON-LD. */
export const currencyOf = (code: CountryCode): string => (code === "pl" ? "PLN" : "EUR");
