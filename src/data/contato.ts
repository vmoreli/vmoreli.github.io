// Contatos públicos, fornecidos pelo Victor em 2026-11-17 para aparecer no site.
// Arquivo separado de perfil.ts porque endereços têm dígitos que não são
// métricas (check-numeros confere perfil.ts). CV: ainda pendente.
import type { Idioma } from '../lib/i18n';

export interface Contato {
  rotulo: Record<Idioma, string>;
  /** Texto exibido na lista de contato. */
  valor: string;
  href: string;
  externo: boolean;
}

export const contatos: Contato[] = [
  {
    rotulo: { en: 'Email', pt: 'E-mail' },
    valor: 'victormoreli64@gmail.com',
    href: 'mailto:victormoreli64@gmail.com',
    externo: false,
  },
  {
    rotulo: { en: 'LinkedIn', pt: 'LinkedIn' },
    valor: 'linkedin.com/in/victor-moreli-dos-santos',
    href: 'https://www.linkedin.com/in/victor-moreli-dos-santos/',
    externo: true,
  },
  {
    rotulo: { en: 'GitHub', pt: 'GitHub' },
    valor: 'github.com/vmoreli',
    href: 'https://github.com/vmoreli',
    externo: true,
  },
];
