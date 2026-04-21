import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://skalas.me',
  trailingSlash: 'ignore',
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
  ],
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      wrap: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  redirects: {
    '/devops/2015/10/15/docker': '/juay-the-docker',
    '/devops/2015/10/15/docker/': '/juay-the-docker',
  },
  image: {
    responsiveStyles: true,
  },
  build: {
    format: 'directory',
  },
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
});
