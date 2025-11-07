export function ThemeScript() {
  const script = `
    (function() {
      try {
        const storage = localStorage.getItem('theme');
        const root = document.documentElement;
        let theme = 'dark'; // پیش‌فرض: تم تیره
        
        // اگر تم در localStorage ذخیره شده باشد
        if (storage && ['light', 'dark', 'system'].includes(storage)) {
          if (storage === 'system') {
            // پیروی از تنظیمات سیستم
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            theme = prefersDark ? 'dark' : 'light';
          } else {
            theme = storage;
          }
        } else {
          // اگر چیزی در localStorage نیست، پیش‌فرض: تم تیره
          theme = 'dark';
          localStorage.setItem('theme', 'dark');
        }
        
        // اعمال تم به DOM
        if (theme === 'dark') {
          root.classList.add('dark');
          root.style.colorScheme = 'dark';
        } else {
          root.classList.remove('dark');
          root.style.colorScheme = 'light';
        }
      } catch (e) {
        // در صورت خطا، پیش‌فرض dark
        document.documentElement.classList.add('dark');
        document.documentElement.style.colorScheme = 'dark';
      }
    })();
  `;
  return (
    <script 
      dangerouslySetInnerHTML={{ __html: script }} 
      suppressHydrationWarning
    />
  );
}


