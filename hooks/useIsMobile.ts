'use client';

import { useState, useEffect } from 'react';

export function useIsMobile(breakpoint: number = 768) {
  // Initialize with a more accurate check to avoid hydration mismatch
  // Use matchMedia for instant detection without waiting for resize
  const [isMobile, setIsMobile] = useState(() => {
    // SSR safe: always return false on server
    if (typeof window === 'undefined') return false;
    // Use matchMedia for instant detection
    return window.matchMedia(`(max-width: ${breakpoint - 1}px)`).matches;
  });

  useEffect(() => {
    // Use matchMedia for better performance and instant detection
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    
    // Set initial value
    setIsMobile(mediaQuery.matches);

    // Use matchMedia change listener instead of resize for better performance
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches);
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [breakpoint]);

  return isMobile;
}

