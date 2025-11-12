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
      {/* Backdrop with smooth fade */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-md z-40 transition-opacity duration-300 ease-out ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel with modern design */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ease-out flex flex-col border-l border-gray-200/50 dark:border-gray-700/50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="منوی دسته‌بندی‌ها"
      >
        {/* Modern Header with Gradient */}
        <div className="relative flex items-center justify-between p-5 pb-4 flex-shrink-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 dark:from-blue-700 dark:via-purple-700 dark:to-blue-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <span className="text-2xl">📂</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">دسته‌بندی‌ها</h2>
              <p className="text-xs text-white/80">{categories.length} دسته اصلی</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-200 hover:scale-110 active:scale-95"
            aria-label="بستن منو"
          >
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Categories List with smooth scroll */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar" aria-label="دسته‌بندی‌های بلاگ">
          <ul className="space-y-2">
            {/* All Categories Link */}
            <li>
              <Link
                href="/blog"
                onClick={handleLinkClick}
                className={`group flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 font-semibold relative overflow-hidden ${
                  !activeCategory
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30 scale-[1.02]'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-50 dark:hover:from-gray-800 dark:hover:to-gray-700 hover:shadow-md hover:scale-[1.01]'
                }`}
                aria-current={!activeCategory ? 'page' : undefined}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                  !activeCategory
                    ? 'bg-white/20'
                    : 'bg-gray-100 dark:bg-gray-800 group-hover:bg-gray-200 dark:group-hover:bg-gray-700'
                }`}>
                  <span className="text-lg">📂</span>
                </div>
                <span className="flex-1">همه مقالات</span>
                {!activeCategory && (
                  <div className="w-2 h-2 rounded-full bg-white/80 animate-pulse"></div>
                )}
              </Link>
            </li>

            {/* Category Links with Subcategories */}
            {categories.map((mainCat) => {
              const isMainActive = activeCategory === mainCat.slug;
              const isSubActive = mainCat.children?.some(subCat => subCat.slug === activeCategory);
              const isActive = isMainActive || isSubActive;
              
              return (
                <li key={mainCat.slug} className="space-y-2">
                  {/* Main Category */}
                  <Link
                    href={`/blog?category=${mainCat.slug}`}
                    onClick={handleLinkClick}
                    className={`group flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 font-semibold relative ${
                      isMainActive
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30 scale-[1.02]'
                        : isActive
                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-50 dark:hover:from-gray-800 dark:hover:to-gray-700 hover:shadow-md hover:scale-[1.01]'
                    }`}
                    aria-current={isMainActive ? 'page' : undefined}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                      isMainActive
                        ? 'bg-white/20'
                        : isActive
                        ? 'bg-blue-100 dark:bg-blue-900/50'
                        : 'bg-gray-100 dark:bg-gray-800 group-hover:bg-gray-200 dark:group-hover:bg-gray-700'
                    }`}>
                      <span className="text-lg">📂</span>
                    </div>
                    <span className="flex-1">{mainCat.name}</span>
                    {mainCat.children && mainCat.children.length > 0 && (
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        isMainActive
                          ? 'bg-white/20 text-white'
                          : isActive
                          ? 'bg-blue-200 dark:bg-blue-800 text-blue-700 dark:text-blue-300'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                      }`}>
                        {mainCat.children.length}
                      </span>
                    )}
                    {isMainActive && (
                      <div className="w-2 h-2 rounded-full bg-white/80 animate-pulse"></div>
                    )}
                  </Link>
                  
                  {/* Subcategories with indentation */}
                  {mainCat.children && mainCat.children.length > 0 && (
                    <ul className="mr-6 space-y-1.5 border-r-2 border-gray-200 dark:border-gray-700 pr-2">
                      {mainCat.children.map((subCat) => {
                        const isSubActive = activeCategory === subCat.slug;
                        return (
                          <li key={subCat.slug}>
                            <Link
                              href={`/blog?category=${subCat.slug}`}
                              onClick={handleLinkClick}
                              className={`group flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${
                                isSubActive
                                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md shadow-blue-500/30 scale-[1.02]'
                                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200 hover:scale-[1.01]'
                              }`}
                              aria-current={isSubActive ? 'page' : undefined}
                            >
                              <div className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                                isSubActive
                                  ? 'bg-white'
                                  : 'bg-gray-400 dark:bg-gray-600 group-hover:bg-blue-500'
                              }`}></div>
                              <span className="flex-1">{subCat.name}</span>
                              {isSubActive && (
                                <div className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse"></div>
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

