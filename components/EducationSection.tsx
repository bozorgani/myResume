type Education = {
  school: string;
  degree: string;
  year: string;
  note?: string;
};

const educationList: Education[] = [
  { 
    school: 'دانشگاه صنعتی شریف', 
    degree: 'کارشناسی مهندسی نرم‌افزار', 
    year: '۱۳۹۴', 
    note: 'گرایش سیستم‌های اطلاعاتی و مهندسی وب. تمرکز بر معماری نرم‌افزار، الگوهای طراحی، و توسعه اپلیکیشن‌های تحت وب.' 
  }
];

export function EducationSection() {
  return (
    <section id="education" aria-labelledby="education-title" className="rounded-xl border bg-white p-4 sm:p-6 space-y-4 sm:space-y-6 dark:bg-gray-900 dark:border-gray-800 shadow-sm">
      <h2 id="education-title" className="text-xl sm:text-2xl font-bold tracking-tight">تحصیلات</h2>
      <div className="grid grid-cols-1 gap-4">
        {educationList.map((ed, idx) => (
          <article 
            key={idx} 
            className="rounded-lg bg-gradient-to-br from-gray-50 to-white p-4 sm:p-5 ring-1 ring-gray-200 transition-shadow hover:shadow-md dark:from-gray-800 dark:to-gray-900 dark:ring-gray-700"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3 mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base sm:text-lg leading-6 text-gray-900 dark:text-gray-100">
                  {ed.degree}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
                  {ed.school}
                </p>
              </div>
              <span className="shrink-0 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">
                {ed.year}
              </span>
            </div>
            {ed.note ? (
              <p className="mt-3 text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                {ed.note}
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}


