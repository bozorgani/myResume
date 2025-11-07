import type { Metadata } from 'next';
import Image from 'next/image';
import { SITE, createPageMeta } from '@/lib/seo';
import { ExperienceSection } from '@/components/ExperienceSection';
import { EducationSection } from '@/components/EducationSection';
import { CertificatesSection } from '@/components/CertificatesSection';
import { SkillsSection } from '@/components/SkillsSection';

// بهینه‌سازی: استفاده از ISR برای بهتر شدن performance
export const revalidate = 3600; // 1 hour (resume doesn't change often)

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
        <div className="flex flex-col gap-5 sm:gap-5 md:flex-row md:items-center md:justify-between">
          {/* Profile Section - Improved mobile layout */}
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-4 w-full md:w-auto">
            {/* Profile Image - Larger and centered on mobile, professional styling */}
            <div className="relative h-36 w-36 sm:h-32 sm:w-32 md:h-28 md:w-28 shrink-0">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl"></div>
              <div className="relative h-full w-full overflow-hidden rounded-full ring-4 ring-brand/30 dark:ring-brand/40 shadow-xl">
                <Image 
                  src="/images/amin-bozorgani-portrait-512.webp" 
                  alt={SITE.name} 
                  width={384} 
                  height={384} 
                  quality={100}
                  className="h-full w-full object-cover" 
                  priority
                  sizes="(min-width: 768px) 112px, (min-width: 640px) 128px, 144px"
                  unoptimized={false}
                />
              </div>
            </div>
            {/* Name and Role - Centered on mobile, right-aligned on larger screens */}
            <div className="space-y-2 sm:space-y-2 min-w-0 flex-1 text-center sm:text-right">
              <h1 id="resume-title" className="text-3xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight text-gray-900 dark:text-gray-100">
                {SITE.name}
              </h1>
              <p className="text-base sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                {SITE.role} — تمرکز بر Next.js, React, Node.js و سئو فنی
              </p>
            </div>
          </div>
          <div className="w-full sm:w-auto">
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {/* Download PDF Button */}
              <a 
                className="group flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-md bg-brand px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-dark transition-all duration-200 text-center shadow-sm hover:shadow-md hover:scale-105 active:scale-95" 
                href="/resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <svg className="w-4 h-4 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
                <span>دانلود PDF</span>
              </a>
              
              {/* Contact Button */}
              <a 
                className="group flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-md border border-gray-300 dark:border-gray-700 px-4 py-2.5 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 text-center hover:border-brand dark:hover:border-brand hover:scale-105 active:scale-95" 
                href="/contact"
              >
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>تماس</span>
              </a>
              
              {/* GitHub Button */}
              <a 
                className="group flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-md border border-gray-300 dark:border-gray-700 px-4 py-2.5 text-sm font-medium hover:bg-gray-900 hover:text-white dark:hover:bg-gray-100 dark:hover:text-gray-900 transition-all duration-200 text-center hover:border-gray-900 dark:hover:border-gray-100 hover:scale-105 active:scale-95" 
                href={SITE.github} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
              >
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                <span>GitHub</span>
              </a>
              
              {/* LinkedIn Button */}
              <a 
                className="group flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-md border border-gray-300 dark:border-gray-700 px-4 py-2.5 text-sm font-medium hover:bg-blue-600 hover:text-white hover:border-blue-600 dark:hover:bg-blue-600 dark:hover:text-white dark:hover:border-blue-600 transition-all duration-200 text-center hover:scale-105 active:scale-95" 
                href={SITE.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
              >
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span>LinkedIn</span>
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


