'use client';

import { useEffect, useRef, useState } from 'react';

export function Comments() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<'github-light' | 'github-dark'>('github-light');

  // Load utterances
  useEffect(() => {
    if (!containerRef.current) return;

    // Remove existing script if any (to handle re-renders)
    if (containerRef.current.hasChildNodes()) {
      containerRef.current.innerHTML = '';
    }

    const script = document.createElement('script');
    script.src = 'https://utteranc.es/client.js';
    script.setAttribute('repo', 'bozorgani/myResume');
    script.setAttribute('issue-term', 'pathname');
    script.setAttribute('label', 'comment');
    script.setAttribute('theme', theme);
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    containerRef.current.appendChild(script);
  }, [theme]);

  // Observe theme changes from html class
  useEffect(() => {
    // Initial check
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'github-dark' : 'github-light');

    // Watch for class changes on HTML element
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isDarkNow = document.documentElement.classList.contains('dark');
          setTheme(isDarkNow ? 'github-dark' : 'github-light');
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full mt-12 mb-8 no-print">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 sm:p-8 shadow-sm">
        <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-4">
          نظرات شما
        </h3>
        <div ref={containerRef} className="utterances-container w-full min-h-[250px]" />
      </div>
    </div>
  );
}
