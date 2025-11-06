'use client';

import { useEffect, useState } from 'react';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 left-6 sm:bottom-8 sm:left-8 z-50 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 text-white shadow-2xl hover:shadow-blue-500/50 dark:hover:shadow-purple-500/50 transition-all duration-300 hover:scale-110 hover:-translate-y-1 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-500/50 backdrop-blur-sm border-2 border-white/20"
      aria-label="بازگشت به بالا"
    >
      <span className="text-2xl sm:text-3xl leading-none transition-transform duration-300 hover:scale-125">↑</span>
    </button>
  );
}

