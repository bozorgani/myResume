import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE, createPageMeta } from '@/lib/seo';
import { Schema } from '@/components/Schema';

export const metadata: Metadata = createPageMeta({
  title: `صفحه پیدا نشد (404) | ${SITE.name}`,
  description: `صفحه‌ای که دنبالش هستید وجود ندارد یا منتقل شده است. به صفحه اصلی بازگردید یا از منوی سایت استفاده کنید.`,
  url: `${SITE.domain}/404`,
  robots: 'noindex, follow' // Don't index 404 pages
});

export default function NotFound() {
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `صفحه پیدا نشد (404)`,
    url: `${SITE.domain}/404`,
    description: 'صفحه‌ای که دنبالش هستید وجود ندارد یا منتقل شده است.',
    inLanguage: 'fa-IR',
    isPartOf: {
      '@type': 'WebSite',
      name: SITE.name,
      url: SITE.domain
    }
  } as const;

  return (
    <div className="space-y-6 sm:space-y-8 max-w-2xl mx-auto text-center">
      <Schema json={webPageSchema} />
      <div className="space-y-4 sm:space-y-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          ۴۰۴
        </h1>
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-gray-200">
          صفحه پیدا نشد
        </h2>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          صفحه‌ای که دنبالش هستید وجود ندارد یا منتقل شده است. ممکن است آدرس اشتباه باشد یا صفحه حذف شده باشد.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-4">
          <Link 
            href="/" 
            className="inline-flex items-center justify-center rounded-lg bg-brand px-6 py-3 font-medium text-white hover:bg-brand-dark transition-colors shadow-lg hover:shadow-xl"
          >
            بازگشت به صفحه اصلی
          </Link>
          <Link 
            href="/blog" 
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 dark:border-gray-700 px-6 py-3 font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            مشاهده بلاگ
          </Link>
          <Link 
            href="/projects" 
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 dark:border-gray-700 px-6 py-3 font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            مشاهده پروژه‌ها
          </Link>
        </div>
      </div>
    </div>
  );
}


