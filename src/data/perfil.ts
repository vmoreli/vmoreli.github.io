// Dados da home, nos dois idiomas. Todo número aqui precisa existir em
// content-src/cases/*.md (conferido por scripts/check-numeros.mjs). A
// apresentação com datas fica em sobre.ts, conferido também contra docs/05.
import type { Idioma } from '../lib/i18n';

type PorIdioma = Record<Idioma, string>;

export const perfil: {
  nome: string;
  cargo: PorIdioma;
  frase: PorIdioma;
  posicionamento: PorIdioma;
  atualIntro: PorIdioma;
} = {
  nome: 'Victor Moreli dos Santos',
  cargo: { en: 'AI Engineer & Researcher', pt: 'Engenheiro e pesquisador de IA' },
  // Frase do hero, adaptada do posicionamento (content-src/docs/01-brief.md).
  frase: {
    en: 'Building LLM and agent systems, and proving they work.',
    pt: 'Construo sistemas com LLMs e agentes, e provo que funcionam.',
  },
  posicionamento: {
    en: 'AI engineer and researcher who builds systems with LLMs and agents and shows that they work, with statistical evaluation, controlled cost, and open-weight models.',
    pt: 'Engenheiro e pesquisador de IA que constrói sistemas com LLMs e agentes e prova que eles funcionam, com avaliação estatística, custo controlado e modelos open-weight.',
  },
  // Parágrafo de abertura da seção Current work.
  atualIntro: {
    en: 'My work is about building systems with LLMs and agents and showing that they work, with statistical evaluation, controlled cost, and open-weight models. At HUG Labs and CEIA, I lead three research fronts: deep research, agent evolution, and LLM evaluation. At FGV EMAp, I work on LLM pipelines for a public-sector client.',
    pt: 'Meu trabalho é construir sistemas com LLMs e agentes e mostrar que eles funcionam, com avaliação estatística, custo controlado e modelos open-weight. No HUG Labs e no CEIA, lidero três frentes de pesquisa: deep research, agent evolution e avaliação de LLMs. Na FGV EMAp, trabalho com pipelines de LLM para um cliente do setor público.',
  },
};

export interface FrenteAtual {
  titulo: string;
  descricao: string;
  /** Onde: organização ou papel. */
  onde: string;
  /** Só versões públicas (regra 4 do CLAUDE.md). */
  link?: { rotulo: string; href: string };
}

/**
 * Seção "Current work": uma linha por frente, sem números.
 * Fontes: docs/05 (papéis) e o resumo de cada case.
 * Falta a frente de deep research: não há descrição dela nas fontes.
 */
export const trabalhoAtual: Record<Idioma, FrenteAtual[]> = {
  en: [
    {
      titulo: 'LLM evaluation',
      onde: 'Research lead · HUG Labs / CEIA',
      descricao:
        'Turning real user–LLM conversations into verifiable benchmarks, built and run only with open-weight models (Conv-to-Bench).',
      link: { rotulo: 'arXiv', href: 'https://arxiv.org/abs/2605.26440' },
    },
    {
      titulo: 'Agent evolution',
      onde: 'Research lead · HUG Labs / CEIA',
      descricao:
        'Meta-agents that diagnose failures and rewrite the code of a task agent, without fine-tuning and with small open-weight models (EvoEmbody).',
    },
    {
      titulo: 'LLM pipelines for the public sector',
      onde: 'AI Consultant · FGV EMAp',
      descricao:
        'Redesigning and evaluating an LLM pipeline that extracts the reasoning of long legal decisions, and moving it to open-weight models.',
    },
    {
      titulo: 'Agent evaluation service',
      onde: 'HUG Labs',
      descricao:
        'A shared service to audit the risk of LLM agents before they reach clients and to find the cheapest viable model.',
    },
    {
      titulo: 'Research coordination',
      onde: 'Research lead · HUG Labs / CEIA',
      descricao:
        'An LLM wiki that syncs sprint cards and meeting transcripts every week and drafts the next sprint for my approval.',
    },
  ],
  pt: [
    {
      titulo: 'Avaliação de LLMs',
      onde: 'Research lead · HUG Labs / CEIA',
      descricao:
        'Transformar conversas reais entre usuários e LLMs em benchmarks verificáveis, construídos e executados só com modelos open-weight (Conv-to-Bench).',
      link: { rotulo: 'arXiv', href: 'https://arxiv.org/abs/2605.26440' },
    },
    {
      titulo: 'Agent evolution',
      onde: 'Research lead · HUG Labs / CEIA',
      descricao:
        'Meta-agentes que diagnosticam falhas e reescrevem o código de um agente de tarefa, sem fine-tuning e com modelos open-weight pequenos (EvoEmbody).',
    },
    {
      titulo: 'Pipelines de LLM para o setor público',
      onde: 'AI Consultant · FGV EMAp',
      descricao:
        'Redesenhar e avaliar um pipeline de LLM que extrai o raciocínio de decisões jurídicas longas, e levá-lo para modelos open-weight.',
    },
    {
      titulo: 'Serviço de avaliação de agentes',
      onde: 'HUG Labs',
      descricao:
        'Um serviço compartilhado para auditar o risco de agentes LLM antes que cheguem aos clientes e encontrar o modelo viável mais barato.',
    },
    {
      titulo: 'Coordenação de pesquisa',
      onde: 'Research lead · HUG Labs / CEIA',
      descricao:
        'Uma wiki mantida por LLM que importa toda semana os cards da sprint e as transcrições das reuniões e rascunha a sprint seguinte para eu aprovar.',
    },
  ],
};
