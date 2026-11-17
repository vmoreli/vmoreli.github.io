import { getCollection, type CollectionEntry } from 'astro:content';
import { MARCADORES_PENDENTES } from '../content.config';
import type { Idioma } from './i18n';

export type CaseEntry = CollectionEntry<'cases'>;

// O id vem do caminho do arquivo: "cases/pt/evoembody" ou "rascunhos/en/<slug>".

/** "cases/pt/evoembody" → "evoembody" (o slug é o mesmo nos dois idiomas). */
export function slugDe(entry: CaseEntry): string {
  return entry.id.split('/').pop() ?? entry.id;
}

/** "cases/pt/evoembody" → "pt": a pasta logo acima do arquivo é o idioma. */
export function idiomaDoCase(entry: CaseEntry): Idioma {
  const partes = entry.id.split('/');
  return partes[partes.length - 2] === 'pt' ? 'pt' : 'en';
}

export function ehRascunho(entry: CaseEntry): boolean {
  return entry.data.status_publicacao !== 'pronto';
}

function marcadorNoCorpo(entry: CaseEntry): string | undefined {
  const corpo = entry.body ?? '';
  return MARCADORES_PENDENTES.find((m) => corpo.includes(m));
}

/**
 * Cases de um idioma que podem aparecer no site, ordenados por `ordem`.
 * Produção: só status_publicacao === 'pronto'. Dev: todos (rascunhos inclusive).
 * Em produção, um case 'pronto' com marcador pendente no corpo derruba o build.
 */
export async function getCasesVisiveis(idioma: Idioma): Promise<CaseEntry[]> {
  const todos = (await getCollection('cases')).filter((e) => idiomaDoCase(e) === idioma);
  const prod = import.meta.env.PROD;

  for (const entry of todos) {
    const marcador = marcadorNoCorpo(entry);
    if (marcador && !ehRascunho(entry)) {
      const msg = `Case "${entry.id}" está como 'pronto' mas o corpo contém "${marcador}".`;
      if (prod) throw new Error(msg);
      console.warn(`[cases] ${msg}`);
    }
  }

  return todos
    .filter((e) => !prod || !ehRascunho(e))
    .sort((a, b) => a.data.ordem - b.data.ordem);
}
