export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO
  image?: string;
  content: string; // simple HTML/MDX could be used later
};

export const posts: Post[] = [
  {
    slug: 'optimize-core-web-vitals-nextjs',
    title: 'Optimizing Core Web Vitals in Next.js',
    description: 'Practical techniques to improve LCP, CLS, and INP in production Next.js apps.',
    date: '2025-01-15',
    image: '/images/project-2-placeholder.svg',
    content:
      'Focus on image optimization, critical CSS, and hydration strategies. Use next/image, preload fonts, and split third-party scripts.'
  },
  {
    slug: 'technical-seo-for-developers',
    title: 'Technical SEO for Developers',
    description: 'A developer-first guide to metadata, sitemaps, structured data, and canonical URLs.',
    date: '2025-02-10',
    image: '/images/project-1-placeholder.svg',
    content:
      'Leverage structured data with JSON-LD, generate sitemaps post-build, and ensure clean canonical URLs on every page.'
  }
];

export function getAllPosts(): Post[] {
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}


