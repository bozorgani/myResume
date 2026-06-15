import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE, createPageMeta } from '@/lib/seo';
import { Schema } from '@/components/Schema';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const metadata: Metadata = createPageMeta({
  title: `بفروش | پلتفرم فروشگاه‌ساز آنلاین | ${SITE.name}`,
  description: 'طراحی و توسعه کامل وب‌سایت befrosh.ir — پلتفرم فروشگاه‌ساز آنلاین مدرن با تمرکز بر تجربه کاربری، سئوی فنی و بهینه‌سازی نرخ تبدیل. ساخته شده با Next.js و TypeScript.',
  url: `${SITE.domain}/projects/befrosh-ecommerce`,
  image: '/images/befrosh-cover.jpg',
  keywords: ['بفروش', 'فروشگاه‌ساز', 'فروشگاه آنلاین', 'Next.js', 'TypeScript', 'سئوی فنی', 'تجارت الکترونیک']
});

export default function BefroshProjectPage() {
  const projectSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'بفروش | پلتفرم فروشگاه‌ساز آنلاین',
    applicationCategory: 'WebApplication',
    operatingSystem: 'All',
    description: 'پلتفرم فروشگاه‌ساز آنلاین با قابلیت‌های پیشرفته سئو و تجربه کاربری',
    author: { '@type': 'Person', name: SITE.name },
    url: 'https://befrosh.ir'
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'صفحه اصلی', item: SITE.domain },
      { '@type': 'ListItem', position: 2, name: 'پروژه‌ها', item: `${SITE.domain}/projects` },
      { '@type': 'ListItem', position: 3, name: 'بفروش', item: `${SITE.domain}/projects/befrosh-ecommerce` }
    ]
  };

  return (
    <article className="space-y-12" aria-labelledby="title">
      <Schema json={projectSchema} />
      <Schema json={breadcrumbSchema} />

      <Breadcrumbs
        items={[
          { name: 'صفحه اصلی', href: '/' },
          { name: 'پروژه‌ها', href: '/projects' },
          { name: 'بفروش' }
        ]}
      />

      {/* هدر پروژه */}
      <header className="rounded-2xl border bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-950">
        <div className="flex flex-col gap-6">
          <div>
            <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
              فروشگاه‌ساز
            </span>
            <h1 id="title" className="mt-3 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              بفروش
            </h1>
            <p className="mt-3 text-xl text-gray-600 dark:text-gray-400">
              پلتفرم فروشگاه‌ساز آنلاین مدرن با تمرکز بر تجربه کاربری و سئوی فنی
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="https://befrosh.ir"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              مشاهده وب‌سایت زنده
            </a>
            <a
              href="https://github.com/bozorgani/befrosh"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900"
            >
              مشاهده کد در گیت‌هاب
            </a>
          </div>
        </div>
      </header>

      {/* تصویر اصلی (Placeholder) */}
      <div className="overflow-hidden rounded-2xl border bg-gray-100 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="flex h-[400px] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
              <span className="text-3xl">🛒</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">تصویر وب‌سایت بفروش</p>
          </div>
        </div>
      </div>

      {/* بخش توضیحات */}
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold tracking-tight">درباره پروژه</h2>
              <div className="prose prose-gray mt-4 max-w-none text-gray-700 dark:prose-invert dark:text-gray-300">
                <p>
                  بفروش یک پلتفرم فروشگاه‌ساز آنلاین کامل است که به کاربران امکان می‌دهد بدون نیاز به دانش فنی، فروشگاه اینترنتی حرفه‌ای خود را راه‌اندازی کنند.
                  این پروژه شامل طراحی رابط کاربری مدرن، سیستم مدیریت فروشگاه، بهینه‌سازی سرعت و عملکرد، و پیاده‌سازی بهترین شیوه‌های سئو فنی است.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-tight">چالش‌ها و راهکارها</h2>
              <ul className="mt-4 space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-600" />
                  <span>طراحی تجربه کاربری ساده و قدرتمند برای کاربران غیرتخصصی</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-600" />
                  <span>بهینه‌سازی Core Web Vitals و سرعت بارگذاری صفحات فروشگاه</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-600" />
                  <span>پیاده‌سازی سئوی فنی پیشرفته شامل Schema.org برای محصولات و صفحات</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-600" />
                  <span>طراحی کاملاً واکنش‌گرا و بهینه برای تمام دستگاه‌ها</span>
                </li>
              </ul>
            </section>
          </div>
        </div>

        {/* سایدبار اطلاعات */}
        <div className="lg:col-span-5">
          <div className="sticky top-8 space-y-8 rounded-2xl border p-6 dark:border-gray-800">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">فناوری‌ها</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {['Next.js', 'TypeScript', 'TailwindCSS', 'React', 'SEO'].map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-700 dark:bg-gray-900 dark:text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">لینک‌ها</h3>
              <div className="mt-3 space-y-2 text-sm">
                <a href="https://befrosh.ir" target="_blank" className="block text-emerald-600 hover:underline dark:text-emerald-400">
                  https://befrosh.ir
                </a>
                <a href="https://github.com/bozorgani/befrosh" target="_blank" className="block text-emerald-600 hover:underline dark:text-emerald-400">
                  github.com/bozorgani/befrosh
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* دکمه بازگشت */}
      <div className="pt-8 text-center">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          ← بازگشت به لیست پروژه‌ها
        </Link>
      </div>
    </article>
  );
}
