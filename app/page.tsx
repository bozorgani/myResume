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

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = createPageMeta({
  title: `${SITE.name} | ${SITE.role}`,
  description: SITE.description,
  url: SITE.domain,
  keywords: SITE.keywords
});

export default function HomePage() {
  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${SITE.name} | ${SITE.role}`,
    url: SITE.domain,
    inLanguage: 'fa-IR',
    description: SITE.description
  } as const;

  const breadcrumbsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'خانه', item: SITE.domain }
    ]
  } as const;
  return (
    <div className="space-y-16">
      <Schema json={webPageJsonLd} />
      <Schema json={breadcrumbsJsonLd} />
      {/* Hero Section */}
      <section aria-labelledby="hero-title" className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4">
          <h1 id="hero-title" className="text-3xl font-bold tracking-tight sm:text-4xl">
            من محمد امین بزرگانی — {SITE.role}
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            توسعه‌دهنده Full-Stack با ۱۰+ سال تجربه در ساخت وب‌اپلیکیشن‌های مدرن و مقیاس‌پذیر. متخصص در Next.js، React، Node.js و بهینه‌سازی عملکرد و سئو فنی. مشاوره در زمینه معماری نرم‌افزار و راه‌اندازی پروژه‌های استارتاپی.
          </p>
          {/* نشان‌های فناوری‌های اصلی برای اسکن سریع و سئو */}
          <ul className="flex flex-wrap gap-2" aria-label="فناوری‌های اصلی">
            {['Node.js', 'Express.js', 'React.js', 'Next.js', 'MongoDB'].map((s) => (
              <li key={s} className="rounded-md border px-2.5 py-1 text-sm text-gray-800 dark:text-gray-200 dark:border-gray-700">
                {s}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3">
            <Link href="#projects" className="rounded bg-brand px-4 py-2 font-medium text-white hover:bg-brand-dark">
              مشاهده پروژه‌های منتخب
            </Link>
            <Link href="/resume" className="rounded border px-4 py-2 font-medium hover:bg-gray-50 dark:hover:bg-gray-800">
              مشاهده رزومه
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="relative h-40 w-40 md:h-60 md:w-60">
            <Image
              src="/images/amin-bozorgani-portrait.webp"
              alt="پرتره محمد امین بزرگانی"
              width={480}
              height={480}
              quality={100}
              priority
              sizes="(min-width: 768px) 240px, 160px"
              className="h-full w-full rounded-full border object-cover shadow-lg dark:border-gray-700"
              unoptimized={false}
            />
          </div>
        </div>
      </section>

      {/* About */}
      <AboutSection />

      {/* Skills */}
      <SkillsSection />

      {/* Projects */}
      <HomeProjectsSection />

      {/* Blog */}
      <HomeBlogSection />

      {/* Experience */}
      <ExperienceSection />

      {/* Education */}
      <EducationSection />

      {/* Certificates */}
      <CertificatesSection />

      {/* Contact */}
      <ContactSection />

      
    </div>
  );
}


