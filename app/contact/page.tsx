import type { Metadata } from 'next';
import { SITE, createPageMeta } from '@/lib/seo';

export const metadata: Metadata = createPageMeta({
  title: `تماس | ${SITE.name}`,
  description: `برای همکاری، مشاوره یا فرصت‌های شغلی با ${SITE.name} تماس بگیرید.`,
  url: `${SITE.domain}/contact`
});

export default function ContactPage() {
  const mailto = `mailto:hello@bozorgani.ir`;
  return (
    <article className="space-y-6" aria-labelledby="contact-title">
      <header>
        <h1 id="contact-title" className="text-3xl font-bold tracking-tight">تماس</h1>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          برای همکاری در پروژه‌های توسعه وب، مشاوره فنی، یا فرصت‌های شغلی می‌توانید از طریق فرم زیر با من تماس بگیرید یا مستقیماً به آدرس ایمیل من پیام بفرستید. من در زمینه توسعه Full-Stack، بهینه‌سازی عملکرد، و بهبود سئو فنی آماده همکاری هستم.
        </p>
      </header>

      <form action={mailto} method="post" className="max-w-xl space-y-4" aria-describedby="contact-help">
        <p id="contact-help" className="text-sm text-gray-600">این فرم برنامه ایمیل شما را برای ارسال پیام باز می‌کند.</p>
        <div>
          <label htmlFor="name" className="block text-sm font-medium">نام</label>
          <input id="name" name="name" required className="mt-1 w-full rounded border px-3 py-2" autoComplete="name" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">ایمیل</label>
          <input id="email" name="email" type="email" required className="mt-1 w-full rounded border px-3 py-2" autoComplete="email" />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium">پیام</label>
          <textarea id="message" name="body" required rows={6} className="mt-1 w-full rounded border px-3 py-2" />
        </div>
        <div className="flex items-center gap-3">
          <button type="submit" className="rounded bg-brand px-4 py-2 font-medium text-white hover:bg-brand-dark">باز کردن ایمیل</button>
          <a href={mailto} className="text-brand hover:underline">یا مستقیم ایمیل بزنید</a>
        </div>
      </form>
    </article>
  );
}


