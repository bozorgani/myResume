type Experience = {
  company: string;
  role: string;
  start: string;
  end: string;
  summary: string;
};

const experiences: Experience[] = [
  {
    company: 'توسعه‌دهنده مستقل و مشاور فنی',
    role: 'Senior Full-Stack Developer & Technical Consultant',
    start: '۱۳۹۸',
    end: 'اکنون',
    summary: 'توسعه و راه‌اندازی اپلیکیشن‌های وب مقیاس‌پذیر با Next.js و Node.js. مشاوره در زمینه معماری نرم‌افزار، بهینه‌سازی عملکرد و بهبود سئو فنی. پیاده‌سازی راه‌حل‌های SSR/SSG، طراحی APIهای RESTful و GraphQL، و استقرار CI/CD با Docker و Kubernetes. بهبود Core Web Vitals و دسترس‌پذیری وب‌سایت‌ها برای رتبه‌بندی بهتر در موتورهای جستجو.'
  },
  {
    company: 'استارتاپ‌های فناوری',
    role: 'Full-Stack Developer',
    start: '۱۳۹۵',
    end: '۱۳۹۸',
    summary: 'توسعه رابط کاربری مدرن با React و Next.js با تمرکز بر تجربه کاربری و عملکرد. پیاده‌سازی سیستم‌های مدیریت محتوا (CMS)، بهینه‌سازی تصاویر و رسانه‌ها، و بهبود سرعت بارگذاری صفحات. همکاری در طراحی معماری Frontend و Backend، استفاده از TypeScript برای کدهای قابل نگهداری، و پیاده‌سازی تست‌های خودکار.'
  }
];

export function ExperienceSection() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="rounded-xl border bg-white p-4 sm:p-6 space-y-4 sm:space-y-6 dark:bg-gray-900 dark:border-gray-800 shadow-sm">
      <h2 id="experience-title" className="text-xl sm:text-2xl font-bold tracking-tight">تجربه و سوابق</h2>
      <div className="grid grid-cols-1 gap-4 sm:gap-5">
        {experiences.map((exp, idx) => (
          <article 
            key={idx} 
            className="group rounded-lg bg-gradient-to-br from-gray-50 to-white p-4 sm:p-5 ring-1 ring-gray-200 transition-all duration-200 hover:shadow-md hover:ring-gray-300 dark:from-gray-800 dark:to-gray-900 dark:ring-gray-700 dark:hover:ring-gray-600"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3 mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base sm:text-lg leading-6 text-gray-900 dark:text-gray-100">
                  {exp.role}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
                  {exp.company}
                </p>
              </div>
              <time className="shrink-0 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">
                {exp.start} — {exp.end}
              </time>
            </div>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
              {exp.summary}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}


