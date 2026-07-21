import { readFileSync, readdirSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Map post slug -> last-modified date, parsed from frontmatter, so the
// sitemap can advertise <lastmod> (the content collection isn't available here).
const postsDir = new URL('./src/content/posts/', import.meta.url);
const lastmodBySlug = Object.fromEntries(
  readdirSync(postsDir)
    .filter((file) => /\.mdx?$/.test(file))
    .map((file) => {
      const frontmatter = readFileSync(new URL(file, postsDir), 'utf-8').match(
        /^---\n([\s\S]*?)\n---/,
      )?.[1] ?? '';
      const read = (key) =>
        frontmatter
          .match(new RegExp(`^${key}:\\s*([^#\\n]+)`, 'm'))?.[1]
          ?.trim()
          .replace(/^["']|["']$/g, '');
      return [file.replace(/\.mdx?$/, ''), read('updated') ?? read('date')];
    })
    .filter(([, date]) => date),
);

export default defineConfig({
  site: 'https://skalas.me',
  trailingSlash: 'ignore',
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/404'),
      serialize(item) {
        const slug = new URL(item.url).pathname.replace(/^\/|\/$/g, '');
        const date = lastmodBySlug[slug];
        if (date) item.lastmod = new Date(date).toISOString();
        return item;
      },
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
