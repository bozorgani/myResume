'use client';

import { useState } from 'react';
import { CategoriesDrawer } from './CategoriesDrawer';

interface Category {
  slug: string;
  name: string;
}

interface CategoriesDrawerButtonProps {
  categories: Category[];
  activeCategory?: string;
}

export function CategoriesDrawerButton({ categories, activeCategory }: CategoriesDrawerButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  if (categories.length === 0) {
    return null;
  }

  return (
    <>
      {/* Mobile Button - Only visible on mobile */}
      <button
        onClick={handleOpen}
        className="md:hidden fixed bottom-6 right-6 z-30 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center ring-4 ring-white/20 dark:ring-gray-900/20"
        aria-label="نمایش دسته‌بندی‌ها"
      >
        <span className="text-2xl">📂</span>
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
          {categories.length}
        </span>
      </button>

      {/* Drawer */}
      <CategoriesDrawer
        isOpen={isOpen}
        onClose={handleClose}
        categories={categories}
        activeCategory={activeCategory}
      />
    </>
  );
}

