import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { posts } from '../lib/posts.js';

const DOMAIN = 'https://bozorgani.ir';

function generateRss(posts) {
  const items = posts
    .map(
      (p) => `\n    <item>\n      <title><![CDATA[${p.title}]]></title>\n      <link>${DOMAIN}/blog/${p.slug}</link>\n      <guid>${DOMAIN}/blog/${p.slug}</guid>\n      <pubDate>${new Date(p.date).toUTCString()}</pubDate>\n      <description><![CDATA[${p.description}]]></description>\n    </item>`
    )
    .join('');
  return `<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<rss version=\"2.0\">\n  <channel>\n    <title>بلاگ — محمدامین بزرگانی</title>\n    <link>${DOMAIN}/blog</link>\n    <description>مقالات درباره عملکرد، سئو و توسعه فول‌استک.</description>\n    ${items}\n  </channel>\n</rss>\n`;
}

function generateJson(posts) {
  return JSON.stringify(
    {
      version: 'https://jsonfeed.org/version/1',
      title: 'بلاگ — محمدامین بزرگانی',
      home_page_url: `${DOMAIN}/blog`,
      feed_url: `${DOMAIN}/feed.json`,
      items: posts.map((p) => ({
        id: `${DOMAIN}/blog/${p.slug}`,
        url: `${DOMAIN}/blog/${p.slug}`,
        title: p.title,
        content_text: p.description,
        date_published: p.date
      }))
    },
    null,
    2
  );
}

const outDir = resolve(process.cwd(), 'public');
mkdirSync(outDir, { recursive: true });
writeFileSync(resolve(outDir, 'feed.xml'), generateRss(posts), 'utf8');
writeFileSync(resolve(outDir, 'feed.json'), generateJson(posts), 'utf8');
console.log('feed.xml and feed.json generated');


