import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SITE, createPageMeta } from '@/lib/seo';
import { Schema } from '@/components/Schema';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const metadata: Metadata = createPageMeta({
  title: `نردبان | پلتفرم آموزشی و مشاوره | ${SITE.name}`,
  description: 'طراحی و توسعه کامل وب‌سایت nardeban.ir — پلتفرم آموزشی و مشاوره با تمرکز بر تجربه کاربری، سئوی فنی و سیستم رزرو خدمات. ساخته شده با Next.js و TypeScript.',
  url: `${SITE.domain}/projects/nardeban`,
  image: '/images/nardeban-cover.jpg',
  keywords: ['نردبان', 'پلتفرم آموزشی', 'مشاوره آنلاین', 'Next.js', 'TypeScript', 'سئوی فنی']
});

export default function NardebanProjectPage() {
  const projectSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'نردبان | پلتفرم آموزشی و مشاوره',
    applicationCategory: 'WebApplication',
    operatingSystem: 'All',
    description: 'پلتفرم آموزشی و مشاوره آنلاین با سیستم رزرو خدمات',
    author: { '@type': 'Person', name: SITE.name },
    url: 'https://nardeban.ir'
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'صفحه اصلی', item: SITE.domain },
      { '@type': 'ListItem', position: 2, name: 'پروژه‌ها', item: `${SITE.domain}/projects` },
      { '@type': 'ListItem', position: 3, name: 'نردبان', item: `${SITE.domain}/projects/nardeban` }
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
          { name: 'نردبان' }
        ]}
      />

      {/* هدر پروژه */}
      <header className="rounded-2xl border bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-950">
        <div className="flex flex-col gap-6">
          <div>
            <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
              پلتفرم آموزشی
            </span>
            <h1 id="title" className="mt-3 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              نردبان
            </h1>
            <p className="mt-3 text-xl text-gray-600 dark:text-gray-400">
              پلتفرم آموزشی و مشاوره آنلاین با سیستم رزرو خدمات
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="https://nardeban.ir"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              مشاهده وب‌سایت زنده
            </a>
            <a
              href="https://github.com/bozorgani/nardeban"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900"
            >
              مشاهده کد در گیت‌هاب
            </a>
          </div>
        </div>
      </header>

      {/* تصویر اصلی */}
          <div className="overflow-hidden rounded-2xl border bg-gray-100 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="flex h-[400px] items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                  <span className="text-3xl">🎓</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">تصویر وب‌سایت نردبان</p>
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
                  نردبان یک پلتفرم آموزشی و مشاوره آنلاین است که با هدف ایجاد دسترسی آسان به خدمات مشاوره و دوره‌های آموزشی طراحی و توسعه داده شده است.
                  این پلتفرم شامل سیستم رزرو و نوبت‌دهی هوشمند، پنل مدیریت محتوا، و تجربه کاربری بسیار روان است.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-tight">چالش‌ها و راهکارها</h2>
              <ul className="mt-4 space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600" />
                  <span>طراحی سیستم رزرو و نوبت‌دهی با قابلیت مدیریت زمان‌بندی و جلوگیری از تداخل</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600" />
                  <span>بهینه‌سازی سرعت بارگذاری و امتیاز Core Web Vitals</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600" />
                  <span>پیاده‌سازی سئوی فنی کامل شامل Schema.org برای خدمات و صفحات</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600" />
                  <span>طراحی کاملاً واکنش‌گرا و بهینه برای موبایل و دسکتاپ</span>
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
                <a href="https://nardeban.ir" target="_blank" className="block text-blue-600 hover:underline dark:text-blue-400">
                  https://nardeban.ir
                </a>
                <a href="https://github.com/bozorgani/nardeban" target="_blank" className="block text-blue-600 hover:underline dark:text-blue-400">
                  github.com/bozorgani/nardeban
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
