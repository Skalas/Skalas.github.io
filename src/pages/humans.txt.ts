import type { APIRoute } from 'astro';
import { SITE } from '../consts';

export const GET: APIRoute = () => {
  const body = [
    '/* TEAM */',
    `Name: ${SITE.author.name}`,
    'Role: Mathematician, AI Lead, and Systems Builder',
    `Site: ${SITE.url}`,
    `LinkedIn: https://linkedin.com/in/${SITE.author.linkedin}`,
    `GitHub: @${SITE.author.github}`,
    `Twitter: @${SITE.author.twitter}`,
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
