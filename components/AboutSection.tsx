import { SITE } from '@/lib/seo';

export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="rounded-lg border p-6 space-y-4 dark:border-gray-800">
      <h2 id="about-title" className="text-xl font-semibold">درباره من</h2>
      <p className="text-gray-700 dark:text-gray-300">
        {SITE.description}
      </p>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-md bg-gray-50 p-4 dark:bg-gray-900">
          <div className="text-2xl font-bold">10+</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">سال تجربه حرفه‌ای</div>
        </div>
        <div className="rounded-md bg-gray-50 p-4 dark:bg-gray-900">
          <div className="text-2xl font-bold">Full-Stack</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">React, Next.js, Node.js</div>
        </div>
        <div className="rounded-md bg-gray-50 p-4 dark:bg-gray-900">
          <div className="text-2xl font-bold">اهداف</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">ساخت محصولات مقیاس‌پذیر با تمرکز بر سئو</div>
        </div>
      </div>
    </section>
  );
}


