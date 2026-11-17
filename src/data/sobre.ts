// Dados da apresentação (home), da página About/Sobre e da lista de publicações,
// nos dois idiomas. Fonte: content-src/docs/05-sobre-e-cv.md (o português é o
// texto da fonte; o inglês, a tradução fiel).
// Períodos do CEIA e de research lead: confirmados pelo Victor em 2026-11-15
// (mesmo vínculo, desde fev/2025).
// Todo número aqui é conferido por scripts/check-numeros.mjs contra
// content-src/cases/*.md e content-src/docs/05-sobre-e-cv.md.
import type { Idioma } from '../lib/i18n';

/** Texto curto de docs/05, usado no hero da home e no topo de About/Sobre. */
export const apresentacao: Record<Idioma, string> = {
  en: "Hi! I'm Victor, a Computer Science student at USP (ICMC, São Carlos; expected graduation Dec 2027). I build and evaluate LLM and agent systems at HUG Labs and CEIA, where I also lead three research fronts, and work as an AI Consultant at FGV EMAp.",
  pt: 'Oi! Sou o Victor, estudante de Ciência da Computação na USP (ICMC, São Carlos; conclusão prevista para dez/2027). Construo e avalio sistemas com LLMs e agentes no HUG Labs e no CEIA, onde também sou research lead de três frentes de pesquisa, e trabalho como AI Consultant na FGV EMAp.',
};

export interface Papel {
  papel: string;
  organizacao: string;
  desde: string;
  modalidade?: string;
}

export const papeisAtuais: Record<Idioma, Papel[]> = {
  en: [
    { papel: 'AI Developer & Researcher', organizacao: 'HUG Labs (Netherlands)', desde: 'Feb 2025', modalidade: 'Remote, contract' },
    { papel: 'AI Researcher', organizacao: 'CEIA (CEIA–HUG partnership)', desde: 'Feb 2025', modalidade: 'Remote' },
    { papel: 'Research lead: deep research, agent evolution, LLM evaluation', organizacao: 'HUG Labs / CEIA', desde: 'Feb 2025' },
    { papel: 'AI Consultant', organizacao: 'FGV EMAp', desde: 'Oct 2025', modalidade: 'Remote, contract' },
    { papel: 'Tech Fellow (in partnership with IMPA) / Scholar', organizacao: 'Fundação Behring', desde: '2023' },
  ],
  pt: [
    { papel: 'AI Developer & Researcher', organizacao: 'HUG Labs (Holanda)', desde: 'fev/2025', modalidade: 'Remoto, contrato' },
    { papel: 'AI Researcher', organizacao: 'CEIA (parceria CEIA–HUG)', desde: 'fev/2025', modalidade: 'Remoto' },
    { papel: 'Research lead: deep research, agent evolution, avaliação de LLMs', organizacao: 'HUG Labs / CEIA', desde: 'fev/2025' },
    { papel: 'AI Consultant', organizacao: 'FGV EMAp', desde: 'out/2025', modalidade: 'Remoto, contrato' },
    { papel: 'Tech Fellow (em parceria com o IMPA) / Scholar', organizacao: 'Fundação Behring', desde: '2023' },
  ],
};

export const trajetoria: Record<Idioma, { periodo: string; texto: string }[]> = {
  en: [
    {
      periodo: '2021–2022',
      texto:
        'Software QA intern at Nova Smar S/A, testing industrial plant-management software. My focus on proving that a system works started here.',
    },
    {
      periodo: '2024–2025',
      texto:
        'Web programming teaching assistant (HTML, CSS, JS) for 75 girls from public schools, in a USP outreach program.',
    },
    { periodo: '2025', texto: 'Joined HUG Labs and CEIA.' },
    { periodo: '2025', texto: 'Started as an AI Consultant at FGV EMAp.' },
    { periodo: '2026', texto: 'Conv-to-Bench (ICLR 2026 workshops) and EvoEmbody (NeurIPS 2026 workshop).' },
  ],
  pt: [
    {
      periodo: '2021–2022',
      texto:
        'Estagiário de QA de software na Nova Smar S/A, testando software industrial de gestão de plantas. Meu foco em provar que um sistema funciona vem daqui.',
    },
    {
      periodo: '2024–2025',
      texto:
        'Monitor de programação web (HTML, CSS, JS) para 75 alunas de escolas públicas, num programa de extensão da USP.',
    },
    { periodo: '2025', texto: 'Entrada no HUG Labs e no CEIA.' },
    { periodo: '2025', texto: 'Início como AI Consultant na FGV EMAp.' },
    { periodo: '2026', texto: 'Conv-to-Bench (workshops da ICLR 2026) e EvoEmbody (workshop da NeurIPS 2026).' },
  ],
};

export const habilidades: Record<Idioma, { grupo: string; itens: string[] }[]> = {
  en: [
    { grupo: 'LLMs and agents', itens: ['LangGraph', 'ReAct', 'LLM-as-a-judge', 'prompt engineering', 'structured output', 'RAG'] },
    {
      grupo: 'Evaluation and statistics',
      itens: ['Bradley-Terry', 'bootstrap', 'Wald test', 'Wilson interval', "Cohen's κ", "Krippendorff's α", 'Brier score'],
    },
    { grupo: 'Infrastructure', itens: ['vLLM', 'Apptainer', 'HPC (H100)', 'AWS Bedrock', 'Gemini API', 'Docker', 'FastAPI'] },
    { grupo: 'Tools', itens: ['Python', 'Claude Code', 'Git', 'LaTeX'] },
  ],
  pt: [
    { grupo: 'LLM e agentes', itens: ['LangGraph', 'ReAct', 'LLM-as-a-judge', 'prompt engineering', 'saída estruturada', 'RAG'] },
    {
      grupo: 'Avaliação e estatística',
      itens: ['Bradley-Terry', 'bootstrap', 'teste de Wald', 'intervalo de Wilson', "Cohen's κ", "Krippendorff's α", 'Brier score'],
    },
    { grupo: 'Infra', itens: ['vLLM', 'Apptainer', 'HPC (H100)', 'AWS Bedrock', 'Gemini API', 'Docker', 'FastAPI'] },
    { grupo: 'Ferramentas', itens: ['Python', 'Claude Code', 'Git', 'LaTeX'] },
  ],
};

export interface Publicacao {
  /** Título do paper (original, em inglês) ou, sem paper publicado, por idioma. */
  titulo: string | Record<Idioma, string>;
  /** Rótulo curto de área, mostrado acima do título. */
  area: Record<Idioma, string>;
  autores?: string;
  venue: Record<Idioma, string>;
  nota?: Record<Idioma, string>;
  /** Link principal da linha. Só versões públicas (regra 4 do CLAUDE.md). */
  link?: { rotulo: string; href: string };
  /** slug do case correspondente, se houver. */
  caso?: string;
}

// Títulos dos papers ficam no original (inglês) nos dois idiomas.
export const publicacoes: Publicacao[] = [
  {
    titulo: 'Conv-to-Bench: Evaluating Language Models via User–Assistant Dialogues in Code Tasks',
    area: { en: 'LLM evaluation', pt: 'Avaliação de LLMs' },
    autores:
      'V. M. dos Santos*, A. C. Castro*, S. L. de S. Toledo, B. M. L. Calura, L. C. de M. Menezes, R. C. R. Mata, T. W. de L. Soares, B. L. M. de Oliveira',
    venue: { en: 'ICLR 2026 Workshops (DATA-FM, VerifAI-2)', pt: 'Workshops da ICLR 2026 (DATA-FM, VerifAI-2)' },
    nota: { en: '* Equal contribution.', pt: '* Contribuição igual.' },
    link: { rotulo: 'arXiv', href: 'https://arxiv.org/abs/2605.26440' },
    caso: 'conv-to-bench',
  },
  {
    titulo: 'EvoEmbody: Self-Evolving Embodied AI Agents in Interactive Text Environments',
    area: { en: 'Self-evolving agents', pt: 'Agentes autoevolutivos' },
    autores:
      'A. C. Castro, S. L. de S. Toledo, V. M. dos Santos, B. M. L. Calura, R. C. R. Mata, T. W. de L. Soares, B. L. M. de Oliveira',
    venue: {
      en: 'NeurIPS 2026 Workshop on Self-Evolving Diversity-Driven Search for Robust AI Systems',
      pt: 'NeurIPS 2026 Workshop on Self-Evolving Diversity-Driven Search for Robust AI Systems',
    },
    caso: 'evoembody',
  },
  {
    titulo: { en: 'Conv-to-Bench (extended version)', pt: 'Conv-to-Bench (versão estendida)' },
    area: { en: 'LLM evaluation', pt: 'Avaliação de LLMs' },
    venue: { en: 'Manuscript', pt: 'Manuscrito' },
  },
];
