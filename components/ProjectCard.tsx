import Link from 'next/link';
import Image from 'next/image';
import type { Project } from '@/lib/projects';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group rounded-lg border p-4 transition-colors hover:border-brand dark:border-gray-800" aria-labelledby={`${project.slug}-title`}>
      <div className="aspect-video overflow-hidden rounded bg-gray-100 dark:bg-gray-800">
        <Image
          src={project.image}
          alt={`تصویر ${project.title}`}
          width={800}
          height={450}
          sizes="(min-width: 640px) 50vw, 100vw"
          className="h-full w-full object-cover"
        />
      </div>
      <h3 id={`${project.slug}-title`} className="mt-3 text-lg font-semibold">{project.title}</h3>
      <p className="text-gray-700 dark:text-gray-300">{project.oneLiner}</p>
      <ul className="mt-2 flex flex-wrap gap-2 text-sm text-gray-600" aria-label="فناوری‌های استفاده‌شده">
        {project.tech.map((t) => (
          <li key={t} className="rounded bg-gray-100 px-2 py-0.5 dark:bg-gray-800 dark:text-gray-200">{t}</li>
        ))}
      </ul>
      <div className="mt-3">
        <Link className="text-brand hover:underline" href={`/projects/${project.slug}`}>مطالعهٔ موردی را بخوانید</Link>
      </div>
    </article>
  );
}


