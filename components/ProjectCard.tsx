import Link from 'next/link';
import Image from 'next/image';
import type { Project } from '@/lib/projects';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article 
      className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-all duration-300 hover:shadow-xl hover:border-brand dark:hover:border-brand hover:-translate-y-1" 
      aria-labelledby={`${project.slug}-title`}
      itemProp="item"
    >
      <div className="aspect-video overflow-hidden rounded-t-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
        <Image
          src={project.image}
          alt={`تصویر پروژه ${project.title}`}
          width={800}
          height={450}
          sizes="(min-width: 640px) 50vw, 100vw"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          itemProp="image"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>
      <div className="p-5 space-y-3">
        <h3 
          id={`${project.slug}-title`} 
          className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-brand dark:group-hover:text-blue-400 transition-colors"
          itemProp="name"
        >
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed" itemProp="description">
          {project.oneLiner}
        </p>
        <ul className="flex flex-wrap gap-2 text-xs" aria-label="فناوری‌های استفاده‌شده">
          {project.tech.map((t) => (
            <li 
              key={t} 
              className="rounded-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 px-3 py-1.5 font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
              itemProp="keywords"
            >
              {t}
            </li>
          ))}
        </ul>
        <div className="pt-2">
          <Link 
            className="inline-flex items-center gap-2 text-brand hover:text-brand-dark font-semibold transition-colors group/link" 
            href={`/projects/${project.slug}`}
            aria-label={`مشاهده جزئیات پروژه ${project.title}`}
            itemProp="url"
          >
            مطالعهٔ موردی را بخوانید
            <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}


