import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { SITE, createPageMeta } from '@/lib/seo';
import { Schema } from '@/components/Schema';
import { AboutSection } from '@/components/AboutSection';
import { SkillsSection } from '@/components/SkillsSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { EducationSection } from '@/components/EducationSection';
import { CertificatesSection } from '@/components/CertificatesSection';
import { HomeProjectsSection } from '@/components/HomeProjectsSection';
import { HomeBlogSection } from '@/components/HomeBlogSection';
import { ContactSection } from '@/components/ContactSection';

// بهینه‌سازی: استفاده از ISR برای بهتر شدن performance
export const revalidate = 300; // 5 minutes

export const metadata: Metadata = createPageMeta({
  title: `${SITE.name} | ${SITE.role}`,
  description: SITE.description,
  url: SITE.domain,
  keywords: [...SITE.keywords]
});

export default function HomePage() {
  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${SITE.name} | ${SITE.role}`,
    url: SITE.domain,
    inLanguage: 'fa-IR',
    description: SITE.description,
    mainEntity: {
      '@type': 'Person',
      name: SITE.name,
      jobTitle: SITE.role
    }
  } as const;

  const breadcrumbsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'خانه', item: SITE.domain }
    ]
  } as const;

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'بخش‌های پروفایل',
    description: 'بخش‌های مختلف پروفایل حرفه‌ای محمد امین بزرگانی',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'درباره من', url: `${SITE.domain}#about` },
      { '@type': 'ListItem', position: 2, name: 'مهارت‌ها', url: `${SITE.domain}#skills` },
      { '@type': 'ListItem', position: 3, name: 'پروژه‌ها', url: `${SITE.domain}#projects` },
      { '@type': 'ListItem', position: 4, name: 'تجربه', url: `${SITE.domain}#experience` },
      { '@type': 'ListItem', position: 5, name: 'تماس', url: `${SITE.domain}#contact` }
    ]
  } as const;

  return (
    <div className="space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24">
      <Schema json={webPageJsonLd} />
      <Schema json={breadcrumbsJsonLd} />
      <Schema json={itemListJsonLd} />
      
      {/* Hero Section - Modern Design */}
      <section 
        aria-labelledby="hero-title" 
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6 sm:p-8 md:p-12 lg:p-16 shadow-xl"
      >
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-sky-200/30 to-blue-300/30 dark:from-sky-900/20 dark:to-blue-900/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-indigo-200/30 to-purple-300/30 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative grid gap-6 sm:gap-8 md:grid-cols-3 items-center">
          <div className="md:col-span-2 space-y-4 sm:space-y-6 order-2 md:order-1">
            <div className="space-y-2 sm:space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/80 dark:bg-gray-800/80 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="whitespace-nowrap">در دسترس برای پروژه‌های جدید</span>
              </div>
              <h1 id="hero-title" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent leading-tight">
                من <span className="text-brand dark:text-sky-400">محمد امین بزرگانی</span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-300">
                {SITE.role}
              </p>
            </div>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
              توسعه‌دهنده Full-Stack با <strong className="text-gray-900 dark:text-gray-100">۱۰+ سال تجربه</strong> در ساخت وب‌اپلیکیشن‌های مدرن و مقیاس‌پذیر. متخصص در Next.js، React، Node.js و بهینه‌سازی عملکرد و سئو فنی. مشاوره در زمینه معماری نرم‌افزار و راه‌اندازی پروژه‌های استارتاپی.
            </p>

            {/* Technology Badges */}
            <div className="flex flex-wrap gap-2 sm:gap-3" aria-label="فناوری‌های اصلی">
              {['Node.js', 'Express.js', 'React.js', 'Next.js', 'MongoDB', 'TypeScript'].map((tech) => (
                <span 
                  key={tech} 
                  className="inline-flex items-center rounded-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-200 shadow-sm hover:shadow-md transition-shadow"
                  itemProp="knowsAbout"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-2">
              <Link 
                href="#projects" 
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand to-brand-dark px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                aria-label="مشاهده پروژه‌های منتخب"
              >
                مشاهده پروژه‌های منتخب
                <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <Link 
                href="/resume" 
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 shadow-sm hover:shadow-md"
                aria-label="مشاهده رزومه کامل"
              >
                مشاهده رزومه
              </Link>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 sm:gap-4 pt-2">
              <a 
                href={SITE.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                aria-label="GitHub Profile"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a 
                href={SITE.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a 
                href={`mailto:${SITE.email}`}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                aria-label="Send Email"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex items-center justify-center md:justify-end order-1 md:order-2">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand via-blue-500 to-indigo-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse"></div>
              <div className="relative h-40 w-40 sm:h-48 sm:w-48 md:h-64 md:w-64 lg:h-72 lg:w-72">
                <Image
                  src="/images/amin-bozorgani-portrait.webp"
                  alt="پرتره محمد امین بزرگانی - توسعه‌دهنده Full-Stack و متخصص سئو فنی"
                  width={480}
                  height={480}
                  quality={100}
                  priority
                  sizes="(min-width: 1024px) 288px, (min-width: 768px) 256px, 160px"
                  className="h-full w-full rounded-full border-4 border-white dark:border-gray-800 object-cover shadow-2xl ring-4 ring-gray-200/50 dark:ring-gray-700/50 transition-transform duration-300 group-hover:scale-105"
                  itemProp="image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Skills Section */}
      <SkillsSection />

      {/* Projects Section */}
      <HomeProjectsSection />

      {/* Blog Section */}
      <HomeBlogSection />

      {/* Experience Section */}
      <ExperienceSection />

      {/* Education Section */}
      <EducationSection />

      {/* Certificates Section */}
      <CertificatesSection />

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}


