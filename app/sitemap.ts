import type { MetadataRoute } from 'next';
import { getAllProjects } from '@/lib/projects';
import { getAllPosts } from '@/lib/posts';
import { SITE } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
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

  const postUrls: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${base}/blog/${post.slug}`,
    changeFrequency: 'monthly',
    priority: 0.7,
    lastModified: new Date(post.date)
  }));

  return [...staticUrls, ...projectUrls, ...postUrls];
}


