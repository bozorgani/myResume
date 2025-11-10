import type { Metadata } from 'next';
import { SITE, createPageMeta } from '@/lib/seo';
import { Schema } from '@/components/Schema';
import { HeroSection } from '@/components/HeroSection';
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
      
      {/* Hero Section - Modern Design with Animations */}
      <HeroSection />

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


