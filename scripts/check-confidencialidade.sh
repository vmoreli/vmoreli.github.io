#!/usr/bin/env bash
# Busca os termos da lista proibida no código, conteúdo e build.
# A lista fica em content-src/termos-proibidos.txt (fora do git, um padrão
# ERE por linha) para que os termos nunca entrem no repositório.
# -I ignora arquivos binários (fontes woff2 etc.), que geram falsos positivos.
set -u
cd "$(dirname "$0")/.."
lista="content-src/termos-proibidos.txt"
if [ ! -s "$lista" ]; then
  echo "ERRO: $lista não encontrado. Copie content-src/ para esta máquina." >&2
  exit 2
fi
saida=$(grep -rniIE -f "$lista" src/ public/ dist/ 2>/dev/null)
if [ -n "$saida" ]; then
  echo "ERRO: termos da lista proibida encontrados:" >&2
  echo "$saida" >&2
  exit 1
fi
echo "OK: nenhum termo da lista proibida em src/, public/ ou dist/."
