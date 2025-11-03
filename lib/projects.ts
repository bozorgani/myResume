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
    slug: 'full-stack-developer',
    title: 'مطالعهٔ موردی توسعه‌دهنده فول‌استک',
    oneLiner: 'یک اپلیکیشن وب مقیاس‌پذیر با Next.js، Node.js و MongoDB.',
    description:
      'طراحی و پیاده‌سازی یک پلتفرم وب مقیاس‌پذیر با تمرکز بر عملکرد، دسترس‌پذیری و سئو. به‌کارگیری راهبردهای SSR/SSG، طراحی API و استقرار CI/CD.',
    tech: ['Next.js', 'TypeScript', 'Node.js', 'MongoDB', 'TailwindCSS'],
    image: '/images/project-1-placeholder.svg',
    liveUrl: 'https://bozorgani.ir/demo/full-stack',
    repoUrl: 'https://github.com/bozorgani/full-stack-demo'
  },
  {
    slug: 'perf-optimization-toolkit',
    title: 'جعبه‌ابزار بهینه‌سازی عملکرد',
    oneLiner: 'بهبود Core Web Vitals با تقسیم کد و بهینه‌سازی تصاویر.',
    description:
      'مجموعه ابزار و روش‌شناسی برای بهبود سیستماتیک LCP، CLS و INP در اپ‌های تولیدی با استفاده از پروفایلینگ، تقسیم کد و تحویل بهینه رسانه.',
    tech: ['React', 'Next/Image', 'Lighthouse', 'Web Vitals'],
    image: '/images/project-2-placeholder.svg',
    liveUrl: 'https://bozorgani.ir/demo/perf-toolkit',
    repoUrl: 'https://github.com/bozorgani/perf-toolkit'
  }
];

export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}


