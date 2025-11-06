export const SITE = {
  name: 'محمدامین بزرگانی',
  role: 'توسعه‌دهنده Full-Stack و متخصص سئو فنی',
  domain: 'https://bozorgani.ir',
  twitter: '@bozorgani',
  github: 'https://github.com/bozorgani',
  linkedin: 'https://www.linkedin.com/in/bozorgani/',
  description:
    'محمدامین بزرگانی - توسعه‌دهنده Full-Stack با ۱۰+ سال تجربه در ساخت وب‌اپلیکیشن‌های مدرن با Next.js، React و Node.js. متخصص در بهینه‌سازی عملکرد، بهبود Core Web Vitals، و سئو فنی. مشاوره در زمینه معماری نرم‌افزار، توسعه CMS سفارشی، و راه‌اندازی پروژه‌های استارتاپی.',
  ogImage: '/images/og-default.png'
} as const;

// تولید متادیتای یکپارچه برای هر صفحه شامل Open Graph و Twitter cards
export function createPageMeta({
  title,
  description,
  url,
  image
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
}) {
  const ogImage = image ?? SITE.ogImage;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      type: 'website',
      images: [{ url: ogImage, alt: `${SITE.name} - ${SITE.role}` }]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      site: SITE.twitter,
      creator: SITE.twitter
    },
    // Extra meta for accessibility of previews
    other: {
      'twitter:image:alt': `${SITE.name} - ${SITE.role}`,
      'og:image:alt': `${SITE.name} - ${SITE.role}`
    }
  } satisfies import('next').Metadata;
}

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE.name,
  jobTitle: SITE.role,
  url: SITE.domain,
  sameAs: [SITE.domain, SITE.github, SITE.linkedin]
};


