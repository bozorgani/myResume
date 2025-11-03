import type { Metadata } from 'next';

import { SITE, createPageMeta } from '@/lib/seo';

export const metadata: Metadata = createPageMeta({
  title: `رزومه | ${SITE.name}`,
  description: `رزومه رسمی ${SITE.name} شامل سوابق کاری، تحصیلات و مهارت‌ها در فناوری‌های مدرن توسعه وب.`,
  url: `${SITE.domain}/resume`
});

export default function ResumePage() {
  return (
    <article className="space-y-8" aria-labelledby="resume-title">
      <header>
        <h1 id="resume-title" className="text-3xl font-bold tracking-tight">رزومه</h1>
        <p className="mt-2 text-gray-700">نسخه PDF را دانلود کنید یا نسخه HTML را در ادامه ببینید.</p>
        <div className="mt-3">
          <a className="rounded bg-brand px-4 py-2 font-medium text-white hover:bg-brand-dark" href="/resume.pdf" target="_blank" rel="noopener noreferrer">دانلود PDF</a>
        </div>
      </header>

      {/* گزینه الف: اگر فایل PDF در /public/resume.pdf وجود داشته باشد، با نمایشگر مرورگر باز می‌شود. */}

      {/* گزینه ب: رزومه HTML با ساختار خوب برای سئو و دسترس‌پذیری */}
      <section className="space-y-6" aria-labelledby="experience-title">
        <h2 id="experience-title" className="text-2xl font-semibold">سوابق کاری</h2>
        <div>
          <h3 className="text-lg font-semibold">توسعه‌دهنده فول‌استک ارشد — فریلنس</h3>
          <p className="text-sm text-gray-600">۲۰۲۰ — اکنون</p>
          <ul className="mt-2 list-disc pl-5 text-gray-800">
            <li>طراحی معماری اپلیکیشن‌های Next.js با اولویت سئو و امتیازهای عالی Core Web Vitals.</li>
            <li>رهبری ارزیابی‌های دسترس‌پذیری و پیاده‌سازی کامپوننت‌های سازگار با WCAG.</li>
            <li>طراحی پایپ‌لاین‌های CI/CD و تعریف بودجه‌های عملکرد.</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="education-title">
        <h2 id="education-title" className="text-2xl font-semibold">تحصیلات</h2>
        <p>کارشناسی علوم کامپیوتر</p>
      </section>

      <section className="space-y-4" aria-labelledby="skills-title">
        <h2 id="skills-title" className="text-2xl font-semibold">مهارت‌ها</h2>
        <ul className="flex flex-wrap gap-2">
          {['Next.js', 'React', 'TypeScript', 'Node.js', 'MongoDB', 'Docker', 'TailwindCSS', 'SEO', 'a11y'].map((s) => (
            <li key={s} className="rounded bg-gray-100 px-2 py-0.5 text-sm">{s}</li>
          ))}
        </ul>
      </section>
    </article>
  );
}


