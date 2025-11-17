import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const protocol = request.nextUrl.protocol;
  const url = request.nextUrl.clone();
  const pathname = request.nextUrl.pathname;

  // Handle http://bozorgani.ir → https://www.bozorgani.ir (301)
  // This must be done in middleware to override Vercel's automatic 308 redirect
  if (hostname === 'bozorgani.ir' || hostname === 'bozorgani.ir:3000') {
    url.hostname = 'www.bozorgani.ir';
    url.protocol = 'https:';
    return NextResponse.redirect(url, 301);
  }

  // Handle https://bozorgani.ir → https://www.bozorgani.ir (301)
  if (hostname === 'bozorgani.ir' && protocol === 'https:') {
    url.hostname = 'www.bozorgani.ir';
    return NextResponse.redirect(url, 301);
  }

  // Handle http://www.bozorgani.ir → https://www.bozorgani.ir (301)
  if (hostname === 'www.bozorgani.ir' && protocol === 'http:') {
    url.protocol = 'https:';
    return NextResponse.redirect(url, 301);
  }

  // SEO Fix: Redirect old project URL /projects/e-commerce → /projects/e-commerce-platform (301)
  if (pathname === '/projects/e-commerce') {
    url.pathname = '/projects/e-commerce-platform';
    return NextResponse.redirect(url, 301);
  }

  // SEO Fix: Handle /blog/node-js - redirect to category page if it's a category slug
  // node-js maps to nodejs category slug according to categorySlugMap
  if (pathname === '/blog/node-js') {
    url.pathname = '/blog';
    url.searchParams.set('category', 'nodejs');
    return NextResponse.redirect(url, 301);
  }

  // SEO Fix: Handle /search?q=... - redirect to /blog?q=... (301)
  if (pathname === '/search') {
    const searchQuery = request.nextUrl.searchParams.get('q');
    url.pathname = '/blog';
    if (searchQuery) {
      url.searchParams.set('q', searchQuery);
    }
    // Remove other params if any
    url.search = url.searchParams.toString();
    return NextResponse.redirect(url, 301);
  }

  // SEO Fix: Block/redirect placeholder search queries like ?q={search_term_string}
  // These are test URLs from Google and should not be indexed
  if (pathname === '/blog') {
    const searchQuery = request.nextUrl.searchParams.get('q');
    if (searchQuery && (searchQuery.includes('{') || searchQuery.includes('}'))) {
      // Redirect placeholder queries to main blog page (301)
      // This prevents Google from trying to index test URLs
      url.pathname = '/blog';
      url.search = ''; // Remove query params
      return NextResponse.redirect(url, 301);
    }
    
    // SEO Fix: Normalize query parameter order for canonical URL consistency
    // This ensures canonical URL matches the actual URL exactly
    // Order: category, page, q, tag (alphabetical order)
    const category = request.nextUrl.searchParams.get('category');
    const tag = request.nextUrl.searchParams.get('tag');
    const q = request.nextUrl.searchParams.get('q');
    const page = request.nextUrl.searchParams.get('page');
    
    // Build normalized query string with consistent parameter order
    const normalizedParams = new URLSearchParams();
    if (category) normalizedParams.set('category', category);
    if (page && parseInt(page, 10) > 1) normalizedParams.set('page', page);
    if (q && q.trim() && !(q.includes('{') && q.includes('}'))) {
      normalizedParams.set('q', q.trim());
    }
    if (tag) normalizedParams.set('tag', tag);
    
    const normalizedQuery = normalizedParams.toString();
    const currentQuery = request.nextUrl.search.substring(1); // Remove leading '?'
    
    // SEO Fix: Compare normalized query strings to ensure canonical URL consistency
    // URLSearchParams.toString() automatically sorts parameters alphabetically
    // We need to compare the normalized versions to handle encoding differences
    const normalizeQueryString = (query: string): string => {
      if (!query) return '';
      try {
        const params = new URLSearchParams(query);
        return params.toString();
      } catch {
        return query;
      }
    };
    
    const normalizedCurrent = normalizeQueryString(currentQuery);
    
    // If query parameters are not in normalized order, redirect to normalized URL
    // This ensures canonical URL matches the actual URL exactly
    if (normalizedQuery !== normalizedCurrent && currentQuery.length > 0) {
      url.pathname = '/blog';
      url.search = normalizedQuery ? `?${normalizedQuery}` : '';
      return NextResponse.redirect(url, 301);
    }
  }

  return NextResponse.next();
}

// Apply to all requests to catch redirects before Vercel's automatic redirects
// This ensures 301 redirects instead of Vercel's default 308
export const config = {
  matcher: [
    /*
     * Match all request paths to handle domain redirects
     * This is necessary to override Vercel's automatic 308 redirects
     */
    '/(.*)',
  ],
};

