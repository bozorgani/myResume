import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getAllProjects, getProjectBySlug } from '@/lib/projects';
import { SITE, createPageMeta } from '@/lib/seo';
import { Schema } from '@/components/Schema';
import { Breadcrumbs } from '@/components/Breadcrumbs';

type Params = { slug: string };

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};
  return createPageMeta({
    title: `${SITE.role} Case Study | ${SITE.name}`,
    description: `A detailed case study of the ${project.title}, built with Next.js by ${SITE.name}.`,
    url: `${SITE.domain}/projects/${project.slug}`,
    image: project.image
  });
}

export default function ProjectDetailPage({ params }: { params: Params }) {
  const project = getProjectBySlug(params.slug);
  if (!project) return notFound();

  const projectSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.title,
    applicationCategory: 'WebApplication',
    operatingSystem: 'All',
    description: project.oneLiner,
    author: { '@type': 'Person', name: SITE.name },
    url: project.liveUrl || `${SITE.domain}/projects/${project.slug}`
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE.domain}` },
      { '@type': 'ListItem', position: 2, name: 'Projects', item: `${SITE.domain}/projects` },
      { '@type': 'ListItem', position: 3, name: project.title, item: `${SITE.domain}/projects/${project.slug}` }
    ]
  };

  return (
    <article className="space-y-8" aria-labelledby="title">
      <Schema json={projectSchema} />
      <Schema json={breadcrumbSchema} />
      <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Projects', href: '/projects' }, { name: project.title }]} />
      <header className="space-y-3">
        <h1 id="title" className="text-3xl font-bold tracking-tight">{project.title}</h1>
        <p className="text-gray-700">{project.oneLiner}</p>
        <div className="flex flex-wrap gap-3 text-sm">
          {project.liveUrl && (
            <a className="rounded border px-3 py-1 hover:bg-gray-50" href={project.liveUrl} target="_blank" rel="noopener noreferrer">Live Demo</a>
          )}
          {project.repoUrl && (
            <a className="rounded border px-3 py-1 hover:bg-gray-50" href={project.repoUrl} target="_blank" rel="noopener noreferrer">GitHub</a>
          )}
        </div>
      </header>

      <section aria-labelledby="desc-title" className="space-y-3">
        <h2 id="desc-title" className="text-xl font-semibold">Overview</h2>
        <p className="text-gray-800">{project.description}</p>
      </section>

      <section aria-labelledby="tech-title" className="space-y-3">
        <h2 id="tech-title" className="text-xl font-semibold">Tech Stack</h2>
        <ul className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <li key={t} className="rounded bg-gray-100 px-2 py-0.5 text-sm">{t}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="media-title" className="space-y-3">
        <h2 id="media-title" className="text-xl font-semibold">Screenshots</h2>
        <div className="overflow-hidden rounded border bg-gray-50">
          <Image
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            width={1200}
            height={675}
            sizes="100vw"
            className="h-auto w-full"
            priority
          />
        </div>
      </section>
    </article>
  );
}


