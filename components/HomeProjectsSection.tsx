import { getAllProjects } from '@/lib/projects';
import { ProjectCard } from '@/components/ProjectCard';

export async function HomeProjectsSection() {
  const projects = getAllProjects().slice(0, 4);
  return (
    <section id="projects" aria-labelledby="projects-title" className="space-y-6">
      <h2 id="projects-title" className="text-xl font-semibold">پروژه‌ها</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </section>
  );
}


