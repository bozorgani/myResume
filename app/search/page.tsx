import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { SITE, createPageMeta } from '@/lib/seo';

// SEO: Set metadata for search page (though it redirects, this helps with crawlers)
export const metadata: Metadata = createPageMeta({
  title: `جستجو | ${SITE.name}`,
  description: `جستجو در مقالات و محتوای ${SITE.name}`,
  url: `${SITE.domain}/search`,
  robots: 'noindex, follow' // Don't index search pages, just follow redirect
});

// This page handles /search?q=... and redirects to /blog?q=...
// This fixes 404 errors for old search URLs indexed by Google
// Using 301 redirect for SEO (permanent redirect)
export default function SearchPage({
  searchParams,
}: {
  searchParams?: { q?: string };
}) {
  const query = searchParams?.q || '';
  const params = new URLSearchParams();
  if (query) {
    params.set('q', query);
  }
  const redirectUrl = params.toString() ? `/blog?${params.toString()}` : '/blog';
  redirect(redirectUrl);
}

