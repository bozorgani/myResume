import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SITE, personSchema } from '@/lib/seo';
import { Schema } from '@/components/Schema';
import { DevAxe } from '@/components/DevAxe';

// Global metadata with title template ensures consistent branding across pages
export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default: `${SITE.name} | ${SITE.role}`,
    template: `%s | ${SITE.name} - ${SITE.role}`
  },
  description: SITE.description,
  alternates: { canonical: SITE.domain },
  openGraph: {
    title: `${SITE.name} - ${SITE.role}`,
    description: SITE.description,
    url: SITE.domain,
    siteName: SITE.name,
    type: 'website',
    images: [{ url: SITE.ogImage }]
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} - ${SITE.role}`,
    description: SITE.description,
    images: [SITE.ogImage]
  }
};

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`antialiased ${inter.className}`}>
        <DevAxe />
        {/* Person schema is placed globally so search engines understand the entity */}
        <Schema json={personSchema} />
        <Header />
        <main id="main-content" className="mx-auto max-w-5xl px-4 py-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}


