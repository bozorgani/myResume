export function SkillsSection() {
  const skills = {
    'فرانتاند': [
      { name: 'React', level: 'Advanced' },
      { name: 'Next.js', level: 'Advanced' },
      { name: 'TailwindCSS', level: 'Advanced' }
    ],
    'بکاند': [
      { name: 'Node.js', level: 'Advanced' },
      { name: 'Express', level: 'Advanced' },
      { name: 'MongoDB', level: 'Intermediate' }
    ],
    'ابزارها': [
      { name: 'Git', level: 'Advanced' },
      { name: 'Docker', level: 'Intermediate' },
      { name: 'VSCode', level: 'Advanced' }
    ]
  } as const;

  const levelFa: Record<string, string> = {
    Advanced: 'حرفه‌ای',
    Intermediate: 'متوسط',
    Beginner: 'مبتدی'
  };

  return (
    <section id="skills" aria-labelledby="skills-title" className="rounded-lg border p-6 space-y-6 dark:border-gray-800">
      <h2 id="skills-title" className="text-xl font-semibold">مهارت‌ها</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(skills).map(([category, items]) => (
          <div key={category} className="space-y-3">
            <h3 className="font-medium">{category}</h3>
            <ul className="space-y-2">
              {items.map((s) => {
                const label = levelFa[s.level] ?? s.level;
                const percent = s.level === 'Advanced' ? 100 : s.level === 'Intermediate' ? 70 : 40;
                return (
                  <li key={s.name} className="rounded-md bg-gray-50 px-3 py-2 text-sm dark:bg-gray-900 dark:text-gray-300">
                    <div className="flex items-center justify-between">
                      <span>{s.name}</span>
                      <span className="text-gray-600 dark:text-gray-400">{label}</span>
                    </div>
                    <div className="mt-2 h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-800">
                      <div className="h-1.5 rounded-full bg-brand" style={{ width: `${percent}%` }} />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}


