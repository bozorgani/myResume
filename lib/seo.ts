export const SITE = {
  name: 'Mohammad Amin Bozorgani',
  role: 'Full Stack Developer',
  domain: 'https://bozorgani.ir',
  twitter: '@',
  description:
    'A professional portfolio showcasing the projects and expertise of Mohammad Amin Bozorgani, a software developer specializing in Next.js, React, and Node.js.',
  ogImage: '/images/og-default.png'
} as const;

// Generates consistent metadata per page including Open Graph and Twitter cards
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


