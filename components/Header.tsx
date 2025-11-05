import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';

export function Header() {
  return (
    <header className="border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-900/70 dark:supports-[backdrop-filter]:bg-gray-900/50">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3" aria-label="ناوبری اصلی">
        <Link href="/" className="font-semibold text-gray-900 dark:text-gray-100" aria-label="رفتن به صفحه اصلی">
          M.A. Bozorgani
        </Link>
        <div className="flex items-center gap-4">
          <ul className="hidden sm:flex items-center gap-6">
            <li><Link className="hover:text-brand" href="/projects">پروژه‌ها</Link></li>
            <li><Link className="hover:text-brand" href="/blog">بلاگ</Link></li>
            <li><Link className="hover:text-brand" href="/resume">رزومه</Link></li>
            <li><Link className="hover:text-brand" href="/contact">تماس</Link></li>
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}

