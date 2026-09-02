/**
 * Contrato entre a planilha de vagas e o site.
 *
 * Este arquivo é o único lugar que conhece os nomes das colunas. Se a
 * planilha mudar um cabeçalho, ajuste COLUMNS aqui e mais nada.
 */
import { z } from "zod";

/** Cabeçalho na planilha → campo do modelo. A ordem define a ordem das colunas. */
export const COLUMNS = {
  CODIGO: "code",
  PUBLICAR: "publish",
  PAIS: "country",
  CARGO: "title",
  CONTEXTO: "context",
  SALARIO_BRL: "salaryBRL",
  SALARIO_LOCAL: "salaryLocal",
  SAL_MIN: "salMin",
  SAL_MAX: "salMax",
  SAL_UNIDADE: "salUnit",
  LOCAL: "location",
  JORNADA: "schedule",
  REQUISITOS: "requirements",
  O_TRABALHO: "duties",
  DOCUMENTACAO: "documents",
  CONDICOES: "benefits",
  PRAZO: "entry",
  DESTAQUE: "isNew",
  RESSALVA: "warning",
  PUBLICADA_EM: "postedAt",
  VALIDA_ATE: "validThrough",
};

export const HEADERS = Object.keys(COLUMNS);

/** Valores aceitos nas colunas de lista suspensa. */
export const ENUMS = {
  PAIS: ["pl", "hr", "me", "dk"],
  PRAZO: ["imediato", "futuro", "confirmar"],
  SAL_UNIDADE: ["MONTH", "HOUR"],
  SIM_NAO: ["sim", "não"],
};

/* ------------------------------------------------------------------ */

const texto = (v) => (v === null || v === undefined ? "" : String(v).trim());

/** "sim"/"x"/"true"/1 viram true; vazio vira false. */
const booleano = (v) => ["sim", "s", "x", "true", "1", "yes"].includes(texto(v).toLowerCase());

/** Aceita número, "5.500", "5,5" e célula vazia. */
const numero = (v) => {
  if (v === null || v === undefined || texto(v) === "") return undefined;
  if (typeof v === "number") return v;
  const limpo = texto(v).replace(/\./g, "").replace(",", ".");
  const n = Number(limpo);
  return Number.isFinite(n) ? n : NaN;
};

/** Aceita Date do Excel ou texto ISO / dd-mm-aaaa. */
const data = (v) => {
  if (!v) return undefined;
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  const s = texto(v);
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
  const br = s.match(/^(\d{2})[/-](\d{2})[/-](\d{4})$/);
  if (br) return `${br[3]}-${br[2]}-${br[1]}`;
  return s; // deixa passar para o zod reprovar com mensagem clara
};

const obrigatorio = (campo) =>
  z.string().trim().min(1, `${campo} não pode ficar em branco`);

/** Uma linha da planilha, já com os nomes de campo do modelo. */
export const rowSchema = z
  .object({
    code: z
      .string()
      .trim()
      .regex(/^\d{3}$/, "CODIGO precisa ter exatamente 3 dígitos"),
    publish: z.boolean(),
    country: z.enum(ENUMS.PAIS, {
      errorMap: () => ({ message: `PAIS precisa ser um de: ${ENUMS.PAIS.join(", ")}` }),
    }),
    title: obrigatorio("CARGO"),
    context: z.string().trim().optional(),
    salaryBRL: z.string().trim().optional(),
    salaryLocal: obrigatorio("SALARIO_LOCAL"),
    salMin: z.number({ invalid_type_error: "SAL_MIN precisa ser número" }).positive(),
    salMax: z.number().positive().optional(),
    salUnit: z.enum(ENUMS.SAL_UNIDADE, {
      errorMap: () => ({ message: "SAL_UNIDADE precisa ser MONTH ou HOUR" }),
    }),
    location: obrigatorio("LOCAL"),
    schedule: obrigatorio("JORNADA"),
    requirements: obrigatorio("REQUISITOS"),
    duties: z.string().trim().optional(),
    documents: z.string().trim().optional(),
    benefits: obrigatorio("CONDICOES"),
    entry: z.enum(ENUMS.PRAZO, {
      errorMap: () => ({ message: `PRAZO precisa ser um de: ${ENUMS.PRAZO.join(", ")}` }),
    }),
    isNew: z.boolean(),
    warning: z.string().trim().optional(),
    postedAt: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "PUBLICADA_EM precisa ser uma data")
      .optional(),
    validThrough: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "VALIDA_ATE precisa ser uma data")
      .optional(),
  })
  .refine((v) => v.salMax === undefined || v.salMax >= v.salMin, {
    message: "SAL_MAX não pode ser menor que SAL_MIN",
  });

/** Converte a linha crua da planilha para o formato que o zod espera. */
export const normalizeRow = (raw) => {
  const get = (header) => raw[header];
  return {
    code: texto(get("CODIGO")),
    publish: booleano(get("PUBLICAR")),
    country: texto(get("PAIS")).toLowerCase(),
    title: texto(get("CARGO")),
    context: texto(get("CONTEXTO")) || undefined,
    salaryBRL: texto(get("SALARIO_BRL")) || undefined,
    salaryLocal: texto(get("SALARIO_LOCAL")),
    salMin: numero(get("SAL_MIN")),
    salMax: numero(get("SAL_MAX")),
    salUnit: texto(get("SAL_UNIDADE")).toUpperCase(),
    location: texto(get("LOCAL")),
    schedule: texto(get("JORNADA")),
    requirements: texto(get("REQUISITOS")),
    duties: texto(get("O_TRABALHO")) || undefined,
    documents: texto(get("DOCUMENTACAO")) || undefined,
    benefits: texto(get("CONDICOES")),
    entry: texto(get("PRAZO")).toLowerCase(),
    isNew: booleano(get("DESTAQUE")),
    warning: texto(get("RESSALVA")) || undefined,
    postedAt: data(get("PUBLICADA_EM")),
    validThrough: data(get("VALIDA_ATE")),
  };
};

/** Linha validada → objeto Vacancy do site. */
export const toVacancy = (row) => ({
  code: row.code,
  country: row.country,
  title: row.title,
  ...(row.context ? { context: row.context } : {}),
  salaryBRL: row.salaryBRL ?? null,
  salaryLocal: row.salaryLocal,
  salaryValue: {
    min: row.salMin,
    ...(row.salMax !== undefined ? { max: row.salMax } : {}),
    unit: row.salUnit,
  },
  location: row.location,
  schedule: row.schedule,
  requirements: row.requirements,
  ...(row.duties ? { duties: row.duties } : {}),
  ...(row.documents ? { documents: row.documents } : {}),
  benefits: row.benefits,
  entry: row.entry,
  ...(row.isNew ? { isNew: true } : {}),
  ...(row.warning ? { warning: row.warning } : {}),
  ...(row.postedAt ? { postedAt: row.postedAt } : {}),
  ...(row.validThrough ? { validThrough: row.validThrough } : {}),
});

/** Vacancy do site → linha da planilha (usado para gerar a planilha modelo). */
export const toRow = (v) => ({
  CODIGO: v.code,
  PUBLICAR: "sim",
  PAIS: v.country,
  CARGO: v.title,
  CONTEXTO: v.context ?? "",
  SALARIO_BRL: v.salaryBRL ?? "",
  SALARIO_LOCAL: v.salaryLocal,
  SAL_MIN: v.salaryValue.min,
  SAL_MAX: v.salaryValue.max ?? "",
  SAL_UNIDADE: v.salaryValue.unit,
  LOCAL: v.location,
  JORNADA: v.schedule,
  REQUISITOS: v.requirements,
  O_TRABALHO: v.duties ?? "",
  DOCUMENTACAO: v.documents ?? "",
  CONDICOES: v.benefits,
  PRAZO: v.entry,
  DESTAQUE: v.isNew ? "sim" : "",
  RESSALVA: v.warning ?? "",
  PUBLICADA_EM: v.postedAt ?? "",
  VALIDA_ATE: v.validThrough ?? "",
});
