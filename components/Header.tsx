'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { ThemeToggle } from '@/components/ThemeToggle';

export function Header() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname?.startsWith(href);
  };

  const navItems = [
    { href: '/projects', label: 'پروژه‌ها', emoji: '💼' },
    { href: '/blog', label: 'بلاگ', emoji: '📝' },
    { href: '/resume', label: 'رزومه', emoji: '📄' },
    { href: '/contact', label: 'تماس', emoji: '✉️' },
  ];

  const mobileNavItems = [
    { href: '/', label: 'خانه', emoji: '🏠' },
    ...navItems,
  ];

  return (
    <>
      <motion.header 
        className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/90 dark:bg-gray-900/95 dark:supports-[backdrop-filter]:bg-gray-900/90 shadow-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="mx-auto max-w-7xl">
          {/* Logo and Theme Toggle Row */}
          <nav className="flex items-center justify-between px-4 sm:px-6 py-3" aria-label="ناوبری اصلی">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/" 
                className="font-semibold text-gray-900 dark:text-gray-100 hover:text-brand transition-colors text-base sm:text-lg" 
                aria-label="رفتن به صفحه اصلی"
              >
                <span className="hidden sm:inline">M.A. Bozorgani</span>
                <span className="sm:hidden">M.A.B.</span>
              </Link>
            </motion.div>
            
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Desktop Menu */}
              <ul className="hidden md:flex items-center gap-6">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link 
                      className={`relative transition-colors hover:text-brand ${
                        isActive(item.href) ? 'text-brand font-medium' : 'text-gray-700 dark:text-gray-300'
                      }`} 
                      href={item.href}
                    >
                      {item.label}
                      {isActive(item.href) && (
                        <motion.div
                          className="absolute -bottom-1 right-0 left-0 h-0.5 bg-brand"
                          layoutId="activeTab"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </Link>
                  </motion.li>
                ))}
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
                {mobileNavItems.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        href={item.href}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                          isActive(item.href) 
                            ? 'bg-brand text-white shadow-sm' 
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                        aria-current={isActive(item.href) ? 'page' : undefined}
                      >
                        <span>{item.emoji}</span>
                        <span>{item.label}</span>
                      </Link>
                    </motion.div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </motion.header>
    </>
  );
}

