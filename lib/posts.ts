export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO
  image?: string;
  content: string;
  readingTime?: number;
  canonicalUrl?: string;
  category?: {
    name: string;
    slug: string;
  };
  tags?: Array<{
    name: string;
    slug: string;
  }>;
};

const CMS_API_BASE = process.env.NEXT_PUBLIC_CMS_API || 'http://localhost:4000';

// Log API base URL in development for debugging
if (typeof window === 'undefined' && process.env.NODE_ENV === 'development') {
  console.log(`[posts.ts] CMS_API_BASE: ${CMS_API_BASE}`);
}

function buildMediaUrl(path?: string): string | undefined {
  if (!path) return undefined;
  if (path.startsWith('http')) return path;
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${CMS_API_BASE}${clean}`;
}

function extractTextFromTiptap(node: any): string {
  if (!node) return '';
  if (typeof node === 'string') return node;
  if (Array.isArray(node)) return node.map(extractTextFromTiptap).join('');
  const text = node.text || '';
  const children = node.content ? extractTextFromTiptap(node.content) : '';
  const withParagraph = node.type === 'paragraph' ? `\n\n${text}${children}` : `${text}${children}`;
  return withParagraph;
}

function renderContentToHtml(content: any): string {
  if (!content) return '';
  if (typeof content === 'string') return content; // assume HTML/Markdown already
  // Minimal TipTap JSON -> HTML renderer (paragraphs, headings, bold/italic, lists)
  try {
    const walk = (node: any): string => {
      if (!node) return '';
      if (Array.isArray(node)) return node.map(walk).join('');
      const type = node.type;
      const text = node.text || '';
      const marks = (node.marks || []).map((m: any) => m.type);
      const openMarks = (s: string) => marks.reduce((acc: string, m: string) => {
        if (m === 'bold' || m === 'strong') return `<strong>${acc}`;
        if (m === 'italic' || m === 'em') return `<em>${acc}`;
        if (m === 'code') return `<code>${acc}`;
        return acc;
      }, s);
      const closeMarks = (s: string) => marks.reduceRight((acc: string, m: string) => {
        if (m === 'bold' || m === 'strong') return `${acc}</strong>`;
        if (m === 'italic' || m === 'em') return `${acc}</em>`;
        if (m === 'code') return `${acc}</code>`;
        return acc;
      }, '');
      const children = node.content ? walk(node.content) : '';
      switch (type) {
        case 'text':
          return `${openMarks(text)}${closeMarks('')}`;
        case 'paragraph':
          return `<p>${children}</p>`;
        case 'heading': {
          const level = Math.min(6, Math.max(1, node.attrs?.level || 2));
          return `<h${level}>${children}</h${level}>`;
        }
        case 'bulletList':
          return `<ul>${children}</ul>`;
        case 'orderedList':
          return `<ol>${children}</ol>`;
        case 'listItem':
          return `<li>${children}</li>`;
        case 'blockquote':
          return `<blockquote>${children}</blockquote>`;
        case 'horizontalRule':
          return '<hr />';
        case 'hardBreak':
          return '<br />';
        case 'image': {
          const src = buildMediaUrl(node.attrs?.src) || '';
          const alt = node.attrs?.alt || '';
          return src ? `<img src="${src}" alt="${alt}" />` : '';
        }
        default:
          return children;
      }
    };
    return walk(content);
  } catch {
    // Fallback: plain text
    return `<p>${extractTextFromTiptap(content)}</p>`;
  }
}

function mapCmsPostToSitePost(p: any): Post {
  const imagePath = p?.coverImageId?.path || p?.seo?.ogImageId?.path;
  return {
    slug: p.slug,
    title: p.title,
    description: p.excerpt || p.seo?.metaDescription || '',
    date: p.publishAt || p.updatedAt || p.createdAt || new Date().toISOString(),
    image: buildMediaUrl(imagePath),
    content: renderContentToHtml(p.content),
    readingTime: p.readingTime || undefined,
    canonicalUrl: p.canonicalUrl || undefined,
    category: p.categoryId ? {
      name: p.categoryId.name || '',
      slug: p.categoryId.slug || ''
    } : undefined,
    tags: Array.isArray(p.tags) && p.tags.length > 0
      ? p.tags.map((tag: any) => ({
          name: tag.name || '',
          slug: tag.slug || ''
        }))
      : undefined
  };
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    const url = `${CMS_API_BASE}/v1/posts?status=published&limit=100&t=${Date.now()}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    try {
      const res = await fetch(url, { 
        signal: controller.signal,
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
      clearTimeout(timeoutId);
      
      if (!res.ok) {
        console.error(`[getAllPosts] API returned ${res.status} ${res.statusText} for ${url}`);
        return [];
      }
      
      const data = await res.json();
      const items = Array.isArray(data?.items) ? (data.items as unknown[]) : [];
      const mapped = items.map(mapCmsPostToSitePost) as Post[];
      return mapped.sort((a: Post, b: Post) => (a.date < b.date ? 1 : -1));
    } catch (fetchError) {
      clearTimeout(timeoutId);
      // If fetch fails (network error, timeout, etc.), return empty array
      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        console.error(`[getAllPosts] Request timeout for ${url}`);
        return [];
      }
      console.error(`[getAllPosts] Fetch error for ${url}:`, fetchError);
      throw fetchError; // Re-throw to be caught by outer catch
    }
  } catch (error) {
    // Log error but don't crash - return empty array if API is unavailable
    console.error(`[getAllPosts] Error fetching posts from ${CMS_API_BASE}:`, error);
    if (process.env.NODE_ENV === 'development') {
      console.error('Make sure NEXT_PUBLIC_CMS_API is set correctly');
    }
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  try {
    const url = `${CMS_API_BASE}/v1/posts/slug/${slug}?t=${Date.now()}`;
    const res = await fetch(url, { 
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
    if (!res.ok) {
      console.error(`[getPostBySlug] API returned ${res.status} ${res.statusText} for ${url}`);
      return undefined;
    }
    const data = await res.json();
    return mapCmsPostToSitePost(data);
  } catch (error) {
    console.error(`[getPostBySlug] Error fetching post ${slug} from ${CMS_API_BASE}:`, error);
    return undefined;
  }
}


