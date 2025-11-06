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

export async function getAllPosts(): Promise<Post[]> {
  try {
    const url = `${CMS_API_BASE}/v1/posts?status=published&limit=100&t=${Date.now()}`;
    
    const controller = new AbortController();
    // Very short timeout for build - fail fast if API is unavailable
    const timeoutId = setTimeout(() => controller.abort(), 2000); // 2 second timeout for build
    
    try {
      const res = await fetch(url, { 
        signal: controller.signal,
        next: { revalidate: 60 }, // Cache for 60 seconds to improve bfcache
        headers: {
          'Accept': 'application/json'
        }
      });
      clearTimeout(timeoutId);
      
      if (!res.ok) {
        return [];
      }
      
      const data = await res.json();
      const items = Array.isArray(data?.items) ? (data.items as unknown[]) : [];
      
      const mapped = items.map(mapCmsPostToSitePost) as Post[];
      const sorted = mapped.sort((a: Post, b: Post) => (a.date < b.date ? 1 : -1));
      return sorted;
    } catch (fetchError) {
      clearTimeout(timeoutId);
      // If fetch fails (network error, timeout, etc.), return empty array instead of throwing
      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        return [];
      }
      // Handle connection errors gracefully
      const isConnectionError = fetchError instanceof Error && (
        fetchError.message.includes('ECONNREFUSED') || 
        fetchError.message.includes('fetch failed') ||
        (fetchError.cause && typeof fetchError.cause === 'object' && (
          ('code' in fetchError.cause && fetchError.cause.code === 'ECONNREFUSED') ||
          ('errors' in fetchError.cause && Array.isArray(fetchError.cause.errors))
        ))
      );
      
      // Always return empty array on any error - allows build to continue
      return [];
    }
  } catch (error) {
    // Always return empty array instead of throwing - app should work even without API
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  try {
    const url = `${CMS_API_BASE}/v1/posts/slug/${slug}?t=${Date.now()}`;
    
    const controller = new AbortController();
    // Very short timeout for build - fail fast if API is unavailable
    const timeoutId = setTimeout(() => controller.abort(), 2000); // 2 second timeout for build
    
    try {
      const res = await fetch(url, { 
        signal: controller.signal,
        next: { revalidate: 60 }, // Cache for 60 seconds to improve bfcache
        headers: {
          'Accept': 'application/json'
        }
      });
      clearTimeout(timeoutId);
      
      if (!res.ok) {
        return undefined;
      }
      const data = await res.json();
      return mapCmsPostToSitePost(data);
    } catch (fetchError) {
      clearTimeout(timeoutId);
      // Handle connection errors gracefully - always return undefined on error
      return undefined;
    }
  } catch (error) {
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
    
    const controller = new AbortController();
    // Very short timeout for build - fail fast if API is unavailable
    const timeoutId = setTimeout(() => controller.abort(), 2000); // 2 second timeout for build
    
    try {
      const res = await fetch(url, {
        signal: controller.signal,
        next: { revalidate: 300 }, // Cache for 5 minutes
        headers: {
          'Accept': 'application/json'
        }
      });
      clearTimeout(timeoutId);
      
      if (!res.ok) {
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
      clearTimeout(timeoutId);
      // Handle connection errors gracefully
      if (fetchError instanceof Error && (
        fetchError.name === 'AbortError' ||
        fetchError.message.includes('ECONNREFUSED') ||
        fetchError.message.includes('fetch failed') ||
        (fetchError.cause && typeof fetchError.cause === 'object' && 'code' in fetchError.cause && fetchError.cause.code === 'ECONNREFUSED')
      )) {
        return [];
      }
      return [];
    }
  } catch (error) {
    return [];
  }
}


