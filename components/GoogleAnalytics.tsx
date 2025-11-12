'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function GoogleAnalytics() {
  const pathname = usePathname();
  const [shouldLoad, setShouldLoad] = useState(false);

  // Defer loading GA until browser is idle or after a delay
  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;

    let idleCallbackId: number | undefined;
    let timeoutId: NodeJS.Timeout | undefined;
    let loadHandler: (() => void) | null = null;

    // Use requestIdleCallback if available, otherwise use setTimeout as fallback
    const loadGA = () => {
      setShouldLoad(true);
    };

    const scheduleLoad = () => {
      if ('requestIdleCallback' in window && typeof (window as any).requestIdleCallback === 'function') {
        idleCallbackId = (window as any).requestIdleCallback(loadGA, { timeout: 2000 });
      } else {
        // Fallback for browsers without requestIdleCallback
        timeoutId = setTimeout(loadGA, 2000);
      }
    };

    if (typeof window !== 'undefined') {
      // Wait for page to be fully loaded
      if (document.readyState === 'complete') {
        // Page already loaded, schedule deferred load
        scheduleLoad();
      } else {
        // Wait for page load, then defer further
        loadHandler = () => {
          scheduleLoad();
        };
        window.addEventListener('load', loadHandler, { once: true });
      }
    }

    // Cleanup function
    return () => {
      if (loadHandler) {
        window.removeEventListener('load', loadHandler);
      }
      if (idleCallbackId !== undefined && 'cancelIdleCallback' in window && typeof (window as any).cancelIdleCallback === 'function') {
        (window as any).cancelIdleCallback(idleCallbackId);
      }
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  useEffect(() => {
    if (!GA_MEASUREMENT_ID || !shouldLoad) return;

    // Track page views on route change - only after script has loaded
    // Use a small delay to ensure gtag is available after script loads
    const timeoutId = setTimeout(() => {
      if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
        window.gtag('config', GA_MEASUREMENT_ID, {
          page_path: pathname,
          send_page_view: true,
        });
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname, shouldLoad]);

  if (!GA_MEASUREMENT_ID || !shouldLoad) {
    return null;
  }

  return (
    <>
      {/* Initialize dataLayer and gtag function - loads only when shouldLoad is true */}
      <Script
        id="google-analytics-init"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `,
        }}
      />
      {/* Load GA script with lazyOnload strategy - loads during browser idle time */}
      <Script
        id="google-analytics-script"
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
    </>
  );
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
    dataLayer: any[];
  }
}

