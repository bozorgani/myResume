import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { SITE, createPageMeta } from '@/lib/seo';

export const metadata: Metadata = createPageMeta({
  title: `${SITE.name} | ${SITE.role}`,
  description: SITE.description,
  url: SITE.domain
});

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section aria-labelledby="hero-title" className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4">
          <h1 id="hero-title" className="text-3xl font-bold tracking-tight sm:text-4xl">
            Hi, I'm {SITE.name}. I build performant web applications.
          </h1>
          <p className="text-lg text-gray-700">
            Expert in React, Next.js, and TypeScript. Focused on Core Web Vitals, a11y, and technical SEO.
          </p>
          {/* Primary tech stack badges for quick scanning and SEO relevance */}
          <ul className="flex flex-wrap gap-2" aria-label="Primary tech stack">
            {['Node.js', 'Express.js', 'Next.js', 'React.js', 'Docker'].map((s) => (
              <li key={s} className="rounded-md border px-2.5 py-1 text-sm text-gray-800">
                {s}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3">
            <Link href="#featured-projects" className="rounded bg-brand px-4 py-2 font-medium text-white hover:bg-brand-dark">
              View Featured Projects
            </Link>
            <Link href="/resume" className="rounded border px-4 py-2 font-medium hover:bg-gray-50">
              View Resume
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Image
            src="/images/profile-placeholder.svg"
            alt="Portrait illustration of Mohammad Amin Bozorgani"
            width={240}
            height={240}
            priority
            sizes="(min-width: 768px) 240px, 160px"
            className="h-40 w-40 rounded-full border object-cover md:h-60 md:w-60"
          />
        </div>
      </section>

      {/* Featured Projects */}
      <section id="featured-projects" aria-labelledby="featured-title" className="space-y-6">
        <h2 id="featured-title" className="text-2xl font-semibold">Featured Projects</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <article className="group rounded-lg border p-4 transition-colors hover:border-brand" aria-labelledby="proj1-title">
            <div className="aspect-video overflow-hidden rounded bg-gray-100">
              <Image
                src="/images/project-1-placeholder.svg"
                alt="Screenshot placeholder for Project One"
                width={800}
                height={450}
                sizes="(min-width: 640px) 50vw, 100vw"
                className="h-full w-full object-cover"
              />
            </div>
            <h3 id="proj1-title" className="mt-3 text-lg font-semibold">Full Stack Developer Case Study</h3>
            <p className="text-gray-700">A scalable web application built with Next.js, Node.js, and MongoDB.</p>
            <ul className="mt-2 flex flex-wrap gap-2 text-sm text-gray-600" aria-label="Technologies used">
              <li className="rounded bg-gray-100 px-2 py-0.5">Next.js</li>
              <li className="rounded bg-gray-100 px-2 py-0.5">TypeScript</li>
              <li className="rounded bg-gray-100 px-2 py-0.5">MongoDB</li>
            </ul>
            <div className="mt-3">
              <Link className="text-brand hover:underline" href="/projects/full-stack-developer">Read the case study</Link>
            </div>
          </article>

          <article className="group rounded-lg border p-4 transition-colors hover:border-brand" aria-labelledby="proj2-title">
            <div className="aspect-video overflow-hidden rounded bg-gray-100">
              <Image
                src="/images/project-2-placeholder.svg"
                alt="Screenshot placeholder for Project Two"
                width={800}
                height={450}
                sizes="(min-width: 640px) 50vw, 100vw"
                className="h-full w-full object-cover"
              />
            </div>
            <h3 id="proj2-title" className="mt-3 text-lg font-semibold">Performance Optimization Toolkit</h3>
            <p className="text-gray-700">Improving Core Web Vitals with code-splitting and image optimization.</p>
            <ul className="mt-2 flex flex-wrap gap-2 text-sm text-gray-600" aria-label="Technologies used">
              <li className="rounded bg-gray-100 px-2 py-0.5">React</li>
              <li className="rounded bg-gray-100 px-2 py-0.5">Next/Image</li>
              <li className="rounded bg-gray-100 px-2 py-0.5">Lighthouse</li>
            </ul>
            <div className="mt-3">
              <Link className="text-brand hover:underline" href="/projects/perf-optimization-toolkit">Read the case study</Link>
            </div>
          </article>
        </div>
      </section>

      {/* CTA */}
      <section aria-labelledby="cta-title" className="rounded-lg border p-6">
        <h2 id="cta-title" className="text-xl font-semibold">Work with me</h2>
        <p className="mt-2 text-gray-700">Have a project in mind or hiring for a role? I'd love to chat.</p>
        <div className="mt-3">
          <a className="text-brand hover:underline" href="mailto:hello@bozorgani.ir">hello@bozorgani.ir</a>
        </div>
      </section>
    </div>
  );
}


