#!/usr/bin/env node
// Confere se todo número dos cases do site existe literalmente nas fontes
// (content-src/cases/*.md). Regra 1 do CLAUDE.md: nunca inventar números.
// Uso: node scripts/check-numeros.mjs  (sai com 1 se faltar algum número)
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = fileURLToPath(new URL('..', import.meta.url));
const dirFontes = join(raiz, 'content-src/cases');
const dirsSite = ['src/content/cases', 'src/content/rascunhos'].map((d) => join(raiz, d));

if (!existsSync(dirFontes)) {
  console.error('ERRO: content-src/cases não encontrado (é local, fora do git).');
  process.exit(2);
}

function listar(dir, ext) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { recursive: true })
    .filter((f) => String(f).endsWith(ext))
    .map((f) => join(dir, String(f)));
}

// Forma canônica: sem separador de milhar, decimal com ponto.
// "16.731" (milhar pt-BR) → 16731; "0,943" → 0.943; "19.05" (JS) → 19.05.
function canonico(token, origem) {
  let t = token;
  if (/^\d{1,3}(\.\d{3})+$/.test(t) && origem === 'pt') t = t.replace(/\./g, '');
  else if (/^\d{1,3}(\.\d{3})+,\d+$/.test(t)) t = t.replace(/\./g, '').replace(',', '.');
  else t = t.replace(',', '.');
  const n = Number(t);
  return Number.isFinite(n) ? String(n) : t;
}

// Números com separadores: 16.731 · 0,943 · 19.05 · 2605.26440
const RE = /\d+(?:[.,]\d+)*/g;

function numerosPt(texto) {
  const out = new Set();
  for (const m of texto.matchAll(RE)) {
    out.add(canonico(m[0], 'pt'));
    out.add(canonico(m[0], 'js')); // ambiguidade "16.731": aceita as duas leituras na fonte
  }
  return out;
}

const fonte = new Set();
for (const f of listar(dirFontes, '.md')) for (const n of numerosPt(readFileSync(f, 'utf8'))) fonte.add(n);

// Páginas About/home (apresentação, trajetória, publicações): fonte = cases + docs/05 (trajetória, papéis, publicações).
const fonteSobre = new Set(fonte);
const docSobre = join(raiz, 'content-src/docs/05-sobre-e-cv.md');
if (existsSync(docSobre)) for (const n of numerosPt(readFileSync(docSobre, 'utf8'))) fonteSobre.add(n);

let ausentes = 0;
// Também confere os dados da home (números-âncora).
const arquivosDados = [join(raiz, 'src/data/perfil.ts')].filter(existsSync);
const arquivosSobre = ['src/data/sobre.ts', 'src/views/About.astro', 'src/views/Home.astro']
  .map((f) => join(raiz, f))
  .filter(existsSync);

const alvos = [
  ...[...dirsSite.flatMap((d) => listar(d, '.mdx')), ...arquivosDados].map((arq) => [arq, fonte]),
  ...arquivosSobre.map((arq) => [arq, fonteSobre]),
];

for (const [arq, fonte] of alvos) {
  let texto = readFileSync(arq, 'utf8');
  // Em .astro, CSS (<style>) não é conteúdo: troca por linhas vazias, mantendo a numeração.
  if (arq.endsWith('.astro')) {
    texto = texto.replace(/<style[\s\S]*?<\/style>/g, (m) => m.replace(/[^\n]/g, ''));
  }
  const linhas = texto.split('\n');
  linhas.forEach((linha, i) => {
    if (/^\s*import\s/.test(linha)) return;
    for (const m of linha.matchAll(RE)) {
      // Na linha de MDX, "19.05" é número JS; "16.731" é milhar pt-BR. Aceita se qualquer leitura existir.
      const leituras = [canonico(m[0], 'pt'), canonico(m[0], 'js')];
      if (!leituras.some((n) => fonte.has(n))) {
        ausentes++;
        console.error(`${relative(raiz, arq)}:${i + 1}: "${m[0]}" não existe em content-src/cases`);
      }
    }
  });
}

if (ausentes) {
  console.error(`\nERRO: ${ausentes} número(s) sem fonte.`);
  process.exit(1);
}
console.log('OK: todos os números dos cases do site e da home existem em content-src/cases.');
