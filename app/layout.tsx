import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Vazirmatn } from 'next/font/google';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SITE, personSchema } from '@/lib/seo';
import { Schema } from '@/components/Schema';
import { DevAxe } from '@/components/DevAxe';

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
      { url: '/favicon.ico' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' }
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }]
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: `${SITE.name} - ${SITE.role}`,
    description: SITE.description,
    url: SITE.domain,
    siteName: SITE.name,
    locale: 'fa_IR',
    type: 'website',
    images: [{ url: SITE.ogImage }]
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} - ${SITE.role}`,
    description: SITE.description,
    images: [SITE.ogImage]
  },
  verification: {}
};

export const viewport: Viewport = {
  themeColor: '#0ea5e9'
};

const vazirmatn = Vazirmatn({ subsets: ['arabic'], display: 'swap' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.domain,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE.domain}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  } as const;
  return (
    <html lang="fa" dir="rtl" className="scroll-smooth">
      <body className={`antialiased ${vazirmatn.className}`}>
        <DevAxe />
        {/* Schema برای شناسایی شخص توسط موتورهای جستجو */}
        <Schema json={personSchema} />
        <Schema json={webSiteSchema} />
        <Header />
        <main id="main-content" className="mx-auto max-w-5xl px-4 py-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}


