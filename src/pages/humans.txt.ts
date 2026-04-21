import type { APIRoute } from 'astro';
import { SITE } from '../consts';

export const GET: APIRoute = () => {
  const body = [
    '/* TEAM */',
    `Name: ${SITE.author.name}`,
    'Role: Data Scientist, Mathematician, Developer',
    `Site: ${SITE.url}`,
    `Twitter: @${SITE.author.twitter}`,
    `GitHub: @${SITE.author.github}`,
    `Location: ${SITE.author.location}`,
    '',
    '/* SITE */',
    `Last update: ${new Date().toISOString().slice(0, 10)}`,
    'Language: English',
    'Doctype: HTML5',
    'Generator: Astro',
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
