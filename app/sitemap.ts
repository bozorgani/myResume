import type { MetadataRoute } from 'next';
import { getAllProjects } from '@/lib/projects';
import { getAllPosts, getPostUrl, getAllCategories } from '@/lib/posts';
import { SITE } from '@/lib/seo';

// استفاده از ISR برای performance بهتر
// sitemap هر 1 ساعت (3600 ثانیه) regenerate می‌شود
// این بهتر از force-dynamic است چون در هر request cache می‌شود
export const revalidate = 3600; // 1 hour

// Helper function to flatten categories for sitemap
function flattenCategories(cats: Awaited<ReturnType<typeof getAllCategories>>): Array<{ slug: string; name: string }> {
  const result: Array<{ slug: string; name: string }> = [];
  cats.forEach(cat => {
    result.push({ slug: cat.slug, name: cat.name });
    if (cat.children && cat.children.length > 0) {
      result.push(...flattenCategories(cat.children));
    }
  });
  return result;
}

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

    // SEO Fix: Add category pages to sitemap for better indexing
    const categories = await getAllCategories();
    const allCategoriesFlat = flattenCategories(categories);
    const categoryUrls: MetadataRoute.Sitemap = allCategoriesFlat.map((cat) => ({
      url: `${base}/blog?category=${cat.slug}`,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
      lastModified: now
    }));

    // SEO Fix: Add tag pages to sitemap for better indexing
    // Extract unique tags from posts
    const allTags = new Map<string, string>(); // slug -> name
    posts.forEach(post => {
      post.tags?.forEach(tag => {
        if (!allTags.has(tag.slug)) {
          allTags.set(tag.slug, tag.name);
        }
      });
    });
    const tagUrls: MetadataRoute.Sitemap = Array.from(allTags.entries()).map(([slug, name]) => ({
      url: `${base}/blog?tag=${slug}`,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
      lastModified: now
    }));

    return [...staticUrls, ...projectUrls, ...postUrls, ...categoryUrls, ...tagUrls];
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


