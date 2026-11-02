export const SITE = {
  title: 'Skalas',
  tagline: 'Miguel Escalante · Mathematician, AI Lead, and Systems Builder',
  description:
    'Field notes on production AI, data systems, and career lessons from San Salvador and Mexico City · by Miguel Escalante.',
  url: 'https://skalas.me',
  defaultOgImage: { src: '/og-default.jpg', width: 1900, height: 600 },
  author: {
    name: 'Miguel Escalante',
    email: 'escalas5@gmail.com',
    location: 'San Salvador, El Salvador',
    twitter: 'Skalas',
    github: 'Skalas',
    linkedin: 'skalas',
  },
  lang: 'en',
  locale: 'en_US',
  timezone: 'America/Mexico_City',
} as const;

export const NAV = [
  { href: '/', label: 'Writing' },
  { href: '/about/', label: 'About' },
  { href: '/contact/', label: 'Contact' },
] as const;

export const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/Skalas', rel: 'me noopener' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/skalas', rel: 'me noopener' },
  { label: 'Twitter', href: 'https://twitter.com/Skalas', rel: 'me noopener' },
] as const;
