export type Camada =
  | 'prompt-engineering'
  | 'orquestracao'
  | 'automacao-integracao'
  | 'construir-com-ia'
  | 'resultado-mensuravel';

export const CAMADAS_IDS = [
  'prompt-engineering',
  'orquestracao',
  'automacao-integracao',
  'construir-com-ia',
  'resultado-mensuravel',
] as const satisfies readonly Camada[];

import type { Idioma } from '../lib/i18n';

export const CAMADAS: Record<Camada, { rotulo: Record<Idioma, string> }> = {
  'prompt-engineering': { rotulo: { en: 'Advanced prompt engineering', pt: 'Prompt engineering avançado' } },
  orquestracao: { rotulo: { en: 'Agent orchestration', pt: 'Orquestração de agentes' } },
  'automacao-integracao': { rotulo: { en: 'AI integration with external systems', pt: 'Integração de IA com sistemas externos' } },
  'construir-com-ia': { rotulo: { en: 'Building with AI tools and APIs', pt: 'Construir com ferramentas de IA + APIs' } },
  'resultado-mensuravel': { rotulo: { en: 'Measured result', pt: 'Resultado mensurável' } },
};
