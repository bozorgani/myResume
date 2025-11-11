import Link from 'next/link';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-4">
          <div className="sm:col-span-2 space-y-3">
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">محمد امین بزرگانی</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">توسعه‌دهنده ارشد وب با تمرکز بر Next.js، React و Node.js</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">صفحات</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link className="hover:text-brand" href="/projects">پروژه‌ها</Link></li>
              <li><Link className="hover:text-brand" href="/blog">بلاگ</Link></li>
              <li><Link className="hover:text-brand" href="/resume">رزومه</Link></li>
              <li><Link className="hover:text-brand" href="/contact">تماس</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">شبکه‌های اجتماعی</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a className="hover:text-brand" href="https://github.com/bozorgani" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a className="hover:text-brand" href="https://www.linkedin.com/in/bozorgani" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a className="hover:text-brand" href="mailto:hello@bozorgani.ir">Email</a></li>
              <li><a className="hover:text-brand" href="/feed.xml" rel="alternate" type="application/rss+xml" title="RSS Feed">RSS Feed</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 border-t pt-6 text-xs text-gray-600 dark:text-gray-400">
          <p>© {year} تمامی حقوق محفوظ است.</p>
          <p>
            ساخته‌شده با <span aria-label="قلب" role="img">❤️</span> و Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}


