import { SITE } from '@/lib/seo';

export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="rounded-lg border p-6 space-y-4 dark:border-gray-800">
      <h2 id="about-title" className="text-xl font-semibold">درباره من</h2>
      <div className="space-y-4 text-gray-700 dark:text-gray-300">
        <p>
          من محمد امین بزرگانی، یک توسعه‌دهنده Full-Stack با بیش از ۱۰ سال تجربه در ساخت و توسعه وب‌اپلیکیشن‌های مدرن و مقیاس‌پذیر هستم. تخصص اصلی من در استفاده از تکنولوژی‌های مدرن JavaScript شامل React، Next.js و Node.js برای ساخت محصولات دیجیتالی با عملکرد بالا و تجربه کاربری عالی است.
        </p>
        <p>
          در طول سال‌های فعالیت حرفه‌ای، تمرکز ویژه‌ای بر بهینه‌سازی عملکرد، بهبود سئو فنی، و دسترس‌پذیری وب‌سایت‌ها داشته‌ام. من در طراحی معماری نرم‌افزار، پیاده‌سازی سیستم‌های مدیریت محتوا (CMS)، و بهینه‌سازی Core Web Vitals تخصص دارم. همچنین در زمینه مشاوره فنی و راه‌اندازی پروژه‌های استارتاپی تجربه فراوانی دارم.
        </p>
        <p>
          هدف من ساخت محصولات دیجیتالی است که نه تنها از نظر فنی عالی باشند، بلکه برای موتورهای جستجو بهینه شده و تجربه کاربری بی‌نظیری ارائه دهند. من معتقد هستم که ترکیب تکنولوژی‌های مدرن با بهترین شیوه‌های سئو و UX می‌تواند به موفقیت پروژه‌ها کمک شایانی کند.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-md bg-gray-50 p-4 dark:bg-gray-900">
          <div className="text-2xl font-bold">10+</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">سال تجربه حرفه‌ای در توسعه وب</div>
        </div>
        <div className="rounded-md bg-gray-50 p-4 dark:bg-gray-900">
          <div className="text-2xl font-bold">Full-Stack</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">React, Next.js, Node.js, MongoDB</div>
        </div>
        <div className="rounded-md bg-gray-50 p-4 dark:bg-gray-900">
          <div className="text-2xl font-bold">SEO Expert</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">بهینه‌سازی فنی و Core Web Vitals</div>
        </div>
      </div>
    </section>
  );
}


