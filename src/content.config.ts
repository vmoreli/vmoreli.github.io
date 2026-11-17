import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { CAMADAS_IDS } from './data/camadas';

/** Marcadores de conteúdo pendente: nunca podem ir para o site. */
export const MARCADORES_PENDENTES = ['[CONFIRMAR', '[PREENCHER', '[Quando'] as const;

const semPendencia = (s: string) => !MARCADORES_PENDENTES.some((m) => s.includes(m));
const texto = () =>
  z.string().min(1).refine(semPendencia, {
    message: `Contém marcador pendente (${MARCADORES_PENDENTES.join(', ')}).`,
  });

// Um arquivo por case e idioma: cases/en/<slug>.mdx e cases/pt/<slug>.mdx.
// O id vira "en/<slug>" ou "pt/<slug>" (sem campo slug no frontmatter, senão
// as duas versões colidiriam no mesmo id).
// Rascunhos (src/content/rascunhos/<idioma>/, fora do git) só entram no astro dev.
const padroes = ['cases/*/*.mdx', ...(import.meta.env.DEV ? ['rascunhos/*/*.mdx'] : [])];

const cases = defineCollection({
  loader: glob({ base: './src/content', pattern: padroes }),
  schema: z.object({
    titulo: texto(),
    /** Nome curto do projeto, usado nos cards da home. */
    titulo_curto: texto().optional(),
    resumo: texto(),
    organizacao: texto(),
    papel: texto(),
    periodo: texto(),
    camadas: z.array(z.enum(CAMADAS_IDS)).min(1),
    formato: z.literal('case curto').optional(),
    links: z
      .object({
        arxiv: z.url().optional(),
        codigo: z.url().optional(),
        paper: z.url().optional(),
        venue: texto().optional(),
      })
      .optional(),
    status_publicacao: texto().default('rascunho'),
    ordem: z.number().int(),
    // Obrigatória em case completo; case curto não tem frase de destaque.
    frase_destaque: texto().optional(),
    stack: z.array(texto()).min(1),
  }).superRefine((d, ctx) => {
    if (d.formato === 'case curto') return;
    for (const campo of ['frase_destaque'] as const) {
      if (!d[campo]) {
        ctx.addIssue({ code: 'custom', path: [campo], message: `Obrigatório em case completo.` });
      }
    }
  }),
});

export const collections = { cases };
