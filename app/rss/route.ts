import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/posts';
import { SITE } from '@/lib/seo';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const domain = SITE.domain.replace(/\/$/, '');
    const posts = await getAllPosts();
    const items = posts
      .map(
        (p) => `\n    <item>\n      <title><![CDATA[${p.title}]]></title>\n      <link>${domain}/blog/${p.slug}</link>\n      <guid>${domain}/blog/${p.slug}</guid>\n      <pubDate>${new Date(p.date).toUTCString()}</pubDate>\n      <description><![CDATA[${p.description}]]></description>\n    </item>`
      )
      .join('');
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n  <channel>\n    <title>بلاگ — ${SITE.name}</title>\n    <link>${domain}/blog</link>\n    <description>مقالات درباره عملکرد، سئو و توسعه فول‌استک.</description>\n    ${items}\n  </channel>\n</rss>\n`;
    return new NextResponse(xml, {
      headers: { 'Content-Type': 'application/rss+xml; charset=UTF-8' }
    });
  } catch (error) {
    // Return empty RSS feed if API is unavailable during build
    const domain = SITE.domain.replace(/\/$/, '');
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n  <channel>\n    <title>بلاگ — ${SITE.name}</title>\n    <link>${domain}/blog</link>\n    <description>مقالات درباره عملکرد، سئو و توسعه فول‌استک.</description>\n  </channel>\n</rss>\n`;
    return new NextResponse(xml, {
      headers: { 'Content-Type': 'application/rss+xml; charset=UTF-8' }
    });
  }
}


