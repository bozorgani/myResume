import type { Metadata } from 'next';
import Image from 'next/image';
import { SITE, createPageMeta } from '@/lib/seo';
import { Schema } from '@/components/Schema';
import { ResumeAboutSection } from '@/components/ResumeAboutSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { EducationSection } from '@/components/EducationSection';
import { CertificatesSection } from '@/components/CertificatesSection';
import { SkillsSection } from '@/components/SkillsSection';

// بهینه‌سازی: استفاده از ISR برای بهتر شدن performance
export const revalidate = 3600; // 1 hour (resume doesn't change often)

export const metadata: Metadata = createPageMeta({
  title: `رزومه | ${SITE.name}`,
  description: `رزومه کامل ${SITE.name} - توسعه‌دهنده فول‌استک جاوااسکریپت و متخصص SEO فنی / PWA. شامل سوابق کاری در توسعه وب‌اپلیکیشن‌های مقیاس‌پذیر، مهارت‌های پیشرفته در Next.js، React.js، Node.js، Express.js، MongoDB، Docker، Linux و DevOps. تخصص در بهینه‌سازی Core Web Vitals، SSR و داده‌های ساختاریافته.`,
  url: `${SITE.domain}/resume`,
  keywords: [
    'رزومه توسعه‌دهنده',
    'رزومه Full-Stack JavaScript',
    'رزومه Next.js',
    'رزومه React.js',
    'رزومه Node.js',
    'رزومه PWA',
    'رزومه SEO فنی',
    'توسعه‌دهنده وب',
    'برنامه‌نویس Full-Stack',
    'سوابق کاری',
    'مهارت‌های برنامه‌نویسی',
    'Docker',
    'DevOps',
    'Core Web Vitals'
  ]
});

export default function ResumePage() {
  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `رزومه | ${SITE.name}`,
    url: `${SITE.domain}/resume`,
    inLanguage: 'fa-IR',
    description: `رزومه کامل ${SITE.name} - توسعه‌دهنده فول‌استک جاوااسکریپت و متخصص SEO فنی / PWA`,
    mainEntity: {
      '@type': 'Person',
      name: SITE.name,
      jobTitle: SITE.role,
      url: SITE.domain,
      image: `${SITE.domain}/images/amin-bozorgani-portrait.webp`,
      email: SITE.email,
      sameAs: [
        SITE.domain,
        SITE.github,
        SITE.linkedin,
        `https://twitter.com/${SITE.twitter.replace('@', '')}`
      ]
    }
  } as const;

  const breadcrumbsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'خانه', item: SITE.domain },
      { '@type': 'ListItem', position: 2, name: 'رزومه', item: `${SITE.domain}/resume` }
    ]
  } as const;

  return (
    <article className="space-y-6 sm:space-y-8 md:space-y-10" aria-labelledby="resume-title">
      <Schema json={webPageJsonLd} />
      <Schema json={breadcrumbsJsonLd} />
      {/* Hero / Header */}
      <header className="rounded-xl border bg-gradient-to-br from-white to-gray-50 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 dark:from-gray-900 dark:to-gray-800 dark:border-gray-700 shadow-sm">
        {/* All layouts: Vertical stack - Image (Row 1), Name (Row 2), Description (Row 3), Buttons (Row 4) - All centered */}
        <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-7 items-center">
          {/* Row 1: Profile Image */}
          <div className="flex justify-center w-full">
            <div className="relative shrink-0">
              <div className="absolute -inset-1.5 sm:-inset-2 md:-inset-3 lg:-inset-4 rounded-full bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-pink-500/30 blur-xl opacity-75"></div>
              <div className="relative h-32 w-32 sm:h-36 sm:w-36 md:h-44 md:w-44 lg:h-48 lg:w-48 xl:h-56 xl:w-56 2xl:h-64 2xl:w-64 overflow-hidden rounded-full ring-2 sm:ring-4 md:ring-[6px] lg:ring-8 ring-brand/30 dark:ring-brand/40 shadow-2xl border-2 sm:border-4 md:border-[6px] lg:border-8 border-white dark:border-gray-800">
                <Image 
                  src="/images/amin-bozorgani-portrait-512.webp" 
                  alt={`${SITE.name} - ${SITE.role}`}
                  width={640} 
                  height={640} 
                  quality={100}
                  className="h-full w-full object-cover" 
                  priority
                  sizes="(min-width: 1536px) 256px, (min-width: 1280px) 224px, (min-width: 1024px) 192px, (min-width: 768px) 176px, (min-width: 640px) 144px, 128px"
                  unoptimized={false}
                />
              </div>
            </div>
          </div>
          
          {/* Row 2: Name */}
          <div className="flex justify-center w-full">
            <h1 id="resume-title" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-tight text-gray-900 dark:text-gray-100 break-words text-center w-full">
              {SITE.name}
            </h1>
          </div>
          
          {/* Row 3: Description */}
          <div className="flex justify-center w-full">
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed break-words text-center w-full max-w-4xl">
              <span className="block">توسعه‌دهنده فول‌استک جاوااسکریپت و متخصص SEO فنی / PWA</span>
              <span className="block mt-1 sm:mt-1.5 md:mt-2 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl opacity-90">(Node.js | Next.js | React | Docker | Linux)</span>
            </p>
          </div>
          
          {/* Row 4: Action Buttons - All 4 buttons in one row */}
          <div className="flex justify-center w-full pt-2 sm:pt-3">
            <div className="flex flex-wrap lg:flex-nowrap gap-2 sm:gap-2.5 md:gap-3 justify-center">
              {/* Download PDF Button */}
              <a 
                className="group inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-md bg-brand px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white hover:bg-brand-dark transition-all duration-200 shadow-sm hover:shadow-md hover:scale-105 active:scale-95 whitespace-nowrap" 
                href="/resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:animate-bounce flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
                <span>دانلود PDF</span>
              </a>
              
              {/* Contact Button */}
              <a 
                className="group inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-md border border-gray-300 dark:border-gray-700 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 hover:border-brand dark:hover:border-brand hover:scale-105 active:scale-95 whitespace-nowrap" 
                href="/contact"
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>تماس</span>
              </a>
              
              {/* GitHub Button */}
              <a 
                className="group inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-md border border-gray-300 dark:border-gray-700 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium hover:bg-gray-900 hover:text-white dark:hover:bg-gray-100 dark:hover:text-gray-900 transition-all duration-200 hover:border-gray-900 dark:hover:border-gray-100 hover:scale-105 active:scale-95 whitespace-nowrap" 
                href={SITE.github} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                <span>GitHub</span>
              </a>
              
              {/* LinkedIn Button */}
              <a 
                className="group inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-md border border-gray-300 dark:border-gray-700 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium hover:bg-blue-600 hover:text-white hover:border-blue-600 dark:hover:bg-blue-600 dark:hover:text-white dark:hover:border-blue-600 transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap" 
                href={SITE.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
        <ResumeAboutSection />
        <ExperienceSection />
        <SkillsSection />
        <EducationSection />
        <CertificatesSection />
      </div>
    </article>
  );
}


