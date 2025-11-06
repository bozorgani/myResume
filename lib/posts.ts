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

// Log API base URL for debugging (both dev and production)
if (typeof window === 'undefined') {
  console.log(`[posts.ts] CMS_API_BASE: ${CMS_API_BASE}`);
  console.log(`[posts.ts] NODE_ENV: ${process.env.NODE_ENV}`);
  console.log(`[posts.ts] NEXT_PUBLIC_CMS_API from env: ${process.env.NEXT_PUBLIC_CMS_API || 'NOT SET'}`);
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
      const marks = (node.marks || []).map((m: any) => m);
      const openMarks = (s: string) => {
        let result = s;
        for (const mark of marks) {
          const type = mark.type;
          if (type === 'bold' || type === 'strong') result = `<strong>${result}`;
          else if (type === 'italic' || type === 'em') result = `<em>${result}`;
          else if (type === 'code') result = `<code>${result}`;
          else if (type === 'link') {
            const href = mark.attrs?.href || '#';
            const target = mark.attrs?.target || '_self';
            const rel = target === '_blank' ? 'noopener noreferrer' : '';
            result = `<a href="${href}"${target ? ` target="${target}"` : ''}${rel ? ` rel="${rel}"` : ''}>${result}`;
          }
        }
        return result;
      };
      const closeMarks = (s: string) => {
        let result = s;
        // Close marks in reverse order
        for (let i = marks.length - 1; i >= 0; i--) {
          const mark = marks[i];
          const type = mark.type;
          if (type === 'bold' || type === 'strong') result = `${result}</strong>`;
          else if (type === 'italic' || type === 'em') result = `${result}</em>`;
          else if (type === 'code') result = `${result}</code>`;
          else if (type === 'link') result = `${result}</a>`;
        }
        return result;
      };
      const children = node.content ? walk(node.content) : '';
      switch (type) {
        case 'text': {
          const markedText = openMarks(text);
          return closeMarks(markedText);
        }
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
        case 'codeBlock': {
          const language = node.attrs?.language || '';
          const langAttr = language ? ` class="language-${language}"` : '';
          // For code blocks, extract plain text without mark processing
          const extractCodeText = (contentNode: any): string => {
            if (!contentNode) return '';
            if (typeof contentNode === 'string') return contentNode;
            if (Array.isArray(contentNode)) return contentNode.map(extractCodeText).join('');
            if (contentNode.type === 'text') return contentNode.text || '';
            if (contentNode.content) return extractCodeText(contentNode.content);
            return '';
          };
          const codeText = extractCodeText(node.content || '');
          // Escape HTML entities in code blocks
          const escapedContent = codeText
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
          return `<pre><code${langAttr}>${escapedContent}</code></pre>`;
        }
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
    console.log(`[getAllPosts] Attempting to fetch from: ${url}`);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
    
    try {
      const res = await fetch(url, { 
        signal: controller.signal,
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
          'Accept': 'application/json'
        }
      });
      clearTimeout(timeoutId);
      
      console.log(`[getAllPosts] Response status: ${res.status} ${res.statusText}`);
      
      if (!res.ok) {
        const errorText = await res.text().catch(() => 'Could not read error response');
        console.error(`[getAllPosts] API returned ${res.status} ${res.statusText} for ${url}`);
        console.error(`[getAllPosts] Error response: ${errorText}`);
        return [];
      }
      
      const data = await res.json();
      console.log(`[getAllPosts] Received data:`, { 
        hasItems: !!data?.items, 
        itemsCount: Array.isArray(data?.items) ? data.items.length : 0,
        total: data?.total 
      });
      
      const items = Array.isArray(data?.items) ? (data.items as unknown[]) : [];
      if (items.length === 0) {
        console.warn(`[getAllPosts] No items in response. Full response:`, JSON.stringify(data, null, 2));
      }
      
      const mapped = items.map(mapCmsPostToSitePost) as Post[];
      const sorted = mapped.sort((a: Post, b: Post) => (a.date < b.date ? 1 : -1));
      console.log(`[getAllPosts] Returning ${sorted.length} posts`);
      return sorted;
    } catch (fetchError) {
      clearTimeout(timeoutId);
      // If fetch fails (network error, timeout, etc.), return empty array instead of throwing
      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        console.warn(`[getAllPosts] Request timeout for ${url} - returning empty array`);
        return [];
      }
      // Handle connection errors gracefully
      const isConnectionError = fetchError instanceof Error && (
        fetchError.message.includes('ECONNREFUSED') || 
        fetchError.message.includes('fetch failed') ||
        (fetchError.cause && typeof fetchError.cause === 'object' && 'code' in fetchError.cause && fetchError.cause.code === 'ECONNREFUSED')
      );
      
      if (isConnectionError) {
        console.warn(`[getAllPosts] Connection refused for ${url} - API may not be running. Returning empty array.`);
        console.warn(`[getAllPosts] Make sure CMS API is running or NEXT_PUBLIC_CMS_API is set correctly. Current value: ${CMS_API_BASE}`);
        return [];
      }
      console.warn(`[getAllPosts] Fetch error for ${url}:`, fetchError instanceof Error ? fetchError.message : fetchError);
      // Return empty array instead of throwing - this allows the app to continue working
      return [];
    }
  } catch (error) {
    // Catch any other unexpected errors and return empty array
    console.warn(`[getAllPosts] Unexpected error fetching posts from ${CMS_API_BASE}:`, error instanceof Error ? error.message : error);
    console.warn(`[getAllPosts] Make sure NEXT_PUBLIC_CMS_API is set correctly. Current value: ${CMS_API_BASE}`);
    // Always return empty array instead of throwing - app should work even without API
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
    // Handle connection errors gracefully
    const isConnectionError = error instanceof Error && (
      error.message.includes('ECONNREFUSED') || 
      error.message.includes('fetch failed') ||
      (error.cause && typeof error.cause === 'object' && 'code' in error.cause && error.cause.code === 'ECONNREFUSED')
    );
    
    if (isConnectionError) {
      console.warn(`[getPostBySlug] Connection refused for ${slug} - API may not be running. Returning undefined.`);
    } else {
      console.warn(`[getPostBySlug] Error fetching post ${slug} from ${CMS_API_BASE}:`, error instanceof Error ? error.message : error);
    }
    return undefined;
  }
}


