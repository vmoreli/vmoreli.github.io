import type { Idioma } from './i18n';

/** Formata um número no padrão do idioma (en: 80.2 · pt: 80,2). */
export function formatNumero(valor: number, casas?: number, idioma: Idioma = 'en'): string {
  return new Intl.NumberFormat(idioma === 'pt' ? 'pt-BR' : 'en-US', {
    minimumFractionDigits: casas ?? 0,
    maximumFractionDigits: casas ?? 20,
  }).format(valor);
}
