import Link from 'next/link';
import { getAllProjects } from '@/lib/projects';
import { ProjectCard } from '@/components/ProjectCard';

export async function HomeProjectsSection() {
  const projects = getAllProjects().slice(0, 4);
  return (
    <section 
      id="projects" 
      aria-labelledby="projects-title" 
      className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 md:p-10 lg:p-12 shadow-lg"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tr from-green-100/50 to-emerald-100/50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-full blur-3xl translate-y-1/2 translate-x-1/2"></div>
      
      <div className="relative space-y-6">
        <div className="space-y-2">
          <h2 id="projects-title" className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            پروژه‌های منتخب
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-brand to-indigo-500 rounded-full"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 pt-2">
            نمونه‌ای از پروژه‌های حرفه‌ای که با استفاده از آخرین تکنولوژی‌ها ساخته شده‌اند
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((p, idx) => (
            <div key={p.slug} itemScope itemType="https://schema.org/CreativeWork" itemProp="itemListElement">
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
        <div className="pt-4">
          <Link 
            href="/projects" 
            className="inline-flex items-center gap-2 text-brand hover:text-brand-dark font-semibold transition-colors group"
            aria-label="مشاهده تمام پروژه‌ها"
          >
            مشاهده تمام پروژه‌ها
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}


