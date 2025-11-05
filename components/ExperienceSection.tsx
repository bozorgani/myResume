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
      <ol className="relative border-s dark:border-gray-800">
        {experiences.map((exp, idx) => (
          <li key={idx} className="ms-6 py-4">
            <span className="absolute -start-2 mt-2 h-4 w-4 rounded-full border bg-white dark:bg-gray-900 dark:border-gray-700" />
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="font-medium">{exp.role} • {exp.company}</h3>
              <time className="text-sm text-gray-600 dark:text-gray-400">{exp.start} — {exp.end}</time>
            </div>
            <p className="mt-1 text-gray-700 text-sm dark:text-gray-300">{exp.summary}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}


