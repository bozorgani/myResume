import type { Metadata } from 'next';
import Image from 'next/image';
import { SITE, createPageMeta } from '@/lib/seo';
import { ExperienceSection } from '@/components/ExperienceSection';
import { EducationSection } from '@/components/EducationSection';
import { CertificatesSection } from '@/components/CertificatesSection';
import { SkillsSection } from '@/components/SkillsSection';

export const metadata: Metadata = createPageMeta({
  title: `رزومه | ${SITE.name}`,
  description: `رزومه رسمی ${SITE.name} شامل سوابق کاری، تحصیلات و مهارت‌ها در فناوری‌های مدرن توسعه وب.`,
  url: `${SITE.domain}/resume`
});

export default function ResumePage() {
  return (
    <article className="space-y-10" aria-labelledby="resume-title">
      {/* Hero / Header */}
      <header className="rounded-xl border p-5 sm:p-6 md:p-8 dark:border-gray-800">
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-full items-center gap-4 sm:w-auto">
            <div className="h-16 w-16 overflow-hidden rounded-full ring-2 ring-brand/20 sm:h-20 sm:w-20">
              <Image src="/images/amin-bozorgani-portrait-512.webp" alt={SITE.name} width={80} height={80} className="h-full w-full object-cover" />
            </div>
            <div className="space-y-1 sm:space-y-2">
            <h1 id="resume-title" className="text-3xl font-bold tracking-tight">{SITE.name}</h1>
              <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">{SITE.role} — تمرکز بر Next.js, React, Node.js و سئو فنی</p>
            </div>
          </div>
          <div className="w-full sm:w-auto">
            <div className="flex flex-wrap gap-3">
              <a className="rounded-md bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark" href="/resume.pdf" target="_blank" rel="noopener noreferrer">دانلود PDF</a>
              <a className="rounded-md border px-4 py-2 text-sm hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900" href="/contact">تماس</a>
              <a className="rounded-md border px-4 py-2 text-sm hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900" href={SITE.github} target="_blank" rel="noopener noreferrer">GitHub</a>
              <a className="rounded-md border px-4 py-2 text-sm hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900" href={SITE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          </div>
        </div>
      </header>

      {/* Content grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <ExperienceSection />
          <CertificatesSection />
        </div>
        <div className="space-y-6 lg:sticky lg:top-24 self-start">
          <SkillsSection />
          <EducationSection />
        </div>
      </div>
    </article>
  );
}


