export const SITE = {
  name: 'محمد امین بزرگانی',
  role: 'توسعه‌دهنده Full-Stack و متخصص سئو فنی',
  domain: 'https://bozorgani.ir',
  twitter: '@bozorgani',
  github: 'https://github.com/bozorgani',
  linkedin: 'https://www.linkedin.com/in/bozorgani/',
  email: 'hello@bozorgani.ir',
  description:
    'محمد امین بزرگانی - توسعه‌دهنده Full-Stack با ۱۰+ سال تجربه در ساخت وب‌اپلیکیشن‌های مدرن با Next.js، React و Node.js. متخصص در بهینه‌سازی عملکرد، بهبود Core Web Vitals، و سئو فنی. مشاوره در زمینه معماری نرم‌افزار، توسعه CMS سفارشی، و راه‌اندازی پروژه‌های استارتاپی.',
  ogImage: '/images/og-default.png',
  keywords: [
    'توسعه Full-Stack',
    'Next.js',
    'React',
    'Node.js',
    'سئو فنی',
    'بهینه‌سازی عملکرد',
    'Core Web Vitals',
    'توسعه وب',
    'JavaScript',
    'TypeScript',
    'MongoDB',
    'توسعه‌دهنده وب',
    'برنامه‌نویس وب',
    'مشاوره فنی',
    'معماری نرم‌افزار'
  ]
} as const;

// تولید متادیتای یکپارچه برای هر صفحه شامل Open Graph و Twitter cards
export function createPageMeta({
  title,
  description,
  url,
  image,
  keywords,
  author,
  publishedTime,
  modifiedTime,
  type = 'website',
  section
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  type?: 'website' | 'article';
  section?: string;
}) {
  const ogImage = image ?? SITE.ogImage;
  const fullImageUrl = ogImage.startsWith('http') ? ogImage : `${SITE.domain}${ogImage}`;
  const fullUrl = url.startsWith('http') ? url : `${SITE.domain}${url}`;
  
  const meta: import('next').Metadata = {
    title,
    description,
    keywords: keywords ? keywords.join(', ') : SITE.keywords.join(', '),
    authors: [{ name: author || SITE.name, url: SITE.domain }],
    alternates: { 
      canonical: fullUrl,
      languages: {
        'fa-IR': fullUrl,
        'x-default': fullUrl
      }
    },
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: SITE.name,
      type: type,
      locale: 'fa_IR',
      images: [{ 
        url: fullImageUrl, 
        alt: `${title} - ${SITE.name}`,
        width: 1200,
        height: 630
      }],
      ...(type === 'article' && publishedTime && {
        publishedTime,
        modifiedTime: modifiedTime || publishedTime,
        authors: [author || SITE.name],
        section: section
      })
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [fullImageUrl],
      site: SITE.twitter,
      creator: SITE.twitter
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    },
    // Extra meta for accessibility of previews
    other: {
      'twitter:image:alt': `${title} - ${SITE.name}`,
      'og:image:alt': `${title} - ${SITE.name}`,
      'article:author': author || SITE.name
    }
  };
  
  return meta;
}

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE.name,
  jobTitle: SITE.role,
  description: SITE.description,
  url: SITE.domain,
  image: `${SITE.domain}/images/amin-bozorgani-portrait.webp`,
  email: SITE.email,
  sameAs: [
    SITE.domain,
    SITE.github,
    SITE.linkedin,
    `https://twitter.com/${SITE.twitter.replace('@', '')}`
  ],
  knowsAbout: [
    'Full-Stack Development',
    'Next.js',
    'React',
    'Node.js',
    'MongoDB',
    'Technical SEO',
    'Core Web Vitals',
    'Web Performance Optimization',
    'JavaScript',
    'TypeScript',
    'Web Development',
    'Software Architecture',
    'CMS Development',
    'API Development'
  ],
  alumniOf: {
    '@type': 'Organization',
    name: 'Software Engineering'
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'IR'
  }
};

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE.name,
  url: SITE.domain,
  logo: `${SITE.domain}/images/og-default.png`,
  description: SITE.description,
  founder: {
    '@type': 'Person',
    name: SITE.name
  },
  sameAs: [
    SITE.github,
    SITE.linkedin,
    `https://twitter.com/${SITE.twitter.replace('@', '')}`
  ]
};


