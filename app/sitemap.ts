import type { MetadataRoute } from 'next';
import { getAllProjects } from '@/lib/projects';
import { getAllPosts, getPostUrl } from '@/lib/posts';
import { SITE } from '@/lib/seo';

// استفاده از ISR برای performance بهتر
// sitemap هر 1 ساعت (3600 ثانیه) regenerate می‌شود
// این بهتر از force-dynamic است چون در هر request cache می‌شود
export const revalidate = 3600; // 1 hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const base = SITE.domain.replace(/\/$/, '');
    const now = new Date();

    const staticUrls: MetadataRoute.Sitemap = [
      { url: `${base}/`, changeFrequency: 'weekly', priority: 1.0, lastModified: now },
      { url: `${base}/blog`, changeFrequency: 'daily', priority: 0.9, lastModified: now },
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

    const posts = await getAllPosts();
    const postUrls: MetadataRoute.Sitemap = posts.map((post) => {
      // Use updatedAt if available, otherwise use publish date
      const lastModified = post.updatedAt 
        ? new Date(post.updatedAt) 
        : new Date(post.date);
      
      return {
        url: `${base}${getPostUrl(post)}`,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
        lastModified: lastModified
      };
    });

    return [...staticUrls, ...projectUrls, ...postUrls];
  } catch (error) {
    console.error('[Sitemap] Error generating sitemap:', error);
    // Return static sitemap if API is unavailable during build
    const base = SITE.domain.replace(/\/$/, '');
    const now = new Date();
    
    const staticUrls: MetadataRoute.Sitemap = [
      { url: `${base}/`, changeFrequency: 'weekly', priority: 1.0, lastModified: now },
      { url: `${base}/blog`, changeFrequency: 'daily', priority: 0.9, lastModified: now },
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

    return [...staticUrls, ...projectUrls];
  }
}


