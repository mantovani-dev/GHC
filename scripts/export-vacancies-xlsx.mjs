/**
 * Gera a planilha modelo a partir das vagas que já estão no site.
 *
 *   node scripts/export-vacancies-xlsx.mjs [destino.xlsx]
 *
 * É um utilitário de partida: em vez de alguém redigitar as 28 vagas, a
 * planilha nasce preenchida e no formato exato que o sync espera. Depois
 * disso ela vira a fonte, e este script não precisa mais rodar.
 */
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import ExcelJS from "exceljs";
import { HEADERS, ENUMS, toRow } from "./lib/vacancies-schema.mjs";

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const destino = path.resolve(process.argv[2] ?? path.join(RAIZ, "CONTROLE-VAGAS-SITE.xlsx"));

/* Importa o arquivo gerado, e nao o vacancies.ts: aquele usa import sem
   extensao, que o Vite resolve mas o Node puro nao. Aqui so ha um
   `import type`, que o Node apaga antes de tentar resolver. */
const { vacancies } = await import(
  pathToFileURL(path.join(RAIZ, "src", "data", "vacancies.generated.ts")).href
);

const wb = new ExcelJS.Workbook();
wb.creator = "GHC — sync de vagas";
wb.created = new Date();

/* ------------------------------- aba SITE ------------------------------- */
const ws = wb.addWorksheet("SITE", { views: [{ state: "frozen", ySplit: 1 }] });

/** Largura por coluna: campos de texto longo precisam de espaço para editar. */
const LARGURAS = {
  CODIGO: 9, PUBLICAR: 10, PAIS: 7, CARGO: 34, CONTEXTO: 22,
  SALARIO_BRL: 22, SALARIO_LOCAL: 46, SAL_MIN: 10, SAL_MAX: 10, SAL_UNIDADE: 13,
  LOCAL: 30, JORNADA: 46, REQUISITOS: 52, O_TRABALHO: 52, DOCUMENTACAO: 40,
  CONDICOES: 52, PRAZO: 12, DESTAQUE: 11, RESSALVA: 46, PUBLICADA_EM: 14, VALIDA_ATE: 13,
};

ws.columns = HEADERS.map((h) => ({ header: h, key: h, width: LARGURAS[h] ?? 20 }));

const cabecalho = ws.getRow(1);
cabecalho.font = { bold: true, color: { argb: "FF04141C" } };
cabecalho.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF33BAE9" } };
cabecalho.alignment = { vertical: "middle", horizontal: "left" };
cabecalho.height = 22;

for (const v of vacancies) ws.addRow(toRow(v));

ws.eachRow({ includeEmpty: false }, (row, n) => {
  if (n === 1) return;
  row.alignment = { vertical: "top", wrapText: true };
});

/* Listas suspensas — evitam a maior fonte de erro, que é digitar o valor errado */
const validar = (coluna, valores) => {
  const letra = ws.getColumn(coluna).letter;
  ws.dataValidations.add(`${letra}2:${letra}500`, {
    type: "list",
    allowBlank: true,
    formulae: [`"${valores.join(",")}"`],
    showErrorMessage: true,
    errorTitle: "Valor inválido",
    error: `Use um destes: ${valores.join(", ")}`,
  });
};
validar("PUBLICAR", ENUMS.SIM_NAO);
validar("PAIS", ENUMS.PAIS);
validar("SAL_UNIDADE", ENUMS.SAL_UNIDADE);
validar("PRAZO", ENUMS.PRAZO);
validar("DESTAQUE", ENUMS.SIM_NAO);

ws.autoFilter = { from: "A1", to: { row: 1, column: HEADERS.length } };

/* ------------------------------ aba INSTRUÇÕES ------------------------------ */
const doc = wb.addWorksheet("INSTRUÇÕES");
doc.columns = [{ width: 26 }, { width: 96 }];

const linhas = [
  ["COMO ESTA PLANILHA VIRA O SITE", ""],
  ["", ""],
  ["Fluxo", "A cada 30 minutos uma automação lê a aba SITE, valida e republica o site. Leva ~2 min."],
  ["Se algo estiver errado", "A automação falha e NÃO publica. O site anterior continua no ar e você recebe o erro por e-mail."],
  ["", ""],
  ["REGRAS DE PREENCHIMENTO", ""],
  ["PUBLICAR", 'sim = a vaga aparece no site. Qualquer outra coisa (ou vazio) tira a vaga do ar.'],
  ["CODIGO", "3 dígitos, único. É o identificador que aparece no card e no Google."],
  ["PAIS", `Só estes: ${ENUMS.PAIS.join(", ")}. Para publicar outro país, avise o time do site antes.`],
  ["CARGO / CONTEXTO", 'CARGO é o cargo. CONTEXTO é o que vem depois do travessão: empresa ou setor. Ex.: CARGO "Operador(a) de Armazém", CONTEXTO "Amazon".'],
  ["SALARIO_BRL", 'Como aparece no card. Deixe vazio se for "sob consulta".'],
  ["SALARIO_LOCAL", "Texto livre com a remuneração na moeda do país, como no material."],
  ["SAL_MIN / SAL_MAX", "Números puros, na moeda LOCAL (sem R$, sem PLN). Alimentam o Google Jobs. SAL_MAX vazio = valor único."],
  ["SAL_UNIDADE", "MONTH se os números acima forem por mês, HOUR se forem por hora."],
  ["", ""],
  ["LISTAS COM ·", 'REQUISITOS, DOCUMENTACAO e CONDICOES viram lista com marcadores no site. Separe cada item com " · " (espaço, ponto do meio, espaço). Ex.: "Inglês básico · até 50 anos · passaporte válido".'],
  ["O_TRABALHO", "Frase corrida descrevendo o dia a dia. Não vira lista."],
  ["CONDICOES", "Alojamento, transporte, apoio documental, bônus. É o bloco que o candidato mais lê."],
  ["DOCUMENTACAO", "O que o CANDIDATO precisa apresentar (passaporte, vídeo). Não confundir com o apoio documental que a GHC oferece, que vai em CONDICOES."],
  ["", ""],
  ["PRAZO", `${ENUMS.PRAZO.join(" / ")} — mesmo significado da coluna MODALIDADE da aba de controle.`],
  ["DESTAQUE", 'sim = mostra o selo "Vaga nova" no card.'],
  ["RESSALVA", "Aviso em destaque no card. Use para o que é eliminatório ou pode surpreender."],
  ["PUBLICADA_EM", "AAAA-MM-DD. Data em que a vaga foi divulgada. Vazio = usa a data padrão do quadro."],
  ["VALIDA_ATE", "AAAA-MM-DD. Até quando a vaga vale. IMPORTANTE: sem isso o Google considera a vaga expirada ~30 dias depois e ela some da busca."],
  ["", ""],
  ["TRAVAS DE SEGURANÇA", ""],
  ["Zero vagas", "Se nenhuma linha tiver PUBLICAR = sim, a automação recusa publicar."],
  ["Queda brusca", "Se o número de vagas cair mais de 40% de uma vez, a automação recusa — protege contra apagar linhas sem querer."],
  ["Código repetido", "Dois códigos iguais interrompem o sync."],
];

for (const [a, b] of linhas) doc.addRow([a, b]);
doc.getRow(1).font = { bold: true, size: 13 };
doc.eachRow((row, n) => {
  row.alignment = { vertical: "top", wrapText: true };
  const primeira = String(row.getCell(1).value ?? "");
  if (primeira === primeira.toUpperCase() && primeira.length > 3) {
    row.font = { bold: true };
  }
});

/* --------------------------------- grava --------------------------------- */
await wb.xlsx.writeFile(destino);

const porPais = {};
for (const v of vacancies) porPais[v.country] = (porPais[v.country] ?? 0) + 1;

console.log(`✓ ${path.relative(process.cwd(), destino)}`);
console.log(`  ${vacancies.length} vagas · ${HEADERS.length} colunas`);
console.log(`  ${Object.entries(porPais).map(([c, n]) => `${c}: ${n}`).join(" · ")}`);
