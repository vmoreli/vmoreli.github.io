// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// GitHub Pages: repo vmoreli/vmoreli.github.io, servido na raiz de vmoreli.github.io.
export default defineConfig({
  site: 'https://vmoreli.github.io',
  base: '/',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [mdx()],
});
