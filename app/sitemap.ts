import type { MetadataRoute } from 'next';
import { getAllProjects } from '@/lib/projects';
import { getAllPosts } from '@/lib/posts';
import { SITE } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const base = SITE.domain.replace(/\/$/, '');

    const staticUrls: MetadataRoute.Sitemap = [
      { url: `${base}/`, changeFrequency: 'monthly', priority: 0.7 },
      { url: `${base}/projects`, changeFrequency: 'monthly', priority: 0.7 },
      { url: `${base}/resume`, changeFrequency: 'monthly', priority: 0.7 },
      { url: `${base}/contact`, changeFrequency: 'monthly', priority: 0.7 },
      { url: `${base}/blog`, changeFrequency: 'monthly', priority: 0.7 }
    ];

    const projectUrls: MetadataRoute.Sitemap = getAllProjects().map((p) => ({
      url: `${base}/projects/${p.slug}`,
      changeFrequency: 'monthly',
      priority: 0.7
    }));

    const posts = await getAllPosts();
    const postUrls: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${base}/blog/${post.slug}`,
      changeFrequency: 'monthly',
      priority: 0.7,
      lastModified: new Date(post.date)
    }));

    return [...staticUrls, ...projectUrls, ...postUrls];
  } catch (error) {
    // Return static sitemap if API is unavailable during build
    const base = SITE.domain.replace(/\/$/, '');
    const staticUrls: MetadataRoute.Sitemap = [
      { url: `${base}/`, changeFrequency: 'monthly', priority: 0.7 },
      { url: `${base}/projects`, changeFrequency: 'monthly', priority: 0.7 },
      { url: `${base}/resume`, changeFrequency: 'monthly', priority: 0.7 },
      { url: `${base}/contact`, changeFrequency: 'monthly', priority: 0.7 },
      { url: `${base}/blog`, changeFrequency: 'monthly', priority: 0.7 }
    ];

    const projectUrls: MetadataRoute.Sitemap = getAllProjects().map((p) => ({
      url: `${base}/projects/${p.slug}`,
      changeFrequency: 'monthly',
      priority: 0.7
    }));

    return [...staticUrls, ...projectUrls];
  }
}


