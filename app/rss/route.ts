import { NextResponse } from 'next/server';
import { getAllPosts, getPostUrl } from '@/lib/posts';
import { SITE } from '@/lib/seo';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Helper function to escape XML content
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Helper function to strip HTML tags and get text content
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

export async function GET() {
  try {
    const domain = SITE.domain.replace(/\/$/, '');
    const posts = await getAllPosts();
    // Limit to latest 50 posts for RSS feed
    const recentPosts = posts.slice(0, 50);
    
    const items = recentPosts
      .map(
        (p) => {
          const categories = [
            ...(p.categories?.map(c => c.name) || []),
            p.category?.name
          ].filter((c): c is string => Boolean(c)).map(c => `<category><![CDATA[${escapeXml(c)}]]></category>`).join('\n      ');
          
          // Get post URL using the same function as blog page
          const postUrl = `${domain}${getPostUrl(p)}`;
          
          // Prepare description - use post description or first 200 chars of content
          let description = p.description || '';
          if (!description && p.content) {
            description = stripHtml(p.content).substring(0, 200) + '...';
          }
          
          // Prepare content - strip HTML and limit length
          const content = p.content ? stripHtml(p.content).substring(0, 500) + '...' : description;
          
          // Image tag if available
          const imageTag = p.image 
            ? `\n      <enclosure url="${p.image.startsWith('http') ? p.image : domain + p.image}" type="image/jpeg" />`
            : '';
          
          // Author information
          const author = `${SITE.email} (${SITE.name})`;
          
          // Publication and modification dates
          const pubDate = new Date(p.date).toUTCString();
          const modDate = p.updatedAt ? new Date(p.updatedAt).toUTCString() : pubDate;
          
          return `\n    <item>\n      <title><![CDATA[${escapeXml(p.title)}]]></title>\n      <link>${postUrl}</link>\n      <guid isPermaLink="true">${postUrl}</guid>\n      <pubDate>${pubDate}</pubDate>\n      <description><![CDATA[${escapeXml(description)}]]></description>\n      <content:encoded><![CDATA[${escapeXml(content)}]]></content:encoded>\n      <author>${author}</author>\n      <dc:creator><![CDATA[${SITE.name}]]></dc:creator>${imageTag}\n      ${categories ? categories : ''}\n    </item>`;
        }
      )
      .join('');
      
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">\n  <channel>\n    <title><![CDATA[بلاگ — ${SITE.name}]]></title>\n    <link>${domain}/blog</link>\n    <description><![CDATA[مقالات تخصصی درباره توسعه Full-Stack، بهینه‌سازی عملکرد، سئو فنی و Core Web Vitals.]]></description>\n    <language>fa-IR</language>\n    <managingEditor>${SITE.email} (${SITE.name})</managingEditor>\n    <webMaster>${SITE.email} (${SITE.name})</webMaster>\n    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>\n    <atom:link href="${domain}/feed.xml" rel="self" type="application/rss+xml" />\n    <atom:link href="${domain}/blog" rel="alternate" type="text/html" />\n    <image>\n      <url>${domain}${SITE.ogImage}</url>\n      <title><![CDATA[${SITE.name}]]></title>\n      <link>${domain}/blog</link>\n    </image>\n    ${items}\n  </channel>\n</rss>\n`;
    
    return new NextResponse(xml, {
      headers: { 
        'Content-Type': 'application/rss+xml; charset=UTF-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
      }
    });
  } catch (error) {
    console.error('[RSS Feed] Error generating feed:', error);
    // Return empty RSS feed if API is unavailable during build
    const domain = SITE.domain.replace(/\/$/, '');
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">\n  <channel>\n    <title><![CDATA[بلاگ — ${SITE.name}]]></title>\n    <link>${domain}/blog</link>\n    <description><![CDATA[مقالات تخصصی درباره توسعه Full-Stack، بهینه‌سازی عملکرد، سئو فنی و Core Web Vitals.]]></description>\n    <language>fa-IR</language>\n    <managingEditor>${SITE.email} (${SITE.name})</managingEditor>\n    <webMaster>${SITE.email} (${SITE.name})</webMaster>\n    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>\n    <atom:link href="${domain}/feed.xml" rel="self" type="application/rss+xml" />\n    <atom:link href="${domain}/blog" rel="alternate" type="text/html" />\n  </channel>\n</rss>\n`;
    return new NextResponse(xml, {
      headers: { 
        'Content-Type': 'application/rss+xml; charset=UTF-8',
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
      }
    });
  }
}


