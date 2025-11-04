export const SITE = {
  name: 'محمدامین بزرگانی',
  role: 'برنامه‌نویس و توسعه‌دهنده ارشد وب',
  domain: 'https://www.bozorgani.ir',
  twitter: '@',
  description:
    'نمونه‌کار حرفه‌ای محمدامین بزرگانی؛ توسعه‌دهنده نرم‌افزار با تخصص در Next.js، React و Node.js و تمرکز بر کارایی، دسترس‌پذیری و سئوی فنی.',
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
      images: [{ url: ogImage }]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage]
    }
  } satisfies import('next').Metadata;
}

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE.name,
  jobTitle: SITE.role,
  url: SITE.domain,
  sameAs: [SITE.domain]
};


