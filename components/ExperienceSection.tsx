type Experience = {
  company: string;
  role: string;
  start: string;
  end: string;
  summary: string;
};

const experiences: Experience[] = [
  {
    company: 'شرکت الف',
    role: 'Senior Full-Stack Developer',
    start: '۱۳۹۸',
    end: 'اکنون',
    summary: 'رهبری فنی تیم، معماری Next.js/Node.js و بهبود سئو فنی.'
  },
  {
    company: 'استارتاپ ب',
    role: 'Frontend Engineer',
    start: '۱۳۹۵',
    end: '۱۳۹۸',
    summary: 'توسعه رابط کاربری با React و بهینه‌سازی عملکرد.'
  }
];

export function ExperienceSection() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="rounded-lg border p-6 space-y-6 dark:border-gray-800">
      <h2 id="experience-title" className="text-xl font-semibold">تجربه و سوابق</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {experiences.map((exp, idx) => (
          <article key={idx} className="rounded-lg bg-gray-50 p-4 ring-1 ring-gray-100 transition-shadow hover:shadow-sm dark:bg-gray-900 dark:ring-gray-800">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-medium leading-6">{exp.role} • {exp.company}</h3>
              <time className="shrink-0 text-xs text-gray-600 dark:text-gray-400">{exp.start} — {exp.end}</time>
            </div>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{exp.summary}</p>
          </article>
        ))}
      </div>
    </section>
  );
}


