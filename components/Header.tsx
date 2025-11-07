'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/ThemeToggle';

export function Header() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname?.startsWith(href);
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/90 dark:bg-gray-900/95 dark:supports-[backdrop-filter]:bg-gray-900/90 shadow-sm">
        <div className="mx-auto max-w-7xl">
          {/* Logo and Theme Toggle Row */}
          <nav className="flex items-center justify-between px-4 py-3" aria-label="ناوبری اصلی">
            <Link 
              href="/" 
              className="font-semibold text-gray-900 dark:text-gray-100 hover:text-brand transition-colors text-lg" 
              aria-label="رفتن به صفحه اصلی"
            >
              M.A. Bozorgani
            </Link>
            
            <div className="flex items-center gap-4">
              {/* Desktop Menu */}
              <ul className="hidden md:flex items-center gap-6">
                <li>
                  <Link 
                    className={`transition-colors hover:text-brand ${
                      isActive('/projects') ? 'text-brand font-medium' : 'text-gray-700 dark:text-gray-300'
                    }`} 
                    href="/projects"
                  >
                    پروژه‌ها
                  </Link>
                </li>
                <li>
                  <Link 
                    className={`transition-colors hover:text-brand ${
                      isActive('/blog') ? 'text-brand font-medium' : 'text-gray-700 dark:text-gray-300'
                    }`} 
                    href="/blog"
                  >
                    بلاگ
                  </Link>
                </li>
                <li>
                  <Link 
                    className={`transition-colors hover:text-brand ${
                      isActive('/resume') ? 'text-brand font-medium' : 'text-gray-700 dark:text-gray-300'
                    }`} 
                    href="/resume"
                  >
                    رزومه
                  </Link>
                </li>
                <li>
                  <Link 
                    className={`transition-colors hover:text-brand ${
                      isActive('/contact') ? 'text-brand font-medium' : 'text-gray-700 dark:text-gray-300'
                    }`} 
                    href="/contact"
                  >
                    تماس
                  </Link>
                </li>
              </ul>

              {/* Theme Toggle */}
              <ThemeToggle />
            </div>
          </nav>

          {/* Horizontal Scrollable Mobile Menu */}
          <nav 
            className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900" 
            aria-label="ناوبری موبایل"
          >
            <div className="overflow-x-auto scrollbar-hide">
              <ul className="flex items-center gap-1 px-4 py-2 min-w-max">
                <li>
                  <Link
                    href="/"
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                      isActive('/') 
                        ? 'bg-brand text-white shadow-sm' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                    aria-current={isActive('/') ? 'page' : undefined}
                  >
                    <span>🏠</span>
                    <span>خانه</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/projects"
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                      isActive('/projects') 
                        ? 'bg-brand text-white shadow-sm' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                    aria-current={isActive('/projects') ? 'page' : undefined}
                  >
                    <span>💼</span>
                    <span>پروژه‌ها</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                      isActive('/blog') 
                        ? 'bg-brand text-white shadow-sm' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                    aria-current={isActive('/blog') ? 'page' : undefined}
                  >
                    <span>📝</span>
                    <span>بلاگ</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/resume"
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                      isActive('/resume') 
                        ? 'bg-brand text-white shadow-sm' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                    aria-current={isActive('/resume') ? 'page' : undefined}
                  >
                    <span>📄</span>
                    <span>رزومه</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                      isActive('/contact') 
                        ? 'bg-brand text-white shadow-sm' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                    aria-current={isActive('/contact') ? 'page' : undefined}
                  >
                    <span>✉️</span>
                    <span>تماس</span>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}

