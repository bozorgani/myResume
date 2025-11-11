import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE.domain.replace(/\/$/, '');
  
  // IMPORTANT: Allow access to static assets (fonts, images) but don't index them
  // Disallow patterns that should not be crawled or indexed
  const commonDisallow = [
    '/api/',
    '/admin/',
    '/cms/',
    '*.json$',
    '/404',
    '/500',
    // Block _next/ except for static media files (fonts, images)
    // We need to allow /_next/static/media/ for fonts and images to load
    '/_next/static/chunks/',
    '/_next/static/css/',
    '/_next/static/development/',
    '/_next/static/webpack/',
    '/_next/server/',
    '/_next/data/'
  ];
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/', // Allow all pages
          '/_next/static/media/', // Allow fonts and images to be accessed (but not indexed)
        ],
        disallow: commonDisallow
      },
      {
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/_next/static/media/', // Allow fonts and images for proper rendering
        ],
        disallow: commonDisallow
      },
      {
        userAgent: 'Googlebot-Image',
        allow: [
          '/',
          '/_next/static/media/', // Allow images for image indexing
        ],
        disallow: [
          '/api/',
          '/admin/',
          '/cms/',
          '*.json$',
          '/404',
          '/500',
          '/_next/static/chunks/',
          '/_next/static/css/',
          '/_next/static/development/',
          '/_next/static/webpack/',
          '/_next/server/',
          '/_next/data/'
        ]
      },
      {
        userAgent: 'Bingbot',
        allow: [
          '/',
          '/_next/static/media/',
        ],
        disallow: commonDisallow
      },
      {
        userAgent: 'Slurp',
        allow: [
          '/',
          '/_next/static/media/',
        ],
        disallow: commonDisallow
      },
      {
        userAgent: 'DuckDuckBot',
        allow: [
          '/',
          '/_next/static/media/',
        ],
        disallow: commonDisallow
      },
      {
        userAgent: 'Baiduspider',
        allow: [
          '/',
          '/_next/static/media/',
        ],
        disallow: commonDisallow
      },
      {
        userAgent: 'Yandex',
        allow: [
          '/',
          '/_next/static/media/',
        ],
        disallow: commonDisallow
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl
  };
}

