/** Serializa a lista de vagas no arquivo TypeScript que o site importa. */

const aspas = (s) => JSON.stringify(s);

/** Quebra strings longas para o arquivo não virar uma linha só. */
const campo = (nome, valor, indent = "    ") => {
  const texto = aspas(valor);
  if (indent.length + nome.length + texto.length + 2 <= 100) {
    return `${indent}${nome}: ${texto},`;
  }
  return `${indent}${nome}:\n${indent}  ${texto},`;
};

const bloco = (v) => {
  const linhas = [
    `    code: ${aspas(v.code)},`,
    `    country: ${aspas(v.country)},`,
    campo("title", v.title),
  ];
  if (v.context) linhas.push(campo("context", v.context));

  linhas.push(
    v.salaryBRL === null ? "    salaryBRL: null," : campo("salaryBRL", v.salaryBRL)
  );
  linhas.push(campo("salaryLocal", v.salaryLocal));

  const sal = [`min: ${v.salaryValue.min}`];
  if (v.salaryValue.max !== undefined) sal.push(`max: ${v.salaryValue.max}`);
  sal.push(`unit: ${aspas(v.salaryValue.unit)}`);
  linhas.push(`    salaryValue: { ${sal.join(", ")} },`);

  linhas.push(campo("location", v.location));
  linhas.push(campo("schedule", v.schedule));
  linhas.push(campo("requirements", v.requirements));
  if (v.duties) linhas.push(campo("duties", v.duties));
  if (v.documents) linhas.push(campo("documents", v.documents));
  linhas.push(campo("benefits", v.benefits));
  linhas.push(`    entry: ${aspas(v.entry)},`);
  if (v.isNew) linhas.push("    isNew: true,");
  if (v.warning) linhas.push(campo("warning", v.warning));
  if (v.postedAt) linhas.push(`    postedAt: ${aspas(v.postedAt)},`);
  if (v.validThrough) linhas.push(`    validThrough: ${aspas(v.validThrough)},`);

  return `  {\n${linhas.join("\n")}\n  },`;
};

/**
 * @param {object[]} vacancies
 * @param {{ updatedAt: string, source: string }} meta
 */
export const emitGeneratedTs = (vacancies, meta) => {
  const porPais = {};
  for (const v of vacancies) porPais[v.country] = (porPais[v.country] ?? 0) + 1;
  const resumo = Object.entries(porPais)
    .map(([c, n]) => `${c}: ${n}`)
    .join(" · ");

  return `/**
 * GERADO AUTOMATICAMENTE — não edite este arquivo à mão.
 *
 * Fonte: ${meta.source}
 * Gerado por: scripts/sync-vacancies.mjs
 *
 * ${vacancies.length} vagas publicadas (${resumo}).
 *
 * Para mudar uma vaga, edite a planilha. A GitHub Action lê, valida e
 * reescreve este arquivo; qualquer edição manual aqui é perdida no
 * próximo sync.
 */
import type { Vacancy } from "./vacancies";

/** Data da última sincronização com a planilha. */
export const VACANCIES_UPDATED_AT = ${aspas(meta.updatedAt)};

export const vacancies: Vacancy[] = [
${vacancies.map(bloco).join("\n")}
];
`;
};
