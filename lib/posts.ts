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
  categories?: Array<{
    name: string;
    slug: string;
  }>;
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
        // Process marks in order - link should be processed first to wrap other marks
        const sortedMarks = [...marks].sort((a, b) => {
          // Link marks should be processed last (outermost)
          if (a.type === 'link') return 1;
          if (b.type === 'link') return -1;
          return 0;
        });
        
        for (const mark of sortedMarks) {
          const type = mark.type;
          if (type === 'bold' || type === 'strong') result = `<strong>${result}`;
          else if (type === 'italic' || type === 'em') result = `<em>${result}`;
          else if (type === 'code') result = `<code>${result}`;
          else if (type === 'link') {
            const href = mark.attrs?.href || mark.attrs?.url || '#';
            const target = mark.attrs?.target || '_self';
            const rel = target === '_blank' ? 'noopener noreferrer' : '';
            // Escape href attribute value to prevent XSS (only quotes and ampersands)
            const escapedHref = String(href)
              .replace(/&/g, '&amp;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#39;');
            const targetAttr = target && target !== '_self' ? ` target="${target}"` : '';
            const relAttr = rel ? ` rel="${rel}"` : '';
            result = `<a href="${escapedHref}"${targetAttr}${relAttr}>${result}`;
          }
        }
        return result;
      };
      const closeMarks = (s: string) => {
        let result = s;
        // Close marks in reverse order - link should be closed first (innermost)
        const sortedMarks = [...marks].sort((a, b) => {
          // Link marks should be closed first
          if (a.type === 'link') return -1;
          if (b.type === 'link') return 1;
          return 0;
        });
        
        for (let i = sortedMarks.length - 1; i >= 0; i--) {
          const mark = sortedMarks[i];
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
  
  // Handle multiple categories (categoryIds) - preserve order
  let categories: Array<{ name: string; slug: string }> | undefined;
  if (Array.isArray(p.categoryIds) && p.categoryIds.length > 0) {
    const filtered = p.categoryIds.filter((cat: any) => cat && cat.name && cat.slug);
    if (filtered.length > 0) {
      categories = filtered.map((cat: any) => ({
        name: cat.name || '',
        slug: cat.slug || ''
      }));
    }
  }
  
  // Handle single category (categoryId) - for backward compatibility
  const singleCategory = p.categoryId ? {
    name: p.categoryId.name || '',
    slug: p.categoryId.slug || ''
  } : undefined;
  
  // Use categories if available, otherwise use single category
  const finalCategories = categories && categories.length > 0 ? categories : undefined;
  const finalCategory = finalCategories ? finalCategories[0] : singleCategory;
  
  return {
    slug: p.slug,
    title: p.title,
    description: p.excerpt || p.seo?.metaDescription || '',
    date: p.publishAt || p.updatedAt || p.createdAt || new Date().toISOString(),
    image: buildMediaUrl(imagePath),
    content: renderContentToHtml(p.content),
    readingTime: p.readingTime || undefined,
    canonicalUrl: p.canonicalUrl || undefined,
    category: finalCategory,
    categories: finalCategories,
    tags: Array.isArray(p.tags) && p.tags.length > 0
      ? p.tags.map((tag: any) => ({
          name: tag.name || '',
          slug: tag.slug || ''
        }))
      : undefined
  };
}

async function fetchWithRetry(
  url: string,
  options: RequestInit & { timeout?: number },
  maxRetries = 2
): Promise<Response> {
  const timeout = options.timeout || (process.env.NODE_ENV === 'production' ? 15000 : 5000);
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      
      try {
        const res = await fetch(url, {
          ...options,
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
        return res;
      } catch (fetchError) {
        clearTimeout(timeoutId);
        if (attempt === maxRetries) {
          throw fetchError;
        }
        // Wait before retry (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
        continue;
      }
    } catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
    }
  }
  
  throw new Error('Max retries exceeded');
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    const url = `${CMS_API_BASE}/v1/posts?status=published&limit=100&t=${Date.now()}`;
    const isProduction = process.env.NODE_ENV === 'production';
    
    try {
      const res = await fetchWithRetry(url, {
        timeout: isProduction ? 15000 : 5000,
        next: { 
          revalidate: isProduction ? 60 : 30, // Cache for 60 seconds in production, 30 in dev
        },
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (!res.ok) {
        const errorText = await res.text().catch(() => 'Could not read error response');
        console.error(`[getAllPosts] API returned ${res.status} ${res.statusText} for ${CMS_API_BASE}`);
        if (isProduction) {
          console.error(`[getAllPosts] Error response (first 200 chars): ${errorText.substring(0, 200)}`);
        } else {
          console.error(`[getAllPosts] Error response: ${errorText}`);
        }
        return [];
      }
      
      const data = await res.json();
      const items = Array.isArray(data?.items) ? (data.items as unknown[]) : [];
      
      if (items.length === 0 && !isProduction) {
        console.warn(`[getAllPosts] No items in response. Total in response: ${data?.total || 0}`);
      }
      
      const mapped = items.map(mapCmsPostToSitePost) as Post[];
      const sorted = mapped.sort((a: Post, b: Post) => (a.date < b.date ? 1 : -1));
      
      return sorted;
    } catch (fetchError) {
      const errorMessage = fetchError instanceof Error ? fetchError.message : String(fetchError);
      console.error(`[getAllPosts] Fetch error after retries: ${errorMessage}`);
      console.error(`[getAllPosts] API URL: ${CMS_API_BASE}`);
      
      // In production, log more details for debugging
      if (process.env.NODE_ENV === 'production') {
        console.error(`[getAllPosts] This might be a network issue or API is down`);
      }
      
      return [];
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`[getAllPosts] Unexpected error: ${errorMessage}`);
    console.error(`[getAllPosts] API Base: ${CMS_API_BASE}`);
    console.error(`[getAllPosts] Make sure NEXT_PUBLIC_CMS_API is set correctly`);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  try {
    const url = `${CMS_API_BASE}/v1/posts/slug/${slug}?t=${Date.now()}`;
    const isProduction = process.env.NODE_ENV === 'production';
    
    try {
      const res = await fetchWithRetry(url, {
        timeout: isProduction ? 15000 : 5000,
        next: { 
          revalidate: isProduction ? 60 : 30, // Cache for 60 seconds in production, 30 in dev
        },
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (!res.ok) {
        if (res.status === 404) {
          console.warn(`[getPostBySlug] Post not found: ${slug}`);
        } else {
          console.error(`[getPostBySlug] API returned ${res.status} ${res.statusText} for slug: ${slug}`);
        }
        return undefined;
      }
      
      const data = await res.json();
      return mapCmsPostToSitePost(data);
    } catch (fetchError) {
      const errorMessage = fetchError instanceof Error ? fetchError.message : String(fetchError);
      console.error(`[getPostBySlug] Fetch error for slug "${slug}": ${errorMessage}`);
      return undefined;
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`[getPostBySlug] Unexpected error for slug "${slug}": ${errorMessage}`);
    return undefined;
  }
}

export type Category = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
};

export async function getAllCategories(): Promise<Category[]> {
  try {
    const url = `${CMS_API_BASE}/v1/categories?t=${Date.now()}`;
    const isProduction = process.env.NODE_ENV === 'production';
    
    try {
      const res = await fetchWithRetry(url, {
        timeout: isProduction ? 15000 : 5000,
        next: { revalidate: 300 }, // Cache for 5 minutes (categories don't change often)
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (!res.ok) {
        console.error(`[getAllCategories] API returned ${res.status} ${res.statusText}`);
        return [];
      }
      
      const data = await res.json();
      const items = Array.isArray(data?.items) ? data.items : [];
      return items.map((cat: any) => ({
        _id: cat._id || '',
        name: cat.name || '',
        slug: cat.slug || '',
        description: cat.description || undefined
      }));
    } catch (fetchError) {
      const errorMessage = fetchError instanceof Error ? fetchError.message : String(fetchError);
      console.error(`[getAllCategories] Fetch error: ${errorMessage}`);
      return [];
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`[getAllCategories] Unexpected error: ${errorMessage}`);
    return [];
  }
}


