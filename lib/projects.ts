export type Project = {
  slug: string;
  title: string;
  oneLiner: string;
  description: string;
  tech: string[];
  image: string; // path under /public
  liveUrl?: string;
  repoUrl?: string;
};

export const projects: Project[] = [
  {
    slug: 'e-commerce-platform',
    title: 'پلتفرم تجارت الکترونیک با Next.js و Node.js',
    oneLiner: 'سیستم مدیریت فروشگاه آنلاین مقیاس‌پذیر با قابلیت‌های پیشرفته سئو و بهینه‌سازی عملکرد.',
    description:
      'طراحی و توسعه یک پلتفرم تجارت الکترونیک کامل با Next.js 14 و App Router. پیاده‌سازی سیستم مدیریت محتوا (CMS) سفارشی، پردازش پرداخت‌های آنلاین، مدیریت موجودی و سفارشات، و داشبورد مدیریتی پیشرفته. بهینه‌سازی برای موتورهای جستجو با استفاده از SSR و SSG، بهبود Core Web Vitals (LCP < 2.5s، CLS < 0.1)، و پیاده‌سازی Schema.org markup. استفاده از MongoDB برای ذخیره‌سازی داده‌ها، Redis برای کش، و Docker برای استقرار. بهبود ۴۰٪ در سرعت بارگذاری و افزایش ۶۰٪ در نرخ تبدیل.',
    tech: ['Next.js 14', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Redis', 'TailwindCSS', 'Docker'],
    image: '/images/project-1-placeholder.svg',
    liveUrl: 'https://www.bozorgani.ir/projects/e-commerce-platform',
    repoUrl: 'https://github.com/bozorgani/e-commerce-platform'
  },
  {
    slug: 'cms-blog',
    title: 'سیستم مدیریت محتوا و بلاگ با سئو پیشرفته',
    oneLiner: 'پلتفرم بلاگینگ با CMS سفارشی و بهینه‌سازی کامل برای موتورهای جستجو.',
    description:
      'توسعه یک سیستم مدیریت محتوا (CMS) کامل با قابلیت‌های پیشرفته سئو. ویژگی‌های کلیدی شامل ویرایشگر Rich Text، مدیریت دسته‌بندی و تگ‌ها، بهینه‌سازی خودکار تصاویر، تولید خودکار sitemap.xml و robots.txt، و پشتیبانی از RSS feed. پیاده‌سازی Meta Tags پویا، Open Graph و Twitter Cards، Schema.org markup برای مقالات، و بهینه‌سازی برای جستجوی صوتی. استفاده از ISR (Incremental Static Regeneration) برای به‌روزرسانی محتوا بدون rebuild کامل. بهبود ۵۰٪ در رتبه‌بندی موتورهای جستجو و افزایش ۳۵٪ در ترافیک ارگانیک.',
    tech: ['Next.js', 'React', 'TypeScript', 'Node.js', 'MongoDB', 'TailwindCSS', 'Markdown'],
    image: '/images/project-2-placeholder.svg',
    liveUrl: 'https://www.bozorgani.ir/projects/cms-blog',
    repoUrl: 'https://github.com/bozorgani/cms-blog-platform'
  },
  {
    slug: 'performance-dashboard',
    title: 'داشبورد مانیتورینگ عملکرد و Web Vitals',
    oneLiner: 'ابزار تحلیل و مانیتورینگ عملکرد وب‌سایت‌ها با تمرکز بر Core Web Vitals.',
    description:
      'ساخت یک داشبورد جامع برای مانیتورینگ عملکرد وب‌سایت‌ها و تحلیل Core Web Vitals. جمع‌آوری داده‌های Real User Monitoring (RUM)، نمایش متریک‌های LCP، FID، CLS، TTFB و INP، و ارائه گزارش‌های تحلیلی. پیاده‌سازی هشدارهای خودکار برای مشکلات عملکرد، پیشنهادات بهینه‌سازی، و مقایسه عملکرد در طول زمان. استفاده از Google Analytics 4 API، Web Vitals API، و Lighthouse CI. بهبود میانگین LCP از ۴.۲s به ۱.۸s و کاهش CLS از ۰.۲۵ به ۰.۰۵ در پروژه‌های مشتریان.',
    tech: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Chart.js', 'Web Vitals API'],
    image: '/images/project-1-placeholder.svg',
    liveUrl: 'https://www.bozorgani.ir/projects/performance-dashboard',
    repoUrl: 'https://github.com/bozorgani/performance-dashboard'
  }
];

export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}


