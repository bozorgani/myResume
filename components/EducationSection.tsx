type Education = {
  school: string;
  degree: string;
  year: string;
  note?: string;
};

const educationList: Education[] = [
  { school: 'دانشگاه نمونه', degree: 'کارشناسی مهندسی نرم‌افزار', year: '۱۳۹۴', note: 'گرایش سیستم‌های اطلاعاتی' }
];

export function EducationSection() {
  return (
    <section id="education" aria-labelledby="education-title" className="rounded-lg border p-6 space-y-6 dark:border-gray-800">
      <h2 id="education-title" className="text-xl font-semibold">تحصیلات</h2>
      <ul className="space-y-4">
        {educationList.map((ed, idx) => (
          <li key={idx} className="rounded-md bg-gray-50 p-4 dark:bg-gray-900">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="font-medium">{ed.degree} • {ed.school}</h3>
              <span className="text-sm text-gray-600 dark:text-gray-400">{ed.year}</span>
            </div>
            {ed.note ? <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{ed.note}</p> : null}
          </li>
        ))}
      </ul>
    </section>
  );
}


