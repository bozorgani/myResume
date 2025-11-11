import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE.domain.replace(/\/$/, '');
  
  // Common disallow patterns for all crawlers
  const commonDisallow = [
    '/api/',
    '/_next/',
    '/admin/',
    '/cms/',
    '*.json$',
    '/404',
    '/500'
  ];
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: commonDisallow
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: commonDisallow
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
        disallow: commonDisallow
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: commonDisallow
      },
      {
        userAgent: 'Slurp',
        allow: '/',
        disallow: commonDisallow
      },
      {
        userAgent: 'DuckDuckBot',
        allow: '/',
        disallow: commonDisallow
      },
      {
        userAgent: 'Baiduspider',
        allow: '/',
        disallow: commonDisallow
      },
      {
        userAgent: 'Yandex',
        allow: '/',
        disallow: commonDisallow
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl
  };
}

