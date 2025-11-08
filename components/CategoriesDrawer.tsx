'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface Category {
  slug: string;
  name: string;
  children?: Category[];
}

interface CategoriesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  activeCategory?: string;
}

export function CategoriesDrawer({ isOpen, onClose, categories, activeCategory }: CategoriesDrawerProps) {
  // جلوگیری از اسکرول body وقتی دراور باز است
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

  // بستن دراور با کلیک روی لینک
  const handleLinkClick = () => {
    onClose();
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

      {/* Drawer Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white dark:bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out border-l border-gray-200 dark:border-gray-800 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="منوی دسته‌بندی‌ها"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 flex-shrink-0">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <span>📂</span>
            <span>دسته‌بندی‌ها</span>
          </h2>
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

        {/* Categories List */}
        <nav className="p-4 overflow-y-auto flex-1" aria-label="دسته‌بندی‌های بلاگ">
          <ul className="space-y-2">
            {/* All Categories Link */}
            <li>
              <Link
                href="/blog"
                onClick={handleLinkClick}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 font-medium ${
                  !activeCategory
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md scale-[1.02]'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-[1.01]'
                }`}
                aria-current={!activeCategory ? 'page' : undefined}
              >
                <span className="text-xl flex-shrink-0">📂</span>
                <span className="flex-1">همه مقالات</span>
                {!activeCategory && (
                  <span className="text-sm opacity-75">●</span>
                )}
              </Link>
            </li>

            {/* Category Links with Subcategories */}
            {categories.map((mainCat) => {
              const isMainActive = activeCategory === mainCat.slug;
              const isSubActive = mainCat.children?.some(subCat => subCat.slug === activeCategory);
              const isActive = isMainActive || isSubActive;
              
              return (
                <li key={mainCat.slug} className="space-y-1">
                  {/* Main Category */}
                  <Link
                    href={`/blog?category=${mainCat.slug}`}
                    onClick={handleLinkClick}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 font-medium ${
                      isMainActive
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md scale-[1.02]'
                        : isActive
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-[1.01]'
                    }`}
                    aria-current={isMainActive ? 'page' : undefined}
                  >
                    <span className="text-xl flex-shrink-0">📂</span>
                    <span className="flex-1">{mainCat.name}</span>
                    {isMainActive && (
                      <span className="text-sm opacity-75">●</span>
                    )}
                  </Link>
                  
                  {/* Subcategories */}
                  {mainCat.children && mainCat.children.length > 0 && (
                    <ul className="mr-4 space-y-1">
                      {mainCat.children.map((subCat) => {
                        const isSubActive = activeCategory === subCat.slug;
                        return (
                          <li key={subCat.slug}>
                            <Link
                              href={`/blog?category=${subCat.slug}`}
                              onClick={handleLinkClick}
                              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 text-sm ${
                                isSubActive
                                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md scale-[1.02]'
                                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-[1.01]'
                              }`}
                              aria-current={isSubActive ? 'page' : undefined}
                            >
                              <span className="text-sm flex-shrink-0">•</span>
                              <span className="flex-1">{subCat.name}</span>
                              {isSubActive && (
                                <span className="text-xs opacity-75">●</span>
                              )}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}

