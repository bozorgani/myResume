export function ThemeScript() {
  const script = `
    try {
      const storage = localStorage.getItem('theme');
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const isDark = storage ? storage === 'dark' : systemPrefersDark;
      const root = document.documentElement;
      if (isDark) root.classList.add('dark'); else root.classList.remove('dark');
    } catch {}
  `;
  return (
    <script dangerouslySetInnerHTML={{ __html: script }} />
  );
}


