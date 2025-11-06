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
  if (!project) {
    return createPageMeta({
      title: `پروژه پیدا نشد | ${SITE.name}`,
      description: `پروژه مورد نظر یافت نشد. به صفحه پروژه‌ها بازگردید.`,
      url: `${SITE.domain}/projects`
    });
  }
  // Create comprehensive description for SEO
  const description = `${project.oneLiner} ${project.description.substring(0, 120)}... این پروژه با استفاده از تکنولوژی‌های ${project.tech.join('، ')} توسعه داده شده است. ${SITE.name} - توسعه‌دهنده Full-Stack با تخصص در Next.js، React و Node.js.`;
  
  return createPageMeta({
    title: `${project.title} | ${SITE.name}`,
    description: description,
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
      { '@type': 'ListItem', position: 1, name: 'صفحه اصلی', item: `${SITE.domain}` },
      { '@type': 'ListItem', position: 2, name: 'پروژه‌ها', item: `${SITE.domain}/projects` },
      { '@type': 'ListItem', position: 3, name: project.title, item: `${SITE.domain}/projects/${project.slug}` }
    ]
  };

  return (
    <article className="space-y-10" aria-labelledby="title">
      <Schema json={projectSchema} />
      <Schema json={breadcrumbSchema} />
      <Breadcrumbs items={[{ name: 'صفحه اصلی', href: '/' }, { name: 'پروژه‌ها', href: '/projects' }, { name: project.title }]} />
      <header className="rounded-xl border p-5 sm:p-6 md:p-8 dark:border-gray-800">
        <div className="flex flex-col gap-4">
          <h1 id="title" className="text-3xl font-bold tracking-tight">{project.title}</h1>
          <p className="text-gray-700 dark:text-gray-300">{project.oneLiner}</p>
          <div className="flex flex-wrap gap-3 text-sm">
            {project.liveUrl && (
              <a className="rounded-md bg-brand px-4 py-2 font-medium text-white hover:bg-brand-dark" href={project.liveUrl} target="_blank" rel="noopener noreferrer">نسخه زنده</a>
            )}
            {project.repoUrl && (
              <a className="rounded-md border px-4 py-2 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900" href={project.repoUrl} target="_blank" rel="noopener noreferrer">گیت‌هاب</a>
            )}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section aria-labelledby="media-title" className="space-y-3">
            <h2 id="media-title" className="text-xl font-semibold">نمای کلی</h2>
            <div className="overflow-hidden rounded-lg border bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
              <Image
                src={project.image}
                alt={`تصویر ${project.title}`}
                width={1200}
                height={675}
                sizes="100vw"
                className="h-auto w-full"
                priority
              />
            </div>
          </section>

          <section aria-labelledby="desc-title" className="space-y-3 rounded-xl border p-5 dark:border-gray-800">
            <h2 id="desc-title" className="text-xl font-semibold">شرح پروژه</h2>
            <p className="text-gray-800 dark:text-gray-200">{project.description}</p>
          </section>

          <section aria-labelledby="process-title" className="space-y-3 rounded-xl border p-5 dark:border-gray-800">
            <h2 id="process-title" className="text-xl font-semibold">چالش‌ها و راهکارها</h2>
            <ul className="list-disc pr-5 text-gray-800 dark:text-gray-200 space-y-2">
              <li>بهینه‌سازی عملکرد و امتیاز Core Web Vitals با Lazy-loading و code splitting.</li>
              <li>طراحی واکنش‌گرا با شبکه‌بندی Tailwind و تصاویر واکنش‌گرا.</li>
              <li>سئو فنی با متادیتای ساختاریافته و نقشه‌سایت.</li>
            </ul>
          </section>
        </div>
        <aside className="space-y-6 lg:sticky lg:top-24 self-start">
          <section aria-labelledby="tech-title" className="space-y-3 rounded-xl border p-5 dark:border-gray-800">
            <h2 id="tech-title" className="text-xl font-semibold">فناوری‌ها</h2>
            <ul className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <li key={t} className="rounded bg-gray-100 px-2 py-0.5 text-sm dark:bg-gray-900 dark:text-gray-300">{t}</li>
              ))}
            </ul>
          </section>
          <section className="grid grid-cols-2 gap-3 rounded-xl border p-5 text-sm dark:border-gray-800">
            {project.liveUrl ? (
              <a className="rounded-md bg-brand px-3 py-2 text-center font-medium text-white hover:bg-brand-dark" href={project.liveUrl} target="_blank" rel="noopener noreferrer">مشاهده زنده</a>
            ) : null}
            {project.repoUrl ? (
              <a className="rounded-md border px-3 py-2 text-center hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900" href={project.repoUrl} target="_blank" rel="noopener noreferrer">مخزن</a>
            ) : null}
          </section>
        </aside>
      </div>
    </article>
  );
}


