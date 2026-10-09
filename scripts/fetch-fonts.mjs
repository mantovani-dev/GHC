/**
 * Baixa as fontes do Google e grava em public/fonts, junto com o CSS.
 *
 * Roda à mão. O resultado entra no repositório: em produção as fontes saem
 * do nosso próprio domínio, não do Google.
 *
 * Por quê: a folha do Google é uma ida a um terceiro no caminho crítico —
 * resolver DNS, abrir TLS, baixar o CSS e só então descobrir os arquivos
 * .woff2, que moram em OUTRO domínio (gstatic), exigindo nova conexão. No
 * celular isso são segundos até o texto assumir a fonte certa, e é o que
 * fazia a página "chegar despedaçada e depois se ajeitar".
 *
 * Só latin e latin-ext: latin-ext é obrigatório por causa das cidades
 * polonesas (Białystok, Goczałków, Międzyrzec, Wolbórz).
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const DESTINO = "public/fonts";
const SUBSETS = ["latin", "latin-ext"];

/* UA de navegador moderno: sem isso o Google devolve .ttf em vez de .woff2 */
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

const URL_CSS =
  "https://fonts.googleapis.com/css2" +
  "?family=Space+Grotesk:wght@400;500;600;700" +
  "&family=Space+Mono:wght@400;700" +
  "&display=swap";

mkdirSync(DESTINO, { recursive: true });

const css = await fetch(URL_CSS, { headers: { "User-Agent": UA } }).then((r) => r.text());

/* A folha do Google vem comentada com o nome do subset antes de cada bloco */
const blocos = css.split("/* ").slice(1);
const regras = [];

for (const bruto of blocos) {
  const subset = bruto.slice(0, bruto.indexOf(" "));
  if (!SUBSETS.includes(subset)) continue;

  const familia = /font-family: '([^']+)'/.exec(bruto)?.[1];
  const peso = /font-weight: (\d+)/.exec(bruto)?.[1];
  const estilo = /font-style: (\w+)/.exec(bruto)?.[1] ?? "normal";
  const url = /src: url\(([^)]+)\)/.exec(bruto)?.[1];
  const range = /unicode-range: ([^;]+);/.exec(bruto)?.[1];
  if (!familia || !peso || !url || !range) continue;

  const nome = `${familia.toLowerCase().replace(/\s+/g, "-")}-${peso}-${subset}.woff2`;
  const bytes = Buffer.from(await fetch(url, { headers: { "User-Agent": UA } }).then((r) => r.arrayBuffer()));
  writeFileSync(join(DESTINO, nome), bytes);
  console.log(`${nome.padEnd(36)} ${(bytes.length / 1024).toFixed(0)}KB`);

  regras.push(
    `@font-face {\n` +
      `  font-family: "${familia}";\n` +
      `  font-style: ${estilo};\n` +
      `  font-weight: ${peso};\n` +
      `  font-display: swap;\n` +
      `  src: url("/fonts/${nome}") format("woff2");\n` +
      `  unicode-range: ${range};\n` +
      `}`
  );
}

const cabecalho =
  "/* Gerado por scripts/fetch-fonts.mjs — não edite à mão.\n" +
  "   Fontes servidas pelo nosso domínio; nada vai ao Google em runtime. */\n\n";

writeFileSync("src/fonts.css", cabecalho + regras.join("\n\n") + "\n");
console.log(`\n${regras.length} regras @font-face → src/fonts.css`);
