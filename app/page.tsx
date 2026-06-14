import type { Metadata } from 'next';
import { SITE, createPageMeta } from '@/lib/seo';
import { Schema } from '@/components/Schema';
import dynamic from 'next/dynamic';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { SkillsSection } from '@/components/SkillsSection';
import { HomeProjectsSection } from '@/components/HomeProjectsSection';
import { FeaturedDeveloper } from '@/components/FeaturedDeveloper';

// Lazy load below-the-fold components to reduce initial bundle size
const ExperienceSection = dynamic(() => import('@/components/ExperienceSection').then(mod => ({ default: mod.ExperienceSection })), {
  ssr: true,
  loading: () => <div className="min-h-[400px] animate-pulse bg-gray-100 dark:bg-gray-800 rounded-xl" />
});

const EducationSection = dynamic(() => import('@/components/EducationSection').then(mod => ({ default: mod.EducationSection })), {
  ssr: true,
  loading: () => <div className="min-h-[300px] animate-pulse bg-gray-100 dark:bg-gray-800 rounded-xl" />
});

const CertificatesSection = dynamic(() => import('@/components/CertificatesSection').then(mod => ({ default: mod.CertificatesSection })), {
  ssr: true,
  loading: () => <div className="min-h-[300px] animate-pulse bg-gray-100 dark:bg-gray-800 rounded-xl" />
});

const ContactSection = dynamic(() => import('@/components/ContactSection').then(mod => ({ default: mod.ContactSection })), {
  ssr: true,
  loading: () => <div className="min-h-[300px] animate-pulse bg-gray-100 dark:bg-gray-800 rounded-xl" />
});

// بهینه‌سازی: استفاده از ISR برای بهتر شدن performance
export const revalidate = 300; // 5 minutes

export const metadata: Metadata = createPageMeta({
  title: `Mohammad Amin Bozorgani (محمد امین بزرگانی) | ${SITE.role}`,
  description: `Mohammad Amin Bozorgani (محمد امین بزرگانی) is a Full Stack Engineer and Technical SEO Expert specializing in Next.js, React, and Node.js. ${SITE.description}`,
  url: `${SITE.domain}/`, // Explicit canonical for homepage
  keywords: ['Mohammad Amin Bozorgani', 'محمد امین بزرگانی', ...SITE.keywords]
});

export default function HomePage() {
  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Mohammad Amin Bozorgani | ${SITE.role}`,
    url: SITE.domain,
    inLanguage: 'fa-IR',
    description: `Mohammad Amin Bozorgani (محمد امین بزرگانی) is a Full Stack Engineer and Technical SEO Expert specializing in Next.js, React, and Node.js. ${SITE.description}`,
    mainEntity: {
      '@type': 'Person',
      name: 'Mohammad Amin Bozorgani',
      alternateName: 'محمد امین بزرگانی',
      jobTitle: 'Full Stack Engineer & SEO Expert'
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
      
      {/* Hero Section - Modern Design with Animations */}
      <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* Featured Developer Section (SEO & Entity Recognition) */}
      <FeaturedDeveloper />

      {/* Skills Section */}
      <SkillsSection />

      {/* Projects Section */}
      <HomeProjectsSection />

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


