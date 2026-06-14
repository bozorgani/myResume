'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

type Route = '/' | '/about-mohammad-amin-bozorgani' | '/projects' | '/blog' | '/resume' | '/contact';

interface MenuItem {
  href: Route;
  label: string;
  icon: string;
}

const menuItems: MenuItem[] = [
  { href: '/', label: 'خانه', icon: '🏠' },
  { href: '/about-mohammad-amin-bozorgani', label: 'درباره من', icon: '👤' },
  { href: '/projects', label: 'پروژه‌ها', icon: '💼' },
  { href: '/blog', label: 'بلاگ', icon: '📝' },
  { href: '/resume', label: 'رزومه', icon: '📄' },
  { href: '/contact', label: 'تماس', icon: '✉️' }
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  // بستن منو با کلیک روی backdrop
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // بستن منو با کلیک روی لینک
  const handleLinkClick = () => {
    onClose();
  };

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname?.startsWith(href);
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white dark:bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out border-l border-gray-200 dark:border-gray-800 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="منوی موبایل"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">منو</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="بستن منو"
          >
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
          </button>
        </div>

        {/* Menu Items */}
        <nav className="p-4 overflow-y-auto" aria-label="ناوبری موبایل">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={handleLinkClick}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-lg transition-all duration-200 font-medium ${
                      active
                        ? 'bg-brand text-white shadow-md scale-[1.02]'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-[1.01]'
                    }`}
                    aria-current={active ? 'page' : undefined}
                  >
                    <span className="text-xl flex-shrink-0">{item.icon}</span>
                    <span className="flex-1">{item.label}</span>
                    {active && (
                      <span className="text-sm opacity-75">●</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
          <p className="text-xs text-center text-gray-500 dark:text-gray-400">
            M.A. Bozorgani
          </p>
        </div>
      </div>
    </>
  );
}

