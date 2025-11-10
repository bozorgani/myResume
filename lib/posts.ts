export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO - publish date
  updatedAt?: string; // ISO - last modified date
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
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogTitle?: string;
    ogDescription?: string;
    robots?: string;
    keywords?: string[];
    jsonLd?: any;
  };
};

// Map Persian category names/slugs to English slugs for better URLs
// This mapping should match the one in cms-api/src/server/routes/categories.ts
const categorySlugMap: Record<string, string> = {
  // Main categories
  'توسعه فرانت‌اند': 'frontend',
  'Frontend Development': 'frontend',
  'بک‌اند و سرور': 'backend',
  'Backend & APIs': 'backend',
  'بک‌اند و سرور (Backend & APIs)': 'backend', // Combined format with parentheses
  'سئو و بهینه‌سازی': 'seo',
  'SEO & Performance': 'seo',
  'سئو و بهینه‌سازی (SEO & Performance)': 'seo', // Combined format with parentheses
  'هوش مصنوعی و ابزارهای نوین': 'ai-tools',
  'AI & Tools': 'ai-tools',
  'هوش مصنوعی و ابزارهای نوین (AI & Tools)': 'ai-tools', // Combined format with parentheses
  'توسعه وب مدرن': 'modern-web',
  'Modern Web Development': 'modern-web',
  'توسعه وب مدرن (Modern Web Development)': 'modern-web', // Combined format with parentheses
  'توسعه فرانت‌اند (Frontend Development)': 'frontend', // Combined format with parentheses
  // Common slugs that might be Persian (with hyphens from slugify)
  'بک-اند-و-سرور': 'backend',
  'توسعه-فرانت-اند': 'frontend',
  'سئو-و-بهینه-سازی': 'seo',
  'هوش-مصنوعی-و-ابزارهای-نوین': 'ai-tools',
  'توسعه-وب-مدرن': 'modern-web',
  // Subcategories - Frontend
  'Next.js': 'nextjs',
  'next-js': 'nextjs',
  'React': 'react',
  'TypeScript': 'typescript',
  'Tailwind CSS': 'tailwind',
  'tailwind-css': 'tailwind',
  'UI/UX': 'ui-ux',
  'ui-ux': 'ui-ux',
  // Subcategories - Backend
  'Node.js': 'nodejs',
  'node-js': 'nodejs',
  'Express': 'express',
  'API Design': 'api-design',
  'api-design': 'api-design',
  'Database': 'database',
  // Subcategories - SEO
  'سئو تکنیکال': 'technical-seo',
  'Technical SEO': 'technical-seo',
  'technical-seo': 'technical-seo',
  'Performance Optimization': 'performance',
  'performance-optimization': 'performance',
  'Content SEO': 'content-seo',
  'content-seo': 'content-seo',
  'Google Search Console': 'search-console',
  'google-search-console': 'search-console',
  // Subcategories - AI
  'AI Tools': 'ai-tools',
  'ai-tools': 'ai-tools',
  'GitHub Copilot': 'github-copilot',
  'github-copilot': 'github-copilot',
  'ChatGPT for Developers': 'chatgpt',
  'chatgpt-for-developers': 'chatgpt',
  'Automation': 'automation',
  // Subcategories - Modern Web
  'Trends 2025': 'trends-2025',
  'trends-2025': 'trends-2025',
  'Edge Runtime': 'edge-runtime',
  'edge-runtime': 'edge-runtime',
  'Serverless': 'serverless',
  'Web Frameworks': 'web-frameworks',
  'web-frameworks': 'web-frameworks',
};

// Helper function to convert category slug to English
function convertCategorySlugToEnglish(slug: string): string {
  if (!slug) return '';
  
  // Store original for debugging
  const originalSlug = slug;
  
  // Trim whitespace and normalize (but keep a copy of original)
  slug = slug.trim().replace(/\s+/g, ' ');
  
  // Check if we have a direct mapping (exact match) - try both normalized and original
  if (categorySlugMap[slug]) {
    return categorySlugMap[slug];
  }
  if (categorySlugMap[originalSlug.trim()]) {
    return categorySlugMap[originalSlug.trim()];
  }
  
  // Check if slug is already URL-safe (only ASCII alphanumeric, hyphens, underscores)
  if (/^[a-zA-Z0-9_-]+$/.test(slug)) {
    return slug;
  }
  
  // Try to extract English text from parentheses first (e.g., "بک‌اند و سرور (Backend & APIs)" -> "Backend & APIs")
  const parenthesesMatch = slug.match(/\(([^)]+)\)/);
  if (parenthesesMatch) {
    let englishPart = parenthesesMatch[1].trim();
    
    // Check if we have a mapping for the English part (exact match)
    if (categorySlugMap[englishPart]) {
      return categorySlugMap[englishPart];
    }
    
    // Try with normalized spaces (multiple spaces to single space)
    const normalizedSpaces = englishPart.replace(/\s+/g, ' ').trim();
    if (normalizedSpaces !== englishPart && categorySlugMap[normalizedSpaces]) {
      return categorySlugMap[normalizedSpaces];
    }
    
    // Try trimming again in case there are leading/trailing spaces in parentheses
    englishPart = englishPart.replace(/^\s+|\s+$/g, '');
    if (categorySlugMap[englishPart]) {
      return categorySlugMap[englishPart];
    }
  }
  
  // Try removing parentheses and check the Persian part
  const withoutParentheses = slug.replace(/\s*\([^)]+\)\s*/, '').trim();
  if (withoutParentheses && withoutParentheses !== slug) {
    if (categorySlugMap[withoutParentheses]) {
      return categorySlugMap[withoutParentheses];
    }
    // Try with normalized spaces
    const normalizedPersian = withoutParentheses.replace(/\s+/g, ' ').trim();
    if (normalizedPersian !== withoutParentheses && categorySlugMap[normalizedPersian]) {
      return categorySlugMap[normalizedPersian];
    }
  }
  
  // Try case-insensitive lookup for English parts
  if (parenthesesMatch) {
    const englishPart = parenthesesMatch[1].trim();
    const lowerEnglish = englishPart.toLowerCase();
    // Check all keys case-insensitively
    for (const [key, value] of Object.entries(categorySlugMap)) {
      if (key.toLowerCase() === lowerEnglish || key.toLowerCase() === englishPart.toLowerCase()) {
        return value;
      }
    }
  }
  
  // If slug contains Persian characters, try to find a mapping with URL decoding
  try {
    const decoded = decodeURIComponent(slug);
    if (decoded !== slug && categorySlugMap[decoded]) {
      return categorySlugMap[decoded];
    }
  } catch {
    // Not URL encoded
  }
  
  // Final fallback: return the English part from parentheses if it exists and convert to URL-safe
  if (parenthesesMatch) {
    const englishPart = parenthesesMatch[1].trim();
    
    // Smart detection based on keywords in English part
    const lowerEnglish = englishPart.toLowerCase();
    if (lowerEnglish.includes('backend') && (lowerEnglish.includes('api') || lowerEnglish.includes('apis'))) {
      return 'backend';
    }
    if (lowerEnglish.includes('frontend')) {
      return 'frontend';
    }
    if (lowerEnglish.includes('seo') || lowerEnglish.includes('performance')) {
      return 'seo';
    }
    if (lowerEnglish.includes('ai') && lowerEnglish.includes('tools')) {
      return 'ai-tools';
    }
    if (lowerEnglish.includes('modern') && lowerEnglish.includes('web')) {
      return 'modern-web';
    }
    
    // Convert to URL-safe format: lowercase, replace spaces and special chars with hyphens
    const urlSafe = englishPart
      .toLowerCase()
      .replace(/\s*&\s*/g, '-and-')
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    if (urlSafe) {
      return urlSafe;
    }
  }
  
  // Last resort: log warning with more details for debugging
  if (process.env.NODE_ENV === 'development') {
    const matchingKeys = Object.keys(categorySlugMap).filter(key => 
      key.includes('بک') || key.toLowerCase().includes('backend') || key.includes(slug.slice(0, 10))
    );
    console.warn(`[getPostUrl] Category slug "${slug}" (original: "${originalSlug}") is not in mapping.`, 
      matchingKeys.length > 0 ? `Similar keys: ${matchingKeys.slice(0, 3).join(', ')}` : 'No similar keys found.');
  }
  
  return slug;
}

// Helper function to sanitize slug for URL (ensure it's URL-safe)
function sanitizeSlug(slug: string): string {
  if (!slug) return '';
  // Check if slug is already URL-safe (only ASCII alphanumeric, hyphens, underscores)
  if (/^[a-zA-Z0-9_-]+$/.test(slug)) {
    return slug;
  }
  // If not, it should be English but if it's not, we'll encode it
  try {
    return encodeURIComponent(slug);
  } catch {
    return slug;
  }
}

// Helper function to get post URL with category
export function getPostUrl(post: Post): string {
  const categorySlug = post.categories?.[0]?.slug || post.category?.slug;
  if (categorySlug) {
    // Convert Persian slug to English if needed
    const englishCategorySlug = convertCategorySlugToEnglish(categorySlug);
    const safePostSlug = sanitizeSlug(post.slug);
    return `/blog/${englishCategorySlug}/${safePostSlug}`;
  }
  return `/blog/${sanitizeSlug(post.slug)}`;
}

const CMS_API_BASE = process.env.NEXT_PUBLIC_CMS_API || 'http://localhost:4000';

// Helper function to check if we're in a build environment
function isBuildTime(): boolean {
  return process.env.NEXT_PHASE === 'phase-production-build' || 
         (process.env.NODE_ENV === 'production' && !process.env.VERCEL && !process.env.NETLIFY);
}

// Helper function to check if error is a connection error (handles AggregateError with nested causes)
function isConnectionError(err: any): boolean {
  if (!err) return false;
  
  // Check error message
  if (err.message && (
    err.message.includes('ECONNREFUSED') ||
    err.message.includes('ENOTFOUND') ||
    err.message.includes('fetch failed') ||
    err.message === 'API_UNAVAILABLE_DURING_BUILD'
  )) {
    return true;
  }
  
  // Check error code
  if (err.code === 'ECONNREFUSED' || err.code === 'ENOTFOUND') {
    return true;
  }
  
  // Check cause (for AggregateError in Node.js 18+)
  if (err.cause) {
    return isConnectionError(err.cause);
  }
  
  // Check errors array (for AggregateError)
  if (Array.isArray(err.errors)) {
    return err.errors.some((e: any) => isConnectionError(e));
  }
  
  return false;
}

// Log API base URL for debugging (both dev and production) - but not during build
if (typeof window === 'undefined' && !isBuildTime()) {
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
          // Add loading="lazy" and decoding="async" for better performance
          // Also add width/height attributes if available for CLS prevention
          const width = node.attrs?.width ? ` width="${node.attrs.width}"` : '';
          const height = node.attrs?.height ? ` height="${node.attrs.height}"` : '';
          return src ? `<img src="${src}" alt="${alt || ''}"${width}${height} loading="lazy" decoding="async" />` : '';
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
  
  // Get publish date and updated date
  const publishDate = p.publishAt || p.createdAt || new Date().toISOString();
  const updatedDate = p.updatedAt || p.publishAt || p.createdAt;
  
  return {
    slug: p.slug,
    title: p.title,
    description: p.excerpt || p.seo?.metaDescription || '',
    date: publishDate,
    updatedAt: updatedDate !== publishDate ? updatedDate : undefined,
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
      : undefined,
    seo: p.seo ? {
      metaTitle: p.seo.metaTitle || undefined,
      metaDescription: p.seo.metaDescription || undefined,
      ogTitle: p.seo.ogTitle || undefined,
      ogDescription: p.seo.ogDescription || undefined,
      robots: p.seo.robots || undefined,
      keywords: Array.isArray(p.seo.keywords) ? p.seo.keywords : (p.keywords && Array.isArray(p.keywords) ? p.keywords : undefined),
      jsonLd: p.seo.jsonLd || undefined
    } : undefined
  };
}

async function fetchWithRetry(
  url: string,
  options: RequestInit & { timeout?: number },
  maxRetries = 0 // کاهش retry برای سریع‌تر شدن
): Promise<Response> {
  const buildTime = isBuildTime();
  
  // Shorter timeout during build to fail faster
  const timeout = options.timeout || (buildTime ? 3000 : (process.env.NODE_ENV === 'production' ? 15000 : 8000));
  
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
        return res; // هر نتیجه‌ای که باشد برگردان (حتی خطا) - error handling در caller
      } catch (fetchError) {
        clearTimeout(timeoutId);
        
        // During build time, if it's a connection error, don't retry - fail fast
        if (buildTime && isConnectionError(fetchError) && attempt === 0) {
          // Create a mock error response to be handled gracefully
          throw new Error('API_UNAVAILABLE_DURING_BUILD');
        }
        
        // فقط در آخرین attempt خطا را throw کن
        if (attempt === maxRetries) {
          throw fetchError;
        }
        
        // Wait before retry (short delay, but skip during build)
        if (!buildTime) {
          await new Promise(resolve => setTimeout(resolve, 300));
        }
        continue;
      }
    } catch (error) {
      // If it's our special build-time error, re-throw it
      if (error instanceof Error && error.message === 'API_UNAVAILABLE_DURING_BUILD') {
        throw error;
      }
      
      if (attempt === maxRetries) {
        throw error;
      }
      if (!buildTime) {
        await new Promise(resolve => setTimeout(resolve, 300));
      }
    }
  }
  
  throw new Error('Max retries exceeded');
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    const url = `${CMS_API_BASE}/v1/posts?status=published&limit=100&t=${Date.now()}`;
    const isProduction = process.env.NODE_ENV === 'production';
    const buildTime = isBuildTime();
    
    try {
      const res = await fetchWithRetry(url, {
        timeout: buildTime ? 3000 : (isProduction ? 15000 : 8000),
        next: { 
          revalidate: isProduction ? 180 : 30,
        },
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (!res.ok) {
        // Suppress logs during build time
        if (!buildTime && !isProduction) {
          const errorText = await res.text().catch(() => 'Could not read error response');
          console.error(`[getAllPosts] API returned ${res.status} ${res.statusText} for ${CMS_API_BASE}`);
          console.error(`[getAllPosts] Error response: ${errorText.substring(0, 200)}`);
        }
        return [];
      }
      
      const data = await res.json().catch(() => ({}));
      const items = Array.isArray(data?.items) ? (data.items as unknown[]) : [];
      
      if (items.length === 0 && !buildTime && !isProduction) {
        console.warn(`[getAllPosts] No items in response. Total in response: ${data?.total || 0}`);
      }
      
      const mapped = items.map(mapCmsPostToSitePost) as Post[];
      const sorted = mapped.sort((a: Post, b: Post) => (a.date < b.date ? 1 : -1));
      
      return sorted;
    } catch (fetchError) {
      // Suppress connection error logs during build time
      if (buildTime && isConnectionError(fetchError)) {
        // Silently return empty array during build if API is unavailable
        return [];
      }
      
      // Only log in dev mode (not during build)
      if (!buildTime && !isProduction) {
        const errorMessage = fetchError instanceof Error ? fetchError.message : String(fetchError);
        console.error(`[getAllPosts] Fetch error: ${errorMessage}`);
        console.error(`[getAllPosts] API URL: ${CMS_API_BASE}`);
      }
      
      // در صورت خطا، آرایه خالی برگردان (نه crash)
      return [];
    }
  } catch (error) {
    // Suppress all error logs during build time
    if (!isBuildTime() && process.env.NODE_ENV !== 'production') {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(`[getAllPosts] Unexpected error: ${errorMessage}`);
      console.error(`[getAllPosts] API Base: ${CMS_API_BASE}`);
    }
    
    // در صورت خطا، آرایه خالی برگردان (نه crash)
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  try {
    const url = `${CMS_API_BASE}/v1/posts/slug/${slug}?t=${Date.now()}`;
    const isProduction = process.env.NODE_ENV === 'production';
    const buildTime = isBuildTime();
    
    try {
      const res = await fetchWithRetry(url, {
        timeout: buildTime ? 3000 : (isProduction ? 15000 : 8000),
        next: { 
          revalidate: isProduction ? 180 : 30,
        },
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (!res.ok) {
        // Suppress logs during build time
        if (!buildTime) {
          if (res.status === 404) {
            console.warn(`[getPostBySlug] Post not found: ${slug}`);
          } else {
            console.error(`[getPostBySlug] API returned ${res.status} ${res.statusText} for slug: ${slug}`);
          }
        }
        return undefined;
      }
      
      const data = await res.json();
      return mapCmsPostToSitePost(data);
    } catch (fetchError) {
      // Suppress connection error logs during build time
      if (buildTime && isConnectionError(fetchError)) {
        return undefined;
      }
      
      // Only log in dev mode (not during build)
      if (!buildTime && !isProduction) {
        const errorMessage = fetchError instanceof Error ? fetchError.message : String(fetchError);
        console.error(`[getPostBySlug] Fetch error for slug "${slug}": ${errorMessage}`);
      }
      return undefined;
    }
  } catch (error) {
    // Suppress error logs during build time
    if (!isBuildTime() && process.env.NODE_ENV !== 'production') {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(`[getPostBySlug] Unexpected error for slug "${slug}": ${errorMessage}`);
    }
    return undefined;
  }
}

export type Category = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: {
    _id: string;
    name: string;
    slug: string;
  } | null;
  children?: Category[];
};

export async function getAllCategories(): Promise<Category[]> {
  try {
    const url = `${CMS_API_BASE}/v1/categories?t=${Date.now()}`;
    const isProduction = process.env.NODE_ENV === 'production';
    const buildTime = isBuildTime();
    
    try {
      const res = await fetchWithRetry(url, {
        timeout: buildTime ? 3000 : (isProduction ? 15000 : 8000),
        next: { revalidate: 300 },
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (!res.ok) {
        // Suppress logs during build time
        if (!buildTime && !isProduction) {
          console.error(`[getAllCategories] API returned ${res.status} ${res.statusText}`);
        }
        return [];
      }
      
      const data = await res.json();
      const items = Array.isArray(data?.items) ? data.items : [];
      
      // Map categories with parentId support
      const mappedCategories: Category[] = items.map((cat: any) => ({
        _id: cat._id || '',
        name: cat.name || '',
        slug: cat.slug || '',
        description: cat.description || undefined,
        parentId: cat.parentId ? {
          _id: cat.parentId._id || '',
          name: cat.parentId.name || '',
          slug: cat.parentId.slug || ''
        } : null
      }));
      
      // Build hierarchical structure
      const categoryMap = new Map<string, Category>();
      const rootCategories: Category[] = [];
      
      // First pass: create map and identify root categories
      mappedCategories.forEach(cat => {
        categoryMap.set(cat._id, { ...cat, children: [] });
        if (!cat.parentId) {
          rootCategories.push(categoryMap.get(cat._id)!);
        }
      });
      
      // Second pass: assign children to parents
      mappedCategories.forEach(cat => {
        if (cat.parentId) {
          const parent = categoryMap.get(cat.parentId._id);
          const child = categoryMap.get(cat._id);
          if (parent && child) {
            parent.children = parent.children || [];
            parent.children.push(child);
          }
        }
      });
      
      // Sort children within each parent
      const sortCategories = (cats: Category[]) => {
        cats.sort((a, b) => a.name.localeCompare(b.name, 'fa'));
        cats.forEach(cat => {
          if (cat.children && cat.children.length > 0) {
            sortCategories(cat.children);
          }
        });
      };
      
      sortCategories(rootCategories);
      
      return rootCategories;
    } catch (fetchError) {
      // Suppress connection error logs during build time
      if (buildTime && isConnectionError(fetchError)) {
        return [];
      }
      
      // Only log in dev mode (not during build)
      if (!buildTime && !isProduction) {
        const errorMessage = fetchError instanceof Error ? fetchError.message : String(fetchError);
        console.error(`[getAllCategories] Fetch error: ${errorMessage}`);
      }
      return [];
    }
  } catch (error) {
    // Suppress error logs during build time
    if (!isBuildTime() && process.env.NODE_ENV !== 'production') {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(`[getAllCategories] Unexpected error: ${errorMessage}`);
    }
    return [];
  }
}


