export const SITE = {
  title: 'Skalas',
  tagline: 'Miguel Escalante — Data Scientist, Mathematician, Developer',
  description:
    'Notes on data science, machine learning, engineering, and life in Mexico City — by Miguel Escalante.',
  url: 'https://skalas.me',
  author: {
    name: 'Miguel Escalante',
    email: 'escalas5@gmail.com',
    location: 'Mexico City, Mexico',
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
