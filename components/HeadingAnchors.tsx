'use client';

import { useEffect } from 'react';

export function HeadingAnchors() {
  useEffect(() => {
    // Add a slight delay to ensure content is fully rendered
    const timeout = setTimeout(() => {
      const headings = document.querySelectorAll('.blog-content h2, .blog-content h3');
      
      headings.forEach(heading => {
        // Skip if already processed
        if (heading.querySelector('.anchor-link-btn')) return;

        // Make heading relative to position the anchor
        heading.classList.add('group', 'relative');
        
        // Create the anchor button
        const anchor = document.createElement('button');
        anchor.className = 'anchor-link-btn opacity-0 group-hover:opacity-100 absolute -right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand transition-all duration-200 p-1 bg-white dark:bg-gray-900 rounded shadow-sm hover:shadow border border-gray-100 dark:border-gray-800 no-print';
        anchor.setAttribute('aria-label', 'کپی لینک این بخش');
        anchor.innerHTML = '<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>';
        
        anchor.onclick = () => {
          const url = new URL(window.location.href);
          url.hash = heading.id;
          navigator.clipboard.writeText(url.toString());
          
          // Visual feedback
          const originalHtml = anchor.innerHTML;
          anchor.innerHTML = '<svg width="14" height="14" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>';
          
          setTimeout(() => {
            anchor.innerHTML = originalHtml;
          }, 2000);
        };
        
        heading.appendChild(anchor);
      });
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  return null;
}
