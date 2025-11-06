import type { MetadataRoute } from 'next';
import { getAllProjects } from '@/lib/projects';
import { getAllPosts } from '@/lib/posts';
import { SITE } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const base = SITE.domain.replace(/\/$/, '');

    const staticUrls: MetadataRoute.Sitemap = [
      { url: `${base}/`, changeFrequency: 'weekly', priority: 1.0, lastModified: new Date() },
      { url: `${base}/blog`, changeFrequency: 'daily', priority: 0.9, lastModified: new Date() },
      { url: `${base}/projects`, changeFrequency: 'monthly', priority: 0.8, lastModified: new Date() },
      { url: `${base}/resume`, changeFrequency: 'monthly', priority: 0.8, lastModified: new Date() },
      { url: `${base}/contact`, changeFrequency: 'yearly', priority: 0.6, lastModified: new Date() }
    ];

    const projectUrls: MetadataRoute.Sitemap = getAllProjects().map((p) => ({
      url: `${base}/projects/${p.slug}`,
      changeFrequency: 'monthly',
      priority: 0.7,
      lastModified: new Date()
    }));

    const posts = await getAllPosts();
    const postUrls: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${base}/blog/${post.slug}`,
      changeFrequency: 'monthly',
      priority: 0.8,
      lastModified: new Date(post.date)
    }));

    return [...staticUrls, ...projectUrls, ...postUrls];
  } catch (error) {
    // Return static sitemap if API is unavailable during build
    const base = SITE.domain.replace(/\/$/, '');
    const staticUrls: MetadataRoute.Sitemap = [
      { url: `${base}/`, changeFrequency: 'weekly', priority: 1.0, lastModified: new Date() },
      { url: `${base}/blog`, changeFrequency: 'daily', priority: 0.9, lastModified: new Date() },
      { url: `${base}/projects`, changeFrequency: 'monthly', priority: 0.8, lastModified: new Date() },
      { url: `${base}/resume`, changeFrequency: 'monthly', priority: 0.8, lastModified: new Date() },
      { url: `${base}/contact`, changeFrequency: 'yearly', priority: 0.6, lastModified: new Date() }
    ];

    const projectUrls: MetadataRoute.Sitemap = getAllProjects().map((p) => ({
      url: `${base}/projects/${p.slug}`,
      changeFrequency: 'monthly',
      priority: 0.7,
      lastModified: new Date()
    }));

    return [...staticUrls, ...projectUrls];
  }
}


