import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../consts';

function stripMdxBoilerplate(raw: string): string {
  return raw
    .replace(/^import\s+[^\n]+\n+/gm, '')
    .replace(/<Aside[^>]*>/g, '\n> **Note:** ')
    .replace(/<\/Aside>/g, '\n')
    .trim();
}

export const GET: APIRoute = async () => {
  const posts = (await getCollection('posts', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );

  const lines: string[] = [];
  lines.push(`# ${SITE.title} · ${SITE.author.name} (Full Corpus)`);
  lines.push('');
  lines.push(`> ${SITE.description}`);
  lines.push('');
  lines.push(`Author: ${SITE.author.name}`);
  lines.push('Role: Mathematician, AI Lead Consultant (Government of El Salvador), Systems Builder');
  lines.push(`Location: ${SITE.author.location}`);
  lines.push(`Site: ${SITE.url}`);
  lines.push(`Contact: ${SITE.author.email}`);
  lines.push(`Index: ${SITE.url}/llms.txt`);
  lines.push(`Feed: ${SITE.url}/feed.xml`);
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## About Miguel Escalante');
  lines.push('');
  lines.push(
    'Projects rarely fail over two points of AUC. They fail when the human bottleneck downstream gets ignored. I learned that building crime prediction models for the Mexico City police (C4, 2010–2015), and it held through federal open data (Presidency of Mexico, 2016), earthquake response (Verificado19s, 2017), vehicle pricing pipelines (Kavak, 2022–2024), and national healthcare (DoctorSV, Government of El Salvador, 2024–Present).',
  );
  lines.push('');
  lines.push(
    'I studied Applied Mathematics (B.Sc.) and Data Science (M.Sc.) at ITAM in Mexico City, where I taught graduate courses for four years while working full-time. I also run a specialty coffee shop (Aluxe) and build its operating software (CNTRL).',
  );
  lines.push('');

  for (const post of posts) {
    const isoDate = post.data.date.toISOString().slice(0, 10);
    lines.push('---');
    lines.push('');
    lines.push(`## ${post.data.title}`);
    lines.push('');
    lines.push(`- URL: ${SITE.url}/${post.id}/`);
    lines.push(`- Published: ${isoDate}`);
    if (post.data.category) lines.push(`- Category: ${post.data.category}`);
    if (post.data.description) lines.push(`- Summary: ${post.data.description}`);
    lines.push('');
    lines.push(stripMdxBoilerplate(post.body ?? ''));
    lines.push('');
  }

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
