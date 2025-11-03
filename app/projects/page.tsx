import type { Metadata } from 'next';
import { createPageMeta, SITE } from '@/lib/seo';
import { getAllProjects } from '@/lib/projects';
import { ProjectCard } from '@/components/ProjectCard';

export const metadata: Metadata = createPageMeta({
  title: `Projects | ${SITE.name}`,
  description: `Explore a collection of web development projects by ${SITE.name}, demonstrating skills in Node.js,Express.js,React.js,Next.js,MongoDB,Docker.`,
  url: `${SITE.domain}/projects`
});

export default function ProjectsPage() {
  const projects = getAllProjects();
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
      <p className="text-gray-700">A selection of case studies showcasing real-world experience and impact.</p>
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />)
        )}
      </div>
    </div>
  );
}


