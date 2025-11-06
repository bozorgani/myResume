"use client";
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    try {
      const storage = localStorage.getItem('theme');
      // پیش‌فرض: تم روشن (light) - فقط اگر کاربر قبلاً dark را انتخاب کرده باشد، از آن استفاده می‌شود
      const applied = storage === 'dark';
      setIsDark(applied);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      const root = document.documentElement;
      if (isDark) {
        root.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        root.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    } catch {}
  }, [isDark]);

  return (
    <button
      type="button"
      onClick={() => setIsDark((v) => !v)}
      className="rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
      aria-label={isDark ? 'تغییر به تم روشن' : 'تغییر به تم تیره'}
      title={isDark ? 'تم روشن' : 'تم تیره'}
    >
      {isDark ? '🌙' : '☀️'}
    </button>
  );
}


