// Icon component for skills - using emoji and simple icons
function SkillIcon({ name }: { name: string }) {
  const iconClasses = "text-xl shrink-0";
  
  // Using emoji and simple visual icons
  const iconMap: Record<string, string> = {
    'React': '⚛️',
    'Next.js': '▲',
    'TypeScript': '📘',
    'TailwindCSS': '🎨',
    'Redux': '🔄',
    'GraphQL': '🔷',
    'Node.js': '🟢',
    'Express': '🚂',
    'MongoDB': '🍃',
    'PostgreSQL': '🐘',
    'Redis': '🔴',
    'RESTful API': '🔌',
    'Core Web Vitals': '⚡',
    'Schema.org': '📋',
    'Technical SEO': '🔍',
    'Lighthouse': '💡',
    'Performance Optimization': '🚀',
    'Git': '📦',
    'Docker': '🐳',
    'Kubernetes': '☸️',
    'CI/CD': '🔄',
    'AWS': '☁️',
    'Vercel': '▲'
  };
  
  const emoji = iconMap[name];
  
  if (emoji) {
    return (
      <span className={iconClasses} role="img" aria-label={name}>
        {emoji}
      </span>
    );
  }
  
  // Default icon
  return (
    <span className={iconClasses} role="img" aria-label={name}>
      💻
    </span>
  );
}

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
    <section 
      id="skills" 
      aria-labelledby="skills-title" 
      className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 md:p-10 lg:p-12 shadow-lg"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-purple-100/50 to-pink-100/50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="relative space-y-6">
        <div className="space-y-2">
          <h2 id="skills-title" className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            مهارت‌ها
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-brand to-indigo-500 rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {Object.entries(skills).map(([category, items], categoryIdx) => (
            <div key={category} className="space-y-4" itemScope itemType="https://schema.org/ItemList">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white pb-2 border-b border-gray-200 dark:border-gray-700">
                {category}
              </h3>
              <ul className="space-y-3">
                {items.map((s, idx) => {
                  const label = levelFa[s.level] ?? s.level;
                  const percent = s.level === 'Advanced' ? 100 : s.level === 'Intermediate' ? 70 : 40;
                  return (
                    <li 
                      key={s.name} 
                      className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 px-4 py-3 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md hover:border-brand dark:hover:border-brand"
                      itemScope
                      itemType="https://schema.org/Thing"
                      itemProp="itemListElement"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className="flex items-center justify-center">
                            <SkillIcon name={s.name} />
                          </div>
                          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100" itemProp="name">
                            {s.name}
                          </span>
                        </div>
                        <span className="text-xs font-medium text-white bg-gradient-to-r from-brand to-brand-dark px-3 py-1 rounded-full shadow-sm">
                          {label}
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                        <div 
                          className="h-full rounded-full bg-gradient-to-r from-brand via-blue-500 to-indigo-500 transition-all duration-700 ease-out group-hover:shadow-lg" 
                          style={{ width: `${percent}%` }}
                          role="progressbar"
                          aria-valuenow={percent}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`سطح مهارت ${s.name}: ${label}`}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
