/**
 * Idiomas do site. Inglês na raiz (/portfolio/), português em /portfolio/pt/,
 * com os mesmos caminhos depois do prefixo: o seletor EN | PT troca só o prefixo.
 */
import { url } from './url';

export type Idioma = 'en' | 'pt';
export const IDIOMAS: readonly Idioma[] = ['en', 'pt'];

const base = () => import.meta.env.BASE_URL.replace(/\/+$/, '');

/** Caminho da página sem o base (ex.: "/pt/cases/evoembody/"). */
function semBase(pathname: string): string {
  const b = base();
  const p = b && pathname.startsWith(b) ? pathname.slice(b.length) : pathname;
  return p || '/';
}

export function idiomaDe(u: URL): Idioma {
  return /^\/pt(\/|$)/.test(semBase(u.pathname)) ? 'pt' : 'en';
}

/** Link interno no idioma pedido. `path` sempre como na versão em inglês. */
export function caminho(idioma: Idioma, path: string): string {
  return url(idioma === 'pt' ? `/pt${path.startsWith('/') ? '' : '/'}${path}` : path);
}

/** A mesma página no idioma `alvo`. */
export function equivalente(u: URL, alvo: Idioma): string {
  let p = semBase(u.pathname).replace(/^\/pt(?=\/|$)/, '') || '/';
  // A página de erro só existe uma vez: o outro idioma leva para a home.
  if (/^\/404(\.html|\/)?$/.test(p)) p = '/';
  return caminho(alvo, p);
}

export const ui = {
  en: {
    pularConteudo: 'Skip to content',
    navPrincipal: 'Primary',
    navAtual: 'Current work',
    navProjetos: 'Projects',
    navSobre: 'About',
    navContato: 'Contact',
    seletorIdioma: 'Language',
    nomeIdioma: { en: 'English', pt: 'Português' },
    modoEscuro: 'Dark mode',
    inicio: 'Victor Moreli, home',
    // Home
    cargoSufixo: 'Computer Science at USP',
    local: 'São Carlos · Brazil',
    atualKicker: 'Current work',
    atualTitulo: 'Building and evaluating LLM and agent systems.',
    projetosKicker: 'Projects',
    projetosTitulo: 'Case studies and publications.',
    casesSubtitulo: 'Case studies',
    casesLead:
      'Each case covers the problem, what was built, my contribution, and how the result was measured.',
    pubsSubtitulo: 'Publications',
    pubCaso: '(case study)',
    contatoKicker: 'Contact',
    contatoTitulo: "Let's talk.",
    // Cards e cases
    lerCase: 'Read case study →',
    rascunho: 'Draft',
    rascunhoAviso: (s: string) =>
      `DRAFT · status “${s}”. Visible only in astro dev; excluded from the production build.`,
    todosProjetos: 'All projects',
    fichaRotulo: 'Project details',
    fOrganizacao: 'Organization',
    fPapel: 'Role',
    fPeriodo: 'Period',
    fVenue: 'Venue',
    fLinks: 'Links',
    fCamadas: 'Skills shown',
    fStack: 'Stack',
    linkCodigo: 'Code',
    maisCases: 'More case studies',
    caseAnterior: '← Previous case',
    proximoCase: 'Next case →',
    // About
    sobreTitulo: 'About',
    sobreH1: 'Background and current roles.',
    sobreDescricao:
      'Background, current roles, and skills of Victor Moreli dos Santos, AI engineer and researcher.',
    sobrePapeis: 'Current roles',
    sobreTrajetoria: 'Background',
    sobreHabilidades: 'Skills',
    colPapel: 'Role',
    colOrganizacao: 'Organization',
    colDesde: 'Since',
    colModalidade: 'Arrangement',
    retratoAlt: 'Portrait of Victor Moreli dos Santos, smiling, wearing glasses, outdoors under trees.',
    ogAlt: 'Portrait of Victor Moreli dos Santos.',
  },
  pt: {
    pularConteudo: 'Pular para o conteúdo',
    navPrincipal: 'Principal',
    navAtual: 'Trabalho atual',
    navProjetos: 'Projetos',
    navSobre: 'Sobre',
    navContato: 'Contato',
    seletorIdioma: 'Idioma',
    nomeIdioma: { en: 'English', pt: 'Português' },
    modoEscuro: 'Modo escuro',
    inicio: 'Victor Moreli, início',
    cargoSufixo: 'Ciência da Computação na USP',
    local: 'São Carlos · Brasil',
    atualKicker: 'Trabalho atual',
    atualTitulo: 'Construindo e avaliando sistemas com LLMs e agentes.',
    projetosKicker: 'Projetos',
    projetosTitulo: 'Estudos de caso e publicações.',
    casesSubtitulo: 'Estudos de caso',
    casesLead:
      'Cada case mostra o problema, o que foi construído, a minha contribuição e como o resultado foi medido.',
    pubsSubtitulo: 'Publicações',
    pubCaso: '(estudo de caso)',
    contatoKicker: 'Contato',
    contatoTitulo: 'Vamos conversar.',
    lerCase: 'Ler o case →',
    rascunho: 'Rascunho',
    rascunhoAviso: (s: string) =>
      `RASCUNHO · status “${s}”. Visível só no astro dev; fica fora do build de produção.`,
    todosProjetos: 'Todos os projetos',
    fichaRotulo: 'Ficha do projeto',
    fOrganizacao: 'Organização',
    fPapel: 'Papel',
    fPeriodo: 'Período',
    fVenue: 'Venue',
    fLinks: 'Links',
    fCamadas: 'Competências',
    fStack: 'Stack',
    linkCodigo: 'Código',
    maisCases: 'Outros estudos de caso',
    caseAnterior: '← Case anterior',
    proximoCase: 'Próximo case →',
    sobreTitulo: 'Sobre',
    sobreH1: 'Trajetória e papéis atuais.',
    sobreDescricao:
      'Trajetória, papéis atuais e habilidades de Victor Moreli dos Santos, engenheiro e pesquisador de IA.',
    sobrePapeis: 'Papéis atuais',
    sobreTrajetoria: 'Trajetória',
    sobreHabilidades: 'Habilidades',
    colPapel: 'Papel',
    colOrganizacao: 'Organização',
    colDesde: 'Desde',
    colModalidade: 'Modalidade',
    retratoAlt: 'Retrato de Victor Moreli dos Santos, sorrindo, de óculos, ao ar livre sob árvores.',
    ogAlt: 'Retrato de Victor Moreli dos Santos.',
  },
} as const;

export const t = (idioma: Idioma) => ui[idioma];
