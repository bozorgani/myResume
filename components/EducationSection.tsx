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
    <section 
      id="education" 
      aria-labelledby="education-title" 
      className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 md:p-10 lg:p-12 shadow-lg"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-cyan-100/50 to-blue-100/50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="relative space-y-6">
        <div className="space-y-2">
          <h2 id="education-title" className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            تحصیلات
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-brand to-indigo-500 rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 gap-6">
          {educationList.map((ed, idx) => (
            <article 
              key={idx} 
              className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-6 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:border-brand dark:hover:border-brand"
              itemScope
              itemType="https://schema.org/EducationalOccupationalCredential"
              itemProp="itemListElement"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-100/30 to-blue-100/30 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-full blur-2xl"></div>
              
              <div className="relative space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="flex-1 min-w-0 space-y-1">
                    <h3 
                      className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-brand dark:group-hover:text-blue-400 transition-colors"
                      itemProp="credentialCategory"
                    >
                      {ed.degree}
                    </h3>
                    <p 
                      className="text-base font-medium text-gray-600 dark:text-gray-400"
                      itemProp="educationalCredentialAwarded"
                      itemScope
                      itemType="https://schema.org/Organization"
                    >
                      <span itemProp="name">{ed.school}</span>
                    </p>
                  </div>
                  <time 
                    className="shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 rounded-lg shadow-sm"
                    itemProp="dateCreated"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {ed.year}
                  </time>
                </div>
                {ed.note ? (
                  <p 
                    className="text-base text-gray-700 dark:text-gray-300 leading-relaxed"
                    itemProp="description"
                  >
                    {ed.note}
                  </p>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


