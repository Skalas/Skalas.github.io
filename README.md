# skalas.me

Personal site and blog of [Miguel Escalante](https://skalas.me) — data scientist, mathematician, and developer in Mexico City.

Built with [Astro](https://astro.build) + Tailwind CSS + MDX. Deployed to GitHub Pages.

## Develop

```bash
npm install
npm run dev
```

Dev server at http://127.0.0.1:4321.

## Build

```bash
npm run build     # outputs to dist/
npm run preview   # serves dist/ locally
```

## Write a post

Create an MDX file in `src/content/posts/`. The filename becomes the URL slug (e.g. `my-post.mdx` → `/my-post`).

```mdx
---
title: "My post title"
description: "One-line summary used for SEO and post listing."
date: 2026-01-15
category: Data Science
tags: [machine-learning, python]
hero: ../../assets/heroes/post-bg-02.jpg
heroAlt: "Description of the image"
# optional:
# updated: 2026-02-01
# mathjax: true            # load MathJax on this post only
# redirectFrom: [/old-url] # add a 301 redirect
---

Post content goes here.
```

## Structure

```
src/
├── assets/heroes/    # source images (Astro optimizes them)
├── components/       # Astro components (Nav, Footer, Hero, SEO…)
├── content/posts/    # MDX posts (content collection)
├── layouts/          # BaseLayout, PageLayout, PostLayout
├── pages/            # File-based routes + API endpoints
├── styles/           # global.css (Tailwind + design tokens)
├── consts.ts         # site-wide constants
└── content.config.ts # content collection schema

public/               # copied verbatim to dist (CNAME, favicon)
.github/workflows/    # GitHub Pages deploy workflow
```

## Deploy

Push to `main`. The workflow in `.github/workflows/deploy.yml` builds Astro and deploys to Pages.

One-time GitHub setup: repository **Settings → Pages → Source = "GitHub Actions"**.

## License

[MIT](LICENSE)
