import type { APIRoute } from 'astro';
import { SITE } from '../consts';

const aiBots = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-Web',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
  'Bytespider',
  'Amazonbot',
  'Meta-ExternalAgent',
  'Meta-ExternalFetcher',
  'DuckAssistBot',
  'YouBot',
  'cohere-ai',
  'Mistralbot',
];

const socialBots = [
  'Twitterbot',
  'facebookexternalhit',
  'LinkedInBot',
  'Slackbot',
  'Slackbot-LinkExpanding',
  'Discordbot',
  'WhatsApp',
  'TelegramBot',
  'Applebot',
];

const searchBots = ['Googlebot', 'Googlebot-Image', 'Bingbot', 'DuckDuckBot'];

export const GET: APIRoute = () => {
  const lines: string[] = [];
  lines.push(`# robots.txt for ${SITE.url}`);
  lines.push('');
  lines.push('User-agent: *');
  lines.push('Allow: /');
  lines.push('');
  lines.push('# Search engines');
  for (const bot of searchBots) {
    lines.push(`User-agent: ${bot}`);
    lines.push('Allow: /');
  }
  lines.push('');
  lines.push('# Social / link preview crawlers');
  for (const bot of socialBots) {
    lines.push(`User-agent: ${bot}`);
    lines.push('Allow: /');
  }
  lines.push('');
  lines.push('# AI / LLM crawlers — change to "Disallow: /" to opt out of any one');
  for (const bot of aiBots) {
    lines.push(`User-agent: ${bot}`);
    lines.push('Allow: /');
  }
  lines.push('');
  lines.push(`Sitemap: ${SITE.url}/sitemap-index.xml`);
  lines.push('');

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
