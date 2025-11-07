import type { Metadata } from 'next';
import Image from 'next/image';
import { SITE, createPageMeta } from '@/lib/seo';
import { ExperienceSection } from '@/components/ExperienceSection';
import { EducationSection } from '@/components/EducationSection';
import { CertificatesSection } from '@/components/CertificatesSection';
import { SkillsSection } from '@/components/SkillsSection';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = createPageMeta({
  title: `رزومه | ${SITE.name}`,
  description: `رزومه کامل ${SITE.name} - توسعه‌دهنده Full-Stack با ۱۰+ سال تجربه. شامل سوابق کاری در توسعه وب‌اپلیکیشن‌های مقیاس‌پذیر، تحصیلات در مهندسی نرم‌افزار، مهارت‌های پیشرفته در Next.js، React، Node.js، و تخصص در بهینه‌سازی عملکرد و سئو فنی.`,
  url: `${SITE.domain}/resume`,
  keywords: [
    'رزومه توسعه‌دهنده',
    'رزومه Full-Stack',
    'رزومه Next.js',
    'رزومه React',
    'توسعه‌دهنده وب',
    'برنامه‌نویس Full-Stack',
    'سوابق کاری',
    'مهارت‌های برنامه‌نویسی'
  ]
});

export default function ResumePage() {
  return (
    <article className="space-y-6 sm:space-y-8 md:space-y-10" aria-labelledby="resume-title">
      {/* Hero / Header */}
      <header className="rounded-xl border bg-gradient-to-br from-white to-gray-50 p-4 sm:p-6 md:p-8 dark:from-gray-900 dark:to-gray-800 dark:border-gray-700 shadow-sm">
        <div className="flex flex-col gap-4 sm:gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full md:w-auto">
            <div className="h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-lg md:rounded-full ring-2 ring-brand/20 shadow-md">
              <Image 
                src="/images/amin-bozorgani-portrait-512.webp" 
                alt={SITE.name} 
                width={384} 
                height={384} 
                quality={100}
                className="h-full w-full object-cover" 
                priority
                sizes="(min-width: 640px) 96px, 80px"
                unoptimized={false}
              />
            </div>
            <div className="space-y-1 sm:space-y-2 min-w-0 flex-1">
              <h1 id="resume-title" className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight">
                {SITE.name}
              </h1>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                {SITE.role} — تمرکز بر Next.js, React, Node.js و سئو فنی
              </p>
            </div>
          </div>
          <div className="w-full sm:w-auto">
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <a 
                className="flex-1 sm:flex-none rounded-md bg-brand px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-dark transition-colors text-center shadow-sm" 
                href="/resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                دانلود PDF
              </a>
              <a 
                className="flex-1 sm:flex-none rounded-md border border-gray-300 px-4 py-2.5 text-sm font-medium hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800 transition-colors text-center" 
                href="/contact"
              >
                تماس
              </a>
              <a 
                className="flex-1 sm:flex-none rounded-md border border-gray-300 px-4 py-2.5 text-sm font-medium hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800 transition-colors text-center" 
                href={SITE.github} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a 
                className="flex-1 sm:flex-none rounded-md border border-gray-300 px-4 py-2.5 text-sm font-medium hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800 transition-colors text-center" 
                href={SITE.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Content - All sections in one column */}
      <div className="space-y-6">
        <ExperienceSection />
        <SkillsSection />
        <EducationSection />
        <CertificatesSection />
      </div>
    </article>
  );
}


