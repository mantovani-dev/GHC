/**
 * Converte as fotos da galeria para WebP e gera as miniaturas dos avatares.
 *
 * Roda à mão (`node scripts/optimize-images.mjs`) e grava o resultado ao lado
 * dos originais, em src/assets/gallery. O build não chama isto: o WebP entra
 * no repositório já pronto, para não pagar conversão a cada deploy.
 *
 * Os quatro rostinhos do herói aparecem em círculos de ~40px, mas usavam o
 * arquivo inteiro de 1280px de altura. Por isso eles ganham um .avatar.webp
 * de 128px — o suficiente para tela retina.
 */
import sharp from "sharp";
import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const DIR = "src/assets/gallery";
const QUALIDADE = 78;
/** Arquivos que também aparecem como avatar no herói. */
const AVATARES = ["departure.jpeg", "departure2.jpeg", "departure5.jpeg", "departure11.jpeg"];
const LARGURA_AVATAR = 128;

const kb = (caminho) => statSync(caminho).size / 1024;

const originais = readdirSync(DIR).filter((f) => /\.(jpe?g|png)$/i.test(f));
let antes = 0;
let depois = 0;

for (const arquivo of originais) {
  const entrada = join(DIR, arquivo);
  const base = arquivo.replace(/\.(jpe?g|png)$/i, "");
  const saida = join(DIR, `${base}.webp`);

  await sharp(entrada).webp({ quality: QUALIDADE }).toFile(saida);

  antes += kb(entrada);
  depois += kb(saida);
  console.log(
    `${arquivo.padEnd(22)} ${kb(entrada).toFixed(0).padStart(4)}KB → ${kb(saida)
      .toFixed(0)
      .padStart(4)}KB`
  );

  if (AVATARES.includes(arquivo)) {
    const avatar = join(DIR, `${base}.avatar.webp`);
    await sharp(entrada).resize({ width: LARGURA_AVATAR }).webp({ quality: 80 }).toFile(avatar);
    depois += kb(avatar);
    console.log(`${"  ↳ avatar".padEnd(22)} ${"".padStart(4)}    ${kb(avatar).toFixed(0).padStart(4)}KB`);
  }
}

console.log(
  `\nTOTAL ${antes.toFixed(0)}KB → ${depois.toFixed(0)}KB ` +
    `(−${(100 - (depois / antes) * 100).toFixed(0)}%)`
);
