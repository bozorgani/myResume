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
    title: 'بهینه‌سازی Core Web Vitals در Next.js',
    description: 'تکنیک‌های عملی برای بهبود LCP، CLS و INP در اپ‌های Next.js تولیدی.',
    date: '2025-01-15',
    image: '/images/project-2-placeholder.svg',
    content:
      'روی بهینه‌سازی تصاویر، CSS بحرانی و راهبردهای هیدریشن تمرکز کنید. از next/image استفاده کنید، فونت‌ها را preload کنید و اسکریپت‌های ثالث را تقسیم کنید.'
  },
  {
    slug: 'technical-seo-for-developers',
    title: 'سئوی فنی برای توسعه‌دهندگان',
    description: 'راهنمایی عملی برای متادیتا، سایت‌مپ، داده ساختاریافته و URLهای canonical.',
    date: '2025-02-10',
    image: '/images/project-1-placeholder.svg',
    content:
      'از داده ساختاریافته با JSON-LD بهره بگیرید، پس از بیلد، سایت‌مپ بسازید و برای هر صفحه URL canonical تمیز داشته باشید.'
  }
];

export function getAllPosts(): Post[] {
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}


