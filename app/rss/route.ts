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
        (p) => {
          const categories = [
            ...(p.categories?.map(c => c.name) || []),
            p.category?.name
          ].filter(Boolean).map(c => `<category><![CDATA[${c}]]></category>`).join('\n      ');
          
          return `\n    <item>\n      <title><![CDATA[${p.title}]]></title>\n      <link>${domain}/blog/${p.slug}</link>\n      <guid isPermaLink="true">${domain}/blog/${p.slug}</guid>\n      <pubDate>${new Date(p.date).toUTCString()}</pubDate>\n      <description><![CDATA[${p.description || ''}]]></description>\n      <author>${SITE.email} (${SITE.name})</author>\n      ${categories ? categories : ''}\n    </item>`;
        }
      )
      .join('');
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">\n  <channel>\n    <title>بلاگ — ${SITE.name}</title>\n    <link>${domain}/blog</link>\n    <description>مقالات تخصصی درباره توسعه Full-Stack، بهینه‌سازی عملکرد، سئو فنی و Core Web Vitals.</description>\n    <language>fa-IR</language>\n    <managingEditor>${SITE.email} (${SITE.name})</managingEditor>\n    <webMaster>${SITE.email} (${SITE.name})</webMaster>\n    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>\n    <atom:link href="${domain}/feed.xml" rel="self" type="application/rss+xml" />\n    ${items}\n  </channel>\n</rss>\n`;
    return new NextResponse(xml, {
      headers: { 'Content-Type': 'application/rss+xml; charset=UTF-8' }
    });
  } catch (error) {
    // Return empty RSS feed if API is unavailable during build
    const domain = SITE.domain.replace(/\/$/, '');
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">\n  <channel>\n    <title>بلاگ — ${SITE.name}</title>\n    <link>${domain}/blog</link>\n    <description>مقالات تخصصی درباره توسعه Full-Stack، بهینه‌سازی عملکرد، سئو فنی و Core Web Vitals.</description>\n    <language>fa-IR</language>\n    <managingEditor>${SITE.email} (${SITE.name})</managingEditor>\n    <webMaster>${SITE.email} (${SITE.name})</webMaster>\n    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>\n    <atom:link href="${domain}/feed.xml" rel="self" type="application/rss+xml" />\n  </channel>\n</rss>\n`;
    return new NextResponse(xml, {
      headers: { 'Content-Type': 'application/rss+xml; charset=UTF-8' }
    });
  }
}


