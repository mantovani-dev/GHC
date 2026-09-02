/**
 * Sincroniza o quadro de vagas do site com a planilha de controle.
 *
 *   node scripts/sync-vacancies.mjs --url  <link do OneDrive>
 *   node scripts/sync-vacancies.mjs --file <caminho local .xlsx>
 *   node scripts/sync-vacancies.mjs --file ... --check   (só valida, não grava)
 *
 * Baixa a planilha, valida cada linha e reescreve
 * src/data/vacancies.generated.ts. Sai com código 1 em qualquer problema —
 * é de propósito: melhor a Action falhar e o site anterior seguir no ar do
 * que publicar um quadro corrompido.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import ExcelJS from "exceljs";
import { HEADERS, normalizeRow, rowSchema, toVacancy } from "./lib/vacancies-schema.mjs";
import { emitGeneratedTs } from "./lib/emit-ts.mjs";

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DESTINO = path.join(RAIZ, "src", "data", "vacancies.generated.ts");
const ABA = "SITE";

/** Queda maior que isto entre o que está publicado e a planilha aborta o sync. */
const QUEDA_MAXIMA = 0.4;

const args = process.argv.slice(2);
const arg = (nome) => {
  const i = args.indexOf(nome);
  return i >= 0 ? args[i + 1] : undefined;
};
const apenasVerificar = args.includes("--check");

const morrer = (msg, detalhes = []) => {
  console.error(`\n✗ ${msg}`);
  for (const d of detalhes) console.error(`   ${d}`);
  console.error("");
  process.exit(1);
};

/* ---------------------------------------------------------------- */

/**
 * Converte um link de compartilhamento em URL de download direto.
 *
 * O link que a pessoa copia abre o visualizador e devolve HTML, não o
 * arquivo. Aceita Google Drive e OneDrive; se já vier uma URL de download,
 * passa direto.
 */
const urlDeDownload = (compartilhado) => {
  if (/\/uc\?|api\.onedrive\.com|[?&]download|sharepoint\.com.*download/i.test(compartilhado)) {
    return compartilhado;
  }

  /* Google Drive: .../file/d/<id>/view  ou  ...?id=<id> */
  const drive =
    compartilhado.match(/drive\.google\.com\/file\/d\/([\w-]+)/) ??
    compartilhado.match(/drive\.google\.com\/.*[?&]id=([\w-]+)/);
  if (drive) return `https://drive.google.com/uc?export=download&id=${drive[1]}`;

  /* Planilha nativa do Google: exporta como xlsx */
  const sheets = compartilhado.match(/docs\.google\.com\/spreadsheets\/d\/([\w-]+)/);
  if (sheets) {
    return `https://docs.google.com/spreadsheets/d/${sheets[1]}/export?format=xlsx`;
  }

  /* OneDrive: o link vira base64url e entra na API de compartilhamento */
  const b64 = Buffer.from(compartilhado)
    .toString("base64")
    .replace(/=+$/, "")
    .replace(/\//g, "_")
    .replace(/\+/g, "-");
  return `https://api.onedrive.com/v1.0/shares/u!${b64}/root/content`;
};

const baixar = async (link) => {
  const url = urlDeDownload(link);
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) {
    morrer(`não consegui baixar a planilha (HTTP ${res.status})`, [
      `URL: ${url}`,
      "Confira se o link de compartilhamento continua válido e público.",
    ]);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  // Link expirado costuma devolver a página de login em HTML, com 200
  if (buf.subarray(0, 2).toString() !== "PK") {
    morrer("o link não devolveu um .xlsx", [
      "Veio HTML — provavelmente o compartilhamento expirou ou pede login.",
    ]);
  }
  return buf;
};

/* ---------------------------------------------------------------- */

const lerPlanilha = async (buffer) => {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.load(buffer);

  const ws = wb.getWorksheet(ABA);
  if (!ws) {
    morrer(`a planilha não tem a aba "${ABA}"`, [
      `Abas encontradas: ${wb.worksheets.map((w) => w.name).join(", ") || "nenhuma"}`,
    ]);
  }

  const cabecalho = ws.getRow(1).values.slice(1).map((c) => String(c ?? "").trim());
  const faltando = HEADERS.filter((h) => !cabecalho.includes(h));
  if (faltando.length) {
    morrer("faltam colunas obrigatórias na aba SITE", [
      `Ausentes: ${faltando.join(", ")}`,
      `Encontradas: ${cabecalho.join(", ")}`,
    ]);
  }

  const linhas = [];
  ws.eachRow({ includeEmpty: false }, (row, n) => {
    if (n === 1) return;
    const bruta = {};
    cabecalho.forEach((h, i) => {
      const cel = row.getCell(i + 1);
      // Fórmula: usa o resultado, não a fórmula em si
      bruta[h] = cel.value && typeof cel.value === "object" && "result" in cel.value
        ? cel.value.result
        : cel.value;
    });
    if (HEADERS.every((h) => String(bruta[h] ?? "").trim() === "")) return;
    linhas.push({ n, bruta });
  });

  return linhas;
};

/* ---------------------------------------------------------------- */

const main = async () => {
  const link = arg("--url") ?? process.env.VAGAS_XLSX_URL;
  const arquivo = arg("--file");

  if (!link && !arquivo) {
    morrer("informe --url <link> ou --file <caminho>, ou defina VAGAS_XLSX_URL");
  }

  const origem = arquivo ? path.resolve(arquivo) : link;
  const buffer = arquivo ? await fs.readFile(origem) : await baixar(link);

  const linhas = await lerPlanilha(buffer);
  console.log(`planilha lida: ${linhas.length} linha(s) na aba ${ABA}`);

  const erros = [];
  const vagas = [];
  const vistos = new Map();

  for (const { n, bruta } of linhas) {
    const r = rowSchema.safeParse(normalizeRow(bruta));
    if (!r.success) {
      for (const e of r.error.errors) {
        erros.push(`linha ${n}: ${e.path.join(".") || "linha"} — ${e.message}`);
      }
      continue;
    }
    const row = r.data;
    if (vistos.has(row.code)) {
      erros.push(`linha ${n}: CODIGO ${row.code} duplicado (já apareceu na linha ${vistos.get(row.code)})`);
      continue;
    }
    vistos.set(row.code, n);
    if (row.publish) vagas.push(toVacancy(row));
  }

  if (erros.length) {
    morrer(`${erros.length} problema(s) na planilha — nada foi gravado`, erros.slice(0, 25));
  }

  if (vagas.length === 0) {
    morrer("a planilha não tem nenhuma vaga com PUBLICAR = sim", [
      "Recusando gravar: isso deixaria o site sem vagas.",
    ]);
  }

  /* Rede de segurança contra apagão acidental de linhas */
  let publicadas = 0;
  try {
    const atual = await import(
      pathToFileURL(path.join(RAIZ, "src", "data", "vacancies.generated.ts")).href
    );
    publicadas = atual.vacancies.length;
  } catch {
    /* primeira execução — sem baseline */
  }
  if (publicadas > 0) {
    const queda = (publicadas - vagas.length) / publicadas;
    if (queda > QUEDA_MAXIMA) {
      morrer(
        `a planilha traz ${vagas.length} vagas, contra ${publicadas} publicadas — queda de ${Math.round(queda * 100)}%`,
        [
          `Acima do limite de ${QUEDA_MAXIMA * 100}%. Se a redução for intencional,`,
          "rode com QUEDA_MAXIMA maior ou ajuste o limite no script.",
        ]
      );
    }
  }

  const conteudo = emitGeneratedTs(vagas, {
    updatedAt: new Date().toISOString().slice(0, 10),
    source: arquivo ? path.basename(origem) : "planilha de controle de vagas",
  });

  const anterior = await fs.readFile(DESTINO, "utf8").catch(() => "");
  /* Ignora a data ao comparar, senão todo sync viraria um commit */
  const semData = (s) => s.replace(/VACANCIES_UPDATED_AT = "[^"]*"/, "");

  if (semData(anterior) === semData(conteudo)) {
    console.log(`sem mudanças: ${vagas.length} vagas, nada a commitar`);
    return;
  }

  if (apenasVerificar) {
    console.log(`\n✓ planilha válida: ${vagas.length} vagas publicáveis (--check, não gravei)`);
    return;
  }

  await fs.writeFile(DESTINO, conteudo, "utf8");
  console.log(`\n✓ ${path.relative(RAIZ, DESTINO)} atualizado com ${vagas.length} vagas`);
  console.log("MUDOU=1");
};

main().catch((e) => morrer(e.message, [e.stack ?? ""]));
