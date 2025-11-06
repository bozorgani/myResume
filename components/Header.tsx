'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/ThemeToggle';
import { MobileMenu } from '@/components/MobileMenu';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname?.startsWith(href);
  };

  return (
    <>
      <header className="sticky top-0 z-30 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-900/70 dark:supports-[backdrop-filter]:bg-gray-900/50">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3" aria-label="ناوبری اصلی">
          <Link 
            href="/" 
            className="font-semibold text-gray-900 dark:text-gray-100 hover:text-brand transition-colors" 
            aria-label="رفتن به صفحه اصلی"
          >
            M.A. Bozorgani
          </Link>
          
          <div className="flex items-center gap-4">
            {/* Desktop Menu */}
            <ul className="hidden sm:flex items-center gap-6">
              <li>
                <Link 
                  className={`transition-colors hover:text-brand ${
                    isActive('/projects') ? 'text-brand font-medium' : ''
                  }`} 
                  href="/projects"
                >
                  پروژه‌ها
                </Link>
              </li>
              <li>
                <Link 
                  className={`transition-colors hover:text-brand ${
                    isActive('/blog') ? 'text-brand font-medium' : ''
                  }`} 
                  href="/blog"
                >
                  بلاگ
                </Link>
              </li>
              <li>
                <Link 
                  className={`transition-colors hover:text-brand ${
                    isActive('/resume') ? 'text-brand font-medium' : ''
                  }`} 
                  href="/resume"
                >
                  رزومه
                </Link>
              </li>
              <li>
                <Link 
                  className={`transition-colors hover:text-brand ${
                    isActive('/contact') ? 'text-brand font-medium' : ''
                  }`} 
                  href="/contact"
                >
                  تماس
                </Link>
              </li>
            </ul>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="sm:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="باز کردن منو"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <svg
                  className="w-6 h-6 text-gray-600 dark:text-gray-400"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6 text-gray-600 dark:text-gray-400"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMenuOpen} onClose={closeMenu} />
    </>
  );
}

