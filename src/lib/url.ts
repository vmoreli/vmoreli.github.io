/**
 * Monta um link interno respeitando o `base` do astro.config.
 * Caminhos de página (sem extensão) ganham barra final (trailingSlash: 'always').
 */
export function url(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  const [semHash, hash] = path.split('#', 2);
  let p = semHash.replace(/^\/+/, '');
  const ultimo = p.split('/').pop() ?? '';
  const ehArquivo = ultimo.includes('.');
  if (p && !ehArquivo && !p.endsWith('/')) p += '/';
  const final = `${base}/${p}`;
  return hash !== undefined ? `${final}#${hash}` : final;
}
