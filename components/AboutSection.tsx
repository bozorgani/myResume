import { SITE } from '@/lib/seo';

export function AboutSection() {
  return (
    <section 
      id="about" 
      aria-labelledby="about-title" 
      className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 md:p-10 lg:p-12 shadow-lg"
      itemScope
      itemType="https://schema.org/Person"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100/50 to-indigo-100/50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="relative space-y-6">
        <div className="space-y-2">
          <h2 id="about-title" className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            درباره من
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-brand to-indigo-500 rounded-full"></div>
        </div>

        <div className="space-y-5 text-lg text-gray-700 dark:text-gray-300 leading-relaxed" itemProp="description">
          <p>
            من <strong itemProp="name">{SITE.name}</strong>، یک توسعه‌دهنده Full-Stack با بیش از <strong>۱۰ سال تجربه</strong> در ساخت و توسعه وب‌اپلیکیشن‌های مدرن و مقیاس‌پذیر هستم. تخصص اصلی من در استفاده از تکنولوژی‌های مدرن JavaScript شامل React، Next.js و Node.js برای ساخت محصولات دیجیتالی با عملکرد بالا و تجربه کاربری عالی است.
          </p>
          <p>
            در طول سال‌های فعالیت حرفه‌ای، تمرکز ویژه‌ای بر بهینه‌سازی عملکرد، بهبود سئو فنی، و دسترس‌پذیری وب‌سایت‌ها داشته‌ام. من در طراحی معماری نرم‌افزار، پیاده‌سازی سیستم‌های مدیریت محتوا (CMS)، و بهینه‌سازی Core Web Vitals تخصص دارم. همچنین در زمینه مشاوره فنی و راه‌اندازی پروژه‌های استارتاپی تجربه فراوانی دارم.
          </p>
          <p>
            هدف من ساخت محصولات دیجیتالی است که نه تنها از نظر فنی عالی باشند، بلکه برای موتورهای جستجو بهینه شده و تجربه کاربری بی‌نظیری ارائه دهند. من معتقد هستم که ترکیب تکنولوژی‌های مدرن با بهترین شیوه‌های سئو و UX می‌تواند به موفقیت پروژه‌ها کمک شایانی کند.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3 pt-4">
          <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 p-4 sm:p-6 border border-blue-100 dark:border-blue-800/50 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
            <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-blue-200/30 dark:bg-blue-800/20 rounded-full blur-2xl"></div>
            <div className="relative">
              <div className="text-3xl sm:text-4xl font-bold text-brand dark:text-blue-400 mb-1 sm:mb-2">10+</div>
              <div className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">سال تجربه حرفه‌ای در توسعه وب</div>
            </div>
          </div>
          
          <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 p-4 sm:p-6 border border-purple-100 dark:border-purple-800/50 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
            <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-purple-200/30 dark:bg-purple-800/20 rounded-full blur-2xl"></div>
            <div className="relative">
              <div className="text-2xl sm:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-1 sm:mb-2">Full-Stack</div>
              <div className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">React, Next.js, Node.js, MongoDB</div>
            </div>
          </div>
          
          <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 p-4 sm:p-6 border border-green-100 dark:border-green-800/50 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
            <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-green-200/30 dark:bg-green-800/20 rounded-full blur-2xl"></div>
            <div className="relative">
              <div className="text-2xl sm:text-4xl font-bold text-green-600 dark:text-green-400 mb-1 sm:mb-2">SEO Expert</div>
              <div className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">بهینه‌سازی فنی و Core Web Vitals</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


