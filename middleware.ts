import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const url = request.nextUrl.clone();

  // Redirect non-www to www with HTTPS (301 Permanent Redirect)
  // This handles both http and https non-www requests
  if (hostname === 'bozorgani.ir' || hostname === 'bozorgani.ir:3000') {
    url.hostname = 'www.bozorgani.ir';
    url.protocol = 'https:';
    return NextResponse.redirect(url, 301);
  }

  // Redirect http to https for www (301 Permanent Redirect)
  if (hostname === 'www.bozorgani.ir' && request.nextUrl.protocol === 'http:') {
    url.protocol = 'https:';
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

// فقط برای درخواست‌های HTTP اعمال می‌شود (نه برای static files)
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)',
  ],
};

