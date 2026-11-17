// getStaticPaths compartilhado pelas rotas de case em inglês e português.
import { getCasesVisiveis, slugDe } from './cases';
import type { Idioma } from './i18n';

export async function caminhosDosCases(idioma: Idioma) {
  const cases = await getCasesVisiveis(idioma);
  return cases.map((entry, i) => ({
    params: { slug: slugDe(entry) },
    props: { entry, anterior: cases[i - 1], proximo: cases[i + 1] },
  }));
}
