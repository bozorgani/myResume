// Simple sitemap generator for static routes and dynamic project slugs
import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const DOMAIN = 'https://www.bozorgani.ir';

// Static routes of the site
const staticPaths = ['/', '/projects', '/resume', '/contact', '/blog'];

// Dynamic project slugs should be kept in sync with lib/projects.ts
const projectSlugs = ['full-stack-developer', 'perf-optimization-toolkit'];
const postSlugs = ['optimize-core-web-vitals-nextjs', 'technical-seo-for-developers'];

const urls = [
  ...staticPaths.map((p) => `${DOMAIN}${p}`),
  ...projectSlugs.map((slug) => `${DOMAIN}/projects/${slug}`),
  ...postSlugs.map((slug) => `${DOMAIN}/blog/${slug}`)
];

const urlset = urls
  .map(
    (u) => `  <url>\n    <loc>${u}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`
  )
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlset}\n</urlset>\n`;

const outDir = resolve(process.cwd(), 'public');
mkdirSync(outDir, { recursive: true });
writeFileSync(resolve(outDir, 'sitemap.xml'), xml, 'utf8');
console.log('sitemap.xml generated');


