import type { Metadata } from 'next';
import { createPageMeta, SITE } from '@/lib/seo';
import { getAllProjects } from '@/lib/projects';
import { ProjectCard } from '@/components/ProjectCard';

export const metadata: Metadata = createPageMeta({
  title: `پروژه‌ها | ${SITE.name}`,
  description: `مجموعه‌ای از پروژه‌های واقعی توسعه وب توسط ${SITE.name} شامل پلتفرم‌های تجارت الکترونیک، سیستم‌های مدیریت محتوا، و ابزارهای بهینه‌سازی عملکرد. هر پروژه با استفاده از تکنولوژی‌های مدرن مانند Next.js، React، Node.js، MongoDB و Docker توسعه داده شده و شامل بهینه‌سازی عملکرد و بهبود Core Web Vitals است.`,
  url: `${SITE.domain}/projects`,
  keywords: [
    'پروژه‌های Next.js',
    'پروژه‌های React',
    'پورتفولیو توسعه‌دهنده',
    'نمونه کار توسعه وب',
    'پروژه‌های Full-Stack',
    'پروژه‌های Node.js',
    'پروژه‌های MongoDB'
  ]
});

export default function ProjectsPage() {
  const projects = getAllProjects();
  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="space-y-3 sm:space-y-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">پروژه‌ها</h1>
        <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          مجموعه‌ای از پروژه‌های واقعی که با استفاده از تکنولوژی‌های مدرن مانند Next.js، React، Node.js و MongoDB توسعه داده‌ام. هر پروژه شامل بهینه‌سازی عملکرد، بهبود Core Web Vitals، و پیاده‌سازی بهترین شیوه‌های سئو فنی است. این پروژه‌ها نشان‌دهنده تجربه من در ساخت اپلیکیشن‌های مقیاس‌پذیر، سیستم‌های مدیریت محتوا، و پلتفرم‌های تجارت الکترونیک هستند.
        </p>
      </div>
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </div>
  );
}


