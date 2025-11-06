export function SkillsSection() {
  const skills = {
    'Frontend': [
      { name: 'React', level: 'Advanced' },
      { name: 'Next.js', level: 'Advanced' },
      { name: 'TypeScript', level: 'Advanced' },
      { name: 'TailwindCSS', level: 'Advanced' },
      { name: 'Redux', level: 'Intermediate' },
      { name: 'GraphQL', level: 'Intermediate' }
    ],
    'Backend': [
      { name: 'Node.js', level: 'Advanced' },
      { name: 'Express', level: 'Advanced' },
      { name: 'MongoDB', level: 'Advanced' },
      { name: 'PostgreSQL', level: 'Intermediate' },
      { name: 'Redis', level: 'Intermediate' },
      { name: 'RESTful API', level: 'Advanced' }
    ],
    'SEO & Performance': [
      { name: 'Core Web Vitals', level: 'Advanced' },
      { name: 'Schema.org', level: 'Advanced' },
      { name: 'Technical SEO', level: 'Advanced' },
      { name: 'Lighthouse', level: 'Advanced' },
      { name: 'Performance Optimization', level: 'Advanced' }
    ],
    'DevOps & Tools': [
      { name: 'Git', level: 'Advanced' },
      { name: 'Docker', level: 'Advanced' },
      { name: 'Kubernetes', level: 'Intermediate' },
      { name: 'CI/CD', level: 'Advanced' },
      { name: 'AWS', level: 'Intermediate' },
      { name: 'Vercel', level: 'Advanced' }
    ]
  } as const;

  const levelFa: Record<string, string> = {
    Advanced: 'حرفه‌ای',
    Intermediate: 'متوسط',
    Beginner: 'مبتدی'
  };

  return (
    <section id="skills" aria-labelledby="skills-title" className="rounded-xl border bg-white p-4 sm:p-6 space-y-4 sm:space-y-6 dark:bg-gray-900 dark:border-gray-800 shadow-sm">
      <h2 id="skills-title" className="text-xl sm:text-2xl font-bold tracking-tight">مهارت‌ها</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5 sm:gap-6">
        {Object.entries(skills).map(([category, items]) => (
          <div key={category} className="space-y-3">
            <h3 className="font-semibold text-base sm:text-lg text-gray-900 dark:text-gray-100">{category}</h3>
            <ul className="space-y-2.5">
              {items.map((s) => {
                const label = levelFa[s.level] ?? s.level;
                const percent = s.level === 'Advanced' ? 100 : s.level === 'Intermediate' ? 70 : 40;
                return (
                  <li 
                    key={s.name} 
                    className="rounded-lg bg-gradient-to-br from-gray-50 to-white px-3 py-2.5 ring-1 ring-gray-200 transition-shadow hover:shadow-sm dark:from-gray-800 dark:to-gray-900 dark:ring-gray-700"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm sm:text-base font-medium text-gray-900 dark:text-gray-100">{s.name}</span>
                      <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-md font-medium">
                        {label}
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-brand to-brand-dark transition-all duration-500" 
                        style={{ width: `${percent}%` }} 
                      />
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
