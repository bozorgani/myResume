import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const protocol = request.nextUrl.protocol;
  const url = request.nextUrl.clone();

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

