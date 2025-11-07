import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Vazirmatn } from 'next/font/google';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SITE, personSchema, organizationSchema } from '@/lib/seo';
import { Schema } from '@/components/Schema';
import { DevAxe } from '@/components/DevAxe';
import { ThemeScript } from '@/components/ThemeScript';

// متادیتای سراسری با الگوی عنوان برای برندسازی یکپارچه در تمام صفحات
export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default: `${SITE.name} | ${SITE.role}`,
    template: `%s | ${SITE.name} - ${SITE.role}`
  },
  description: SITE.description,
  alternates: { canonical: SITE.domain },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/images/og-default.png', type: 'image/png', sizes: '512x512' }
    ],
    apple: [
      { url: '/images/og-default.png', type: 'image/png', sizes: '512x512' }
    ],
    shortcut: '/favicon.ico'
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: `${SITE.name} - ${SITE.role}`,
    description: SITE.description,
    url: SITE.domain,
    siteName: SITE.name,
    locale: 'fa_IR',
    type: 'website',
    images: [{ url: SITE.ogImage, alt: `${SITE.name} - ${SITE.role}` }]
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} - ${SITE.role}`,
    description: SITE.description,
    images: [SITE.ogImage],
    site: SITE.twitter,
    creator: SITE.twitter
  },
  verification: {
    google: 'XeFvCtZt5MKDwcNWELRzeIOcAT5gCYPlR0gvO5Ys6EI'
  },
  keywords: [...SITE.keywords],
  authors: [{ name: SITE.name, url: SITE.domain }],
  creator: SITE.name,
  publisher: SITE.name
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#030712' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' }
  ]
};

// بهینه‌سازی فونت برای لود سریع‌تر
const vazirmatn = Vazirmatn({ 
  subsets: ['arabic', 'latin'],
  display: 'swap', // نمایش فونت fallback تا زمان لود فونت اصلی
  preload: true, // پیش‌لود فونت برای سریع‌تر شدن
  weight: ['400', '500', '600', '700'], // فقط وزن‌های مورد استفاده
  variable: '--font-vazirmatn', // برای استفاده به عنوان CSS variable
  adjustFontFallback: true, // بهبود fallback font
  fallback: ['system-ui', 'arial'], // فونت‌های fallback سریع
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.domain,
    inLanguage: 'fa-IR',
    description: SITE.description,
    publisher: {
      '@type': 'Person',
      name: SITE.name,
      url: SITE.domain
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE.domain}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  } as const;
  return (
    <html lang="fa" dir="rtl" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Font optimization - Next.js automatically handles font loading */}
        <ThemeScript />
      </head>
      <body className={`antialiased bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 ${vazirmatn.className}`}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:right-2 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:shadow">پرش به محتوای اصلی</a>
        {process.env.NODE_ENV === 'development' && <DevAxe />}
        {/* Schema برای شناسایی شخص و سازمان توسط موتورهای جستجو */}
        <Schema json={personSchema} />
        <Schema json={organizationSchema} />
        <Schema json={webSiteSchema} />
        <Header />
        <main id="main-content" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10 w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}


