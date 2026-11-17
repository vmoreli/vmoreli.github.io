# Portfólio de IA — Victor Moreli dos Santos

Site estático de portfólio que apresenta o trabalho do Victor em aplicações
de IA: orquestração de agentes, engenharia de prompts, avaliação de LLMs e
resultados mensuráveis. O material-fonte está em `content-src/`.

Idioma do site: bilíngue (decidido pelo Victor em 2026-11-17). Inglês na raiz,
português em `/pt/`, com os mesmos caminhos; seletor EN | PT no cabeçalho.
Cada case existe em `src/content/cases/en/` e `src/content/cases/pt/`: toda
mudança de conteúdo vale para os dois. Textos de interface em `src/lib/i18n.ts`;
dados em `src/data/*.ts`, por idioma. O material-fonte está em português e é
traduzido fielmente. Nomes próprios (USP, ICMC, Fundação Behring) ficam como estão.

## Regras de conteúdo (obrigatórias)

1. **Nunca invente números.** Todo número, métrica, porcentagem, custo ou
   tamanho de amostra no site precisa existir literalmente em
   `content-src/cases/*.md`. Se um número for necessário e não existir,
   pergunte ao Victor.
2. **Nunca invente contribuição individual.** Use apenas o que está na seção
   "Minha contribuição" de cada case. Trechos com `[CONFIRMAR]` ou
   `[PREENCHER]` não podem ir para o site: pare e pergunte.
3. **Confidencialidade.** Siga `content-src/docs/02-confidencialidade.md`.
   Os termos da lista proibida nunca aparecem em código, conteúdo, metadados,
   nomes de arquivo, alt text ou commits.
4. **Papers.** Linke apenas versões públicas (arXiv, página do workshop,
   GitHub). Não hospede nem linke PDFs de versões em revisão.
5. **Tom.** Primeira pessoa, direto, sem adjetivos promocionais
   ("revolucionário", "inovador"). Cada afirmação de impacto vem com o número
   e o contexto de medição (amostra, comparação, método).

## Arquitetura

Veja `content-src/docs/04-design-e-stack.md`. Resumo: Astro com content
collections, um arquivo markdown por case, deploy estático (GitHub Pages).

## Checagem antes de publicar

Rode e confirme que não há ocorrências:

```bash
npm run check:conf
```

O script lê os padrões de `content-src/termos-proibidos.txt` (fora do git,
um padrão ERE por linha). Os termos nunca são escritos em arquivos versionados.

Se aparecer algo, remova e avise o Victor antes de publicar.
