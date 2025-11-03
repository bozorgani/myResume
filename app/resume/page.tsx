import type { Metadata } from 'next';

import { SITE, createPageMeta } from '@/lib/seo';

export const metadata: Metadata = createPageMeta({
  title: `Resume | ${SITE.name}`,
  description: `The official resume of ${SITE.name}, detailing work experience, education, and proficiency in modern web development technologies.`,
  url: `${SITE.domain}/resume`
});

export default function ResumePage() {
  return (
    <article className="space-y-8" aria-labelledby="resume-title">
      <header>
        <h1 id="resume-title" className="text-3xl font-bold tracking-tight">Resume</h1>
        <p className="mt-2 text-gray-700">Download a PDF version or review the HTML version below.</p>
        <div className="mt-3">
          <a className="rounded bg-brand px-4 py-2 font-medium text-white hover:bg-brand-dark" href="/resume.pdf" target="_blank" rel="noopener noreferrer">Download PDF</a>
        </div>
      </header>

      {/* Option A: If a PDF exists in /public/resume.pdf it will open using the browser viewer. */}

      {/* Option B: Well-structured HTML resume for SEO and a11y */}
      <section className="space-y-6" aria-labelledby="experience-title">
        <h2 id="experience-title" className="text-2xl font-semibold">Work Experience</h2>
        <div>
          <h3 className="text-lg font-semibold">Senior Full-Stack Developer — Freelance</h3>
          <p className="text-sm text-gray-600">2020 — Present</p>
          <ul className="mt-2 list-disc pl-5 text-gray-800">
            <li>Architected SEO-first Next.js applications with top Core Web Vitals scores.</li>
            <li>Led accessibility reviews and implemented WCAG-compliant UI components.</li>
            <li>Designed CI/CD pipelines and implemented performance budgets.</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="education-title">
        <h2 id="education-title" className="text-2xl font-semibold">Education</h2>
        <p>B.S. in Computer Science</p>
      </section>

      <section className="space-y-4" aria-labelledby="skills-title">
        <h2 id="skills-title" className="text-2xl font-semibold">Skills</h2>
        <ul className="flex flex-wrap gap-2">
          {['Next.js', 'React', 'TypeScript', 'Node.js', 'MongoDB', 'Docker', 'TailwindCSS', 'SEO', 'a11y'].map((s) => (
            <li key={s} className="rounded bg-gray-100 px-2 py-0.5 text-sm">{s}</li>
          ))}
        </ul>
      </section>
    </article>
  );
}


