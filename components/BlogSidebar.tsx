'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Category {
  slug: string;
  name: string;
  children?: Category[];
}

interface BlogSidebarProps {
  categories: Category[];
}

export function BlogSidebar({ categories }: BlogSidebarProps) {
  const searchParams = useSearchParams();
  const activeCategory = searchParams?.get('category') || null;
  
  // Track which categories are expanded
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(() => {
    const expanded = new Set<string>();
    if (activeCategory) {
      // Find which main category contains the active category
      categories.forEach(cat => {
        if (cat.slug === activeCategory || cat.children?.some(child => child.slug === activeCategory)) {
          expanded.add(cat.slug);
        }
      });
    }
    // Always expand first category if no active category and it has children
    if (!activeCategory && categories.length > 0 && categories[0].children && categories[0].children.length > 0) {
      expanded.add(categories[0].slug);
    }
    return expanded;
  });

  // Update expanded categories when activeCategory changes
  useEffect(() => {
    if (activeCategory) {
      categories.forEach(cat => {
        if (cat.slug === activeCategory || cat.children?.some(child => child.slug === activeCategory)) {
          setExpandedCategories(prev => new Set(prev).add(cat.slug));
        }
      });
    }
  }, [activeCategory, categories]);

  const toggleCategory = (slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(slug)) {
        newSet.delete(slug);
      } else {
        newSet.add(slug);
      }
      return newSet;
    });
  };

  return (
    <aside className="hidden lg:block lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto custom-scrollbar">
      <div className="rounded-2xl border-2 border-gray-200/80 dark:border-gray-800/80 bg-gradient-to-br from-white/95 via-gray-50/95 to-white/95 dark:from-gray-900/95 dark:via-gray-950/95 dark:to-gray-900/95 backdrop-blur-sm shadow-xl dark:shadow-2xl p-5 space-y-4 hover:shadow-2xl transition-shadow duration-300">
        {/* Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-800">
          <motion.div 
            className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 shadow-lg"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <span className="text-xl block">📚</span>
          </motion.div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">دسته‌بندی‌ها</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">انتخاب دسته مورد نظر</p>
          </div>
        </div>

        {/* All Categories Button */}
        <div>
          <Link
            href="/blog"
            className={`group relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition-all duration-300 ${
              !activeCategory
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {!activeCategory && (
              <motion.div
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"
                layoutId="activeCategoryBackground"
              />
            )}
            <span className={`text-base relative z-10 flex-shrink-0 transition-transform duration-300 ${!activeCategory ? 'scale-110' : 'group-hover:scale-110 group-hover:rotate-12'}`}>
              📂
            </span>
            <span className="flex-1 font-semibold text-sm relative z-10 text-right">همه مقالات</span>
            {!activeCategory && (
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-white relative z-10 flex-shrink-0"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </Link>
        </div>

        {/* Categories List */}
        <div className="space-y-2">
          {categories.map((category, index) => {
            const isActive = activeCategory === category.slug;
            const hasActiveChild = category.children?.some(child => child.slug === activeCategory);
            const isExpanded = expandedCategories.has(category.slug);
            const hasChildren = category.children && category.children.length > 0;

            return (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03, duration: 0.2 }}
                className="space-y-1.5"
              >
                {/* Main Category */}
                <div className="flex items-center gap-2">
                  <Link
                    href={`/blog?category=${category.slug}`}
                    className={`group relative flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 flex-1 min-w-0 ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30'
                        : hasActiveChild
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-2 border-blue-200 dark:border-blue-800'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"
                        layoutId="activeCategoryBackground"
                      />
                    )}
                    <div className="flex items-center gap-2.5 flex-1 min-w-0 relative z-10">
                      <span className={`text-base flex-shrink-0 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110 group-hover:rotate-12'}`}>
                        {isActive ? '📂' : '📁'}
                      </span>
                      <span className="flex-1 font-semibold text-sm truncate text-right">
                        {category.name}
                      </span>
                    </div>
                    {isActive && (
                      <motion.span
                        className="w-1.5 h-1.5 rounded-full bg-white relative z-10 flex-shrink-0"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Link>
                  {hasChildren && (
                    <>
                      <button
                        onClick={(e) => toggleCategory(category.slug, e)}
                        className={`flex-shrink-0 p-1.5 rounded-lg transition-all duration-200 hover:scale-110 ${
                          isActive || hasActiveChild
                            ? 'text-white bg-white/20 hover:bg-white/30'
                            : 'text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                        }`}
                        aria-label={isExpanded ? 'بستن زیردسته‌ها' : 'باز کردن زیردسته‌ها'}
                        aria-expanded={isExpanded}
                        title={isExpanded ? 'بستن زیردسته‌ها' : 'باز کردن زیردسته‌ها'}
                      >
                        <motion.svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </motion.svg>
                      </button>
                      <span className={`text-xs px-2 py-1 rounded-full flex-shrink-0 font-medium min-w-[24px] text-center ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : hasActiveChild
                          ? 'bg-blue-200 dark:bg-blue-800 text-blue-700 dark:text-blue-300'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                      }`} title={`${category.children!.length} زیردسته`}>
                        {category.children!.length}
                      </span>
                    </>
                  )}
                </div>

                {/* Subcategories */}
                {hasChildren && (
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="mr-8 space-y-1 pl-3 border-r-2 border-gray-200 dark:border-gray-700 py-1">
                          {category.children!.map((subCategory, subIndex) => {
                            const isSubActive = activeCategory === subCategory.slug;
                            return (
                              <motion.div
                                key={subCategory.slug}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: subIndex * 0.05, duration: 0.2 }}
                              >
                                <Link
                                  href={`/blog?category=${subCategory.slug}`}
                                  className={`group flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-300 ${
                                    isSubActive
                                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                                      : 'bg-white/50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200'
                                  }`}
                                >
                                  <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 flex-shrink-0 ${
                                    isSubActive
                                      ? 'bg-white scale-125'
                                      : 'bg-blue-400 dark:bg-blue-500 group-hover:scale-125'
                                  }`} />
                                  <span className={`flex-1 truncate font-medium text-right ${
                                    isSubActive ? 'text-white' : ''
                                  }`}>
                                    {subCategory.name}
                                  </span>
                                  {isSubActive && (
                                    <motion.svg
                                      className="w-3.5 h-3.5 text-white flex-shrink-0"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                      initial={{ scale: 0, rotate: -180 }}
                                      animate={{ scale: 1, rotate: 0 }}
                                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                      />
                                    </motion.svg>
                                  )}
                                </Link>
                              </motion.div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Footer decoration */}
        <div className="pt-3 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <span className="w-1 h-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"></span>
            <span>{categories.length} دسته‌بندی اصلی</span>
            <span className="w-1 h-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"></span>
          </div>
        </div>
      </div>
    </aside>
  );
}
