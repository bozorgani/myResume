'use client';

import { useState, useEffect } from 'react';

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const currentScrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (scrollHeight > 0) {
        const newProgress = Number((currentScrollY / scrollHeight).toFixed(2)) * 100;
        setProgress(newProgress > 100 ? 100 : newProgress);
      }
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress(); // Initial check

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-50 transition-all duration-150 ease-out no-print shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
      style={{ width: `${progress}%` }} 
      aria-hidden="true"
    />
  );
}
