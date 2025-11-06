export function ThemeScript() {
  const script = `
    try {
      const storage = localStorage.getItem('theme');
      // پیش‌فرض: تم روشن (light) - فقط اگر کاربر قبلاً dark را انتخاب کرده باشد، از آن استفاده می‌شود
      const isDark = storage === 'dark';
      const root = document.documentElement;
      if (isDark) root.classList.add('dark'); else root.classList.remove('dark');
    } catch {}
  `;
  return (
    <script dangerouslySetInnerHTML={{ __html: script }} />
  );
}


