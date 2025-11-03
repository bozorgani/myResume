import type { Metadata } from 'next';
import { createPageMeta, SITE } from '@/lib/seo';
import { getAllProjects } from '@/lib/projects';
import { ProjectCard } from '@/components/ProjectCard';

export const metadata: Metadata = createPageMeta({
  title: `پروژه‌ها | ${SITE.name}`,
  description: `مجموعه‌ای از پروژه‌های توسعه وب توسط ${SITE.name} با مهارت در Node.js، Express.js، React.js، Next.js، MongoDB و Docker`,
  url: `${SITE.domain}/projects`
});

export default function ProjectsPage() {
  const projects = getAllProjects();
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">پروژه‌ها</h1>
      <p className="text-gray-700">چند مطالعهٔ موردی برای نمایش تجربهٔ واقعی و اثرگذاری.</p>
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />)
        )}
      </div>
    </div>
  );
}


