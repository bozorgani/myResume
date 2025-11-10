import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE.domain.replace(/\/$/, '');
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/static/chunks/',
          '/_next/static/css/',
          '/_next/static/pages/',
          '/_next/static/runtime/',
          '/_next/static/buildManifest.js',
          '/_next/static/ssgManifest.js',
          '/admin/'
        ]
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/static/chunks/',
          '/_next/static/css/',
          '/_next/static/pages/',
          '/_next/static/runtime/',
          '/_next/static/buildManifest.js',
          '/_next/static/ssgManifest.js',
          '/admin/'
        ]
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/static/chunks/',
          '/_next/static/css/',
          '/_next/static/pages/',
          '/_next/static/runtime/',
          '/_next/static/buildManifest.js',
          '/_next/static/ssgManifest.js',
          '/admin/'
        ]
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    // Allow access to media and font files
    host: baseUrl
  };
}

