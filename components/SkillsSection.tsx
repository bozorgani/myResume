export function SkillsSection() {
  const skills = {
    Frontend: [
      { name: 'React', level: 'Advanced' },
      { name: 'Next.js', level: 'Advanced' },
      { name: 'TailwindCSS', level: 'Advanced' }
    ],
    Backend: [
      { name: 'Node.js', level: 'Advanced' },
      { name: 'Express', level: 'Advanced' },
      { name: 'MongoDB', level: 'Intermediate' }
    ],
    Tools: [
      { name: 'Git', level: 'Advanced' },
      { name: 'Docker', level: 'Intermediate' },
      { name: 'VSCode', level: 'Advanced' }
    ]
  } as const;

  return (
    <section id="skills" aria-labelledby="skills-title" className="rounded-lg border p-6 space-y-6 dark:border-gray-800">
      <h2 id="skills-title" className="text-xl font-semibold">مهارت‌ها</h2>
      <div className="grid gap-6 sm:grid-cols-3">
        {Object.entries(skills).map(([category, items]) => (
          <div key={category} className="space-y-3">
            <h3 className="font-medium">{category}</h3>
            <ul className="space-y-2">
              {items.map((s) => (
                <li key={s.name} className="flex items-center justify-between rounded-md bg-gray-50 px-3 py-2 text-sm dark:bg-gray-900 dark:text-gray-300">
                  <span>{s.name}</span>
                  <span className="text-gray-600">{s.level}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}


