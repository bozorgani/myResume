import type { Metadata } from 'next';
import { SITE, createPageMeta } from '@/lib/seo';

export const metadata: Metadata = createPageMeta({
  title: `تماس | ${SITE.name}`,
  description: `برای همکاری در پروژه‌های توسعه وب، مشاوره فنی، یا فرصت‌های شغلی با ${SITE.name} تماس بگیرید. من در زمینه توسعه Full-Stack با Next.js و React، بهینه‌سازی عملکرد وب‌سایت‌ها، و بهبود سئو فنی آماده همکاری هستم.`,
  url: `${SITE.domain}/contact`,
  keywords: [
    'تماس با توسعه‌دهنده',
    'همکاری در پروژه',
    'مشاوره فنی',
    'فرصت شغلی',
    'استخدام توسعه‌دهنده',
    'مشاوره Next.js',
    'مشاوره React'
  ]
});

// اطلاعات تماس
const contactInfo = {
  phone: '09133241104',
  phoneDisplay: '0913 324 1104',
  whatsapp: '+989133241104',
  telegram: 'nima0589',
  instagram: 'webmaster.js'
};

export default function ContactPage() {
  const whatsappUrl = 'https://wa.me/+989133241104';
  const telegramUrl = 'https://t.me/nima0589';
  const instagramUrl = 'https://instagram.com/webmaster.js';
  const phoneUrl = 'tel:+989133241104';

  return (
    <article className="space-y-6 sm:space-y-8" aria-labelledby="contact-title">
      <header className="text-center sm:text-right">
        <h1 id="contact-title" className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
          تماس با من
        </h1>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto sm:mx-0">
          برای همکاری در پروژه‌های توسعه وب، مشاوره فنی، یا فرصت‌های شغلی می‌توانید از طریق راه‌های زیر با من در ارتباط باشید. من در زمینه توسعه Full-Stack، بهینه‌سازی عملکرد، و بهبود سئو فنی آماده همکاری هستم.
        </p>
      </header>

      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Phone */}
        <a
          href={phoneUrl}
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 p-6 sm:p-8 border-2 border-blue-200 dark:border-blue-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-blue-400 dark:hover:border-blue-600"
          aria-label="تماس تلفنی"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/30 dark:bg-blue-700/20 rounded-full blur-2xl"></div>
          <div className="relative flex flex-col items-center text-center gap-4">
            <div className="rounded-full bg-blue-500 p-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">شماره تماس</h3>
              <p className="text-base text-blue-600 dark:text-blue-400 font-medium text-left" dir="ltr">{contactInfo.phoneDisplay}</p>
            </div>
          </div>
        </a>

        {/* WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 p-6 sm:p-8 border-2 border-green-200 dark:border-green-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-green-400 dark:hover:border-green-600"
          aria-label="واتساپ"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-200/30 dark:bg-green-700/20 rounded-full blur-2xl"></div>
          <div className="relative flex flex-col items-center text-center gap-4">
            <div className="rounded-full bg-green-500 p-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">واتساپ</h3>
              <p className="text-base text-green-600 dark:text-green-400 font-medium">ارسال پیام</p>
            </div>
          </div>
        </a>

        {/* Telegram */}
        <a
          href={telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-sky-50 to-sky-100 dark:from-sky-900/30 dark:to-sky-800/30 p-6 sm:p-8 border-2 border-sky-200 dark:border-sky-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-sky-400 dark:hover:border-sky-600"
          aria-label="تلگرام"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-sky-200/30 dark:bg-sky-700/20 rounded-full blur-2xl"></div>
          <div className="relative flex flex-col items-center text-center gap-4">
            <div className="rounded-full bg-sky-500 p-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">تلگرام</h3>
              <p className="text-base text-sky-600 dark:text-sky-400 font-medium">ارسال پیام</p>
            </div>
          </div>
        </a>

        {/* Instagram */}
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-50 to-purple-100 dark:from-pink-900/30 dark:to-purple-800/30 p-6 sm:p-8 border-2 border-pink-200 dark:border-pink-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-pink-400 dark:hover:border-pink-600"
          aria-label="اینستاگرام"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-pink-200/30 dark:bg-pink-700/20 rounded-full blur-2xl"></div>
          <div className="relative flex flex-col items-center text-center gap-4">
            <div className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 p-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">اینستاگرام</h3>
              <p className="text-base text-pink-600 dark:text-pink-400 font-medium">مشاهده پروفایل</p>
            </div>
          </div>
        </a>
      </div>

      {/* Additional Info */}
      <div className="mt-8 text-center sm:text-right">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          همچنین می‌توانید از طریق{' '}
          <a href="mailto:webmaster.js@gmail.com" className="text-brand hover:underline font-medium" dir="ltr">
            ایمیل (webmaster.js@gmail.com)
          </a>
          {' '}یا{' '}
          <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="text-brand hover:underline font-medium">
            LinkedIn
          </a>
          {' '}با من در ارتباط باشید.
        </p>
      </div>
    </article>
  );
}


