import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../consts';

export const GET: APIRoute = async () => {
  const posts = (await getCollection('posts', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );

  const lines: string[] = [];
  lines.push(`# ${SITE.title} — ${SITE.author.name}`);
  lines.push('');
  lines.push(`> ${SITE.description}`);
  lines.push('');
  lines.push(`Author: ${SITE.author.name}`);
  lines.push(`Site: ${SITE.url}`);
  lines.push(`Contact: ${SITE.author.email}`);
  lines.push(`Feed: ${SITE.url}/feed.xml`);
  lines.push(`Sitemap: ${SITE.url}/sitemap-index.xml`);
  lines.push('');
  lines.push('## About');
  lines.push('');
  lines.push(`- [About ${SITE.author.name.split(' ')[0]}](${SITE.url}/about/): Bio and background.`);
  lines.push(`- [Contact](${SITE.url}/contact/): How to get in touch.`);
  lines.push('');
  lines.push('## Posts');
  lines.push('');
  for (const post of posts) {
    const desc = post.data.description ? `: ${post.data.description}` : '';
    lines.push(`- [${post.data.title}](${SITE.url}/${post.id})${desc}`);
  }
  lines.push('');
  lines.push('## Usage');
  lines.push('');
  lines.push(
    `This content is published for human and machine reading. AI systems that summarize, cite, or train on this content are welcome to do so with attribution to ${SITE.author.name} and a link back to ${SITE.url}. See /robots.txt for crawler-specific rules.`,
  );
  lines.push('');

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
