"use client";
import { useEffect, useState, useCallback } from 'react';

type ThemeMode = 'light' | 'dark' | 'system';

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // تشخیص تم سیستم
  const getSystemTheme = useCallback((): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'dark'; // پیش‌فرض: تم تیره
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }, []);

  // محاسبه تم نهایی
  const getResolvedTheme = useCallback((currentTheme: ThemeMode): 'light' | 'dark' => {
    if (currentTheme === 'system') {
      return getSystemTheme();
    }
    return currentTheme;
  }, [getSystemTheme]);

  // اعمال تم به DOM
  const applyTheme = useCallback((newTheme: ThemeMode) => {
    const root = document.documentElement;
    const resolved = getResolvedTheme(newTheme);
    
    if (resolved === 'dark') {
      root.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    }
    
    setResolvedTheme(resolved);
  }, [getResolvedTheme]);

  // مقداردهی اولیه
  useEffect(() => {
    try {
      const stored = localStorage.getItem('theme') as ThemeMode | null;
      const initialTheme = stored && ['light', 'dark', 'system'].includes(stored) 
        ? stored 
        : 'dark'; // پیش‌فرض: تم تیره
      
      setTheme(initialTheme);
      applyTheme(initialTheme);
      setMounted(true);
    } catch {
      setTheme('dark');
      applyTheme('dark');
      setMounted(true);
    }
  }, [applyTheme]);

  // گوش دادن به تغییرات تم سیستم
  useEffect(() => {
    if (!mounted || theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      applyTheme('system');
    };

    // گوش دادن به تغییرات
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      // Fallback برای مرورگرهای قدیمی
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [theme, mounted, applyTheme]);

  // تغییر تم
  const handleThemeChange = useCallback((newTheme: ThemeMode) => {
    setTheme(newTheme);
    applyTheme(newTheme);
    try {
      localStorage.setItem('theme', newTheme);
    } catch {}
    setIsMenuOpen(false);
  }, [applyTheme]);

  // مدیریت ناوبری با کیبورد
  const handleKeyDown = useCallback((e: React.KeyboardEvent, themeValue: ThemeMode) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleThemeChange(themeValue);
    }
  }, [handleThemeChange]);

  // بستن منو با Escape
  useEffect(() => {
    if (!isMenuOpen) return;
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  // جلوگیری از hydration mismatch
  if (!mounted) {
    return (
      <button
        type="button"
        className="relative rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
        aria-label="تغییر تم"
        disabled
      >
        <span className="inline-block w-5 h-5 opacity-50">🌙</span>
      </button>
    );
  }

  const themes: { value: ThemeMode; label: string; icon: string; desc: string }[] = [
    { value: 'light', label: 'روشن', icon: '☀️', desc: 'تم روشن' },
    { value: 'dark', label: 'تیره', icon: '🌙', desc: 'تم تیره' },
    { value: 'system', label: 'سیستم', icon: '🌓', desc: 'پیروی از تنظیمات سیستم' },
  ];

  const currentThemeData = themes.find(t => t.value === theme) || themes[1]; // پیش‌فرض: تم تیره

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        onBlur={(e) => {
          // بستن منو وقتی فوکوس خارج می‌شود
          if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setTimeout(() => setIsMenuOpen(false), 200);
          }
        }}
        className="flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 dark:focus:ring-offset-gray-900"
        aria-label={`تغییر تم: ${currentThemeData.desc}`}
        aria-expanded={isMenuOpen}
        aria-haspopup="true"
        title={currentThemeData.desc}
      >
        <span 
          className="text-lg transition-transform duration-200"
          style={{ 
            transform: isMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            display: 'inline-block'
          }}
          role="img" 
          aria-hidden="true"
        >
          {currentThemeData.icon}
        </span>
        <span className="hidden md:inline text-xs">{currentThemeData.label}</span>
        <svg 
          className="w-4 h-4 transition-transform duration-200" 
          style={{ transform: isMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* منوی انتخاب تم */}
      {isMenuOpen && (
        <>
          {/* Backdrop - فقط در موبایل نمایش داده می‌شود */}
          <div 
            className="fixed inset-0 z-[60] md:hidden bg-black/20" 
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
          {/* Menu */}
          {/* در موبایل: استفاده از fixed positioning و قرار دادن منو در سمت راست صفحه */}
          {/* در دسکتاپ: استفاده از absolute positioning و قرار دادن منو در سمت راست دکمه */}
          <div className="md:absolute fixed md:left-0 md:right-auto md:mt-2 mt-14 right-4 left-auto w-44 md:w-48 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-xl z-[70] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            {themes.map((themeOption) => (
              <button
                key={themeOption.value}
                type="button"
                onClick={() => handleThemeChange(themeOption.value)}
                onKeyDown={(e) => handleKeyDown(e, themeOption.value)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-right text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
                  theme === themeOption.value
                    ? 'bg-brand text-white dark:bg-brand dark:text-white'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                aria-label={themeOption.desc}
                aria-pressed={theme === themeOption.value}
              >
                <span className="text-lg flex-shrink-0" role="img" aria-hidden="true">
                  {themeOption.icon}
                </span>
                <span className="flex-1 font-medium text-right">{themeOption.label}</span>
                {theme === themeOption.value && (
                  <svg 
                    className="w-5 h-5 flex-shrink-0" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}


