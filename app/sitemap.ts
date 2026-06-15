import type { MetadataRoute } from 'next';
import { getAllProjects } from '@/lib/projects';
import { SITE } from '@/lib/seo';

// استفاده از ISR برای performance بهتر
export const revalidate = 3600; // 1 hour

const CMS_API_BASE = process.env.NEXT_PUBLIC_CMS_API || 'http://localhost:4000';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE.domain.replace(/\/$/, '');
  const now = new Date();

  // 1. Static and Project URLs
  const staticUrls: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: 'weekly', priority: 1.0, lastModified: now },
    { url: `${base}/about-mohammad-amin-bozorgani`, changeFrequency: 'monthly', priority: 0.9, lastModified: now },
    { url: `${base}/projects`, changeFrequency: 'monthly', priority: 0.8, lastModified: now },
    { url: `${base}/resume`, changeFrequency: 'monthly', priority: 0.8, lastModified: now },
    { url: `${base}/contact`, changeFrequency: 'yearly', priority: 0.6, lastModified: now }
  ];

  const projectUrls: MetadataRoute.Sitemap = getAllProjects().map((p) => ({
    url: `${base}/projects/${p.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
    lastModified: now
  }));

  let dynamicUrls: MetadataRoute.Sitemap = [];

  // 2. Fetch dynamic sitemap from CMS API
  try {
    const sitemapRes = await fetch(`${CMS_API_BASE}/v1/seo/sitemap?format=json`, {
      next: { revalidate: 3600 }
    });

    if (sitemapRes.ok) {
      const data = await sitemapRes.json();
      if (data && data.ok && Array.isArray(data.items)) {
        dynamicUrls = data.items.map((item: any) => ({
          url: item.loc,
          lastModified: new Date(item.lastmod || now),
          changeFrequency: item.changefreq || 'weekly',
          priority: item.priority || 0.8
        }));
      }
    }
  } catch (error) {
    console.error('[Sitemap] Error fetching dynamic sitemap from CMS:', error);
  }

  // If API didn't return blog index, add it manually
  const hasBlogIndex = dynamicUrls.some(u => u.url === `${base}/blog`);
  if (!hasBlogIndex) {
    staticUrls.push({ url: `${base}/blog`, changeFrequency: 'daily', priority: 0.9, lastModified: now });
  }

  return [...staticUrls, ...projectUrls, ...dynamicUrls];
}


