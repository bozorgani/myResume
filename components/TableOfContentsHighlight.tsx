'use client';

import { useEffect } from 'react';

export function TableOfContentsHighlight() {
  useEffect(() => {
    // Setup Intersection Observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        // Find all intersecting entries
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          // Get the topmost visible heading
          const topmost = visibleEntries.reduce((prev, current) => {
            return prev.boundingClientRect.top < current.boundingClientRect.top ? prev : current;
          });
          
          const id = topmost.target.id;
          if (id) {
            // Remove active class from all
            document.querySelectorAll('nav a[href^="#"]').forEach(a => {
              a.classList.remove('text-blue-600', 'dark:text-blue-400', 'font-bold', 'translate-x-1');
              a.classList.add('text-gray-600', 'dark:text-gray-400', 'hover:text-gray-900', 'dark:hover:text-gray-200');
            });
            
            // Add active class to current
            try {
              // CSS.escape handles IDs that start with numbers or contain special characters
              const safeId = CSS.escape(id);
              const activeLink = document.querySelector(`nav a[href="#${safeId}"]`);
              if (activeLink) {
                activeLink.classList.remove('text-gray-600', 'dark:text-gray-400', 'hover:text-gray-900', 'dark:hover:text-gray-200');
                activeLink.classList.add('text-blue-600', 'dark:text-blue-400', 'font-bold', 'translate-x-1');
              }
            } catch (e) {
              // Ignore invalid selector errors
            }
          }
        }
      },
      { rootMargin: '0px 0px -80% 0px', threshold: 0.1 }
    );

    // Give time for content to render
    setTimeout(() => {
      document.querySelectorAll('.blog-content h2, .blog-content h3').forEach((el) => {
        observer.observe(el);
      });
    }, 100);

    return () => observer.disconnect();
  }, []);

  return null;
}
