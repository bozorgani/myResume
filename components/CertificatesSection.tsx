import Image from 'next/image';

type Certificate = {
  title: string;
  issuer: string;
  year: string;
  url?: string;
  image?: string; // path under /public or absolute URL
};

const certificates: Certificate[] = [
  { 
    title: 'Next.js 14 - The Complete Guide', 
    issuer: 'Udemy', 
    year: '۱۴۰۲', 
    image: '/images/profile-placeholder.svg', 
    url: 'https://www.udemy.com/course/nextjs-the-complete-guide/' 
  },
  { 
    title: 'Advanced React & Redux', 
    issuer: 'Udemy', 
    year: '۱۴۰۱', 
    image: '/images/profile-placeholder.svg', 
    url: 'https://www.udemy.com/course/react-redux-tutorial/' 
  },
  { 
    title: 'Node.js - The Complete Guide', 
    issuer: 'Udemy', 
    year: '۱۴۰۰', 
    image: '/images/profile-placeholder.svg', 
    url: 'https://www.udemy.com/course/nodejs-the-complete-guide/' 
  },
  { 
    title: 'Web Performance Optimization', 
    issuer: 'Google', 
    year: '۱۴۰۰', 
    image: '/images/profile-placeholder.svg', 
    url: 'https://web.dev/learn-core-web-vitals/' 
  }
];

export function CertificatesSection() {
  return (
    <section id="certificates" aria-labelledby="certificates-title" className="rounded-xl border bg-white p-4 sm:p-6 space-y-4 sm:space-y-6 dark:bg-gray-900 dark:border-gray-800 shadow-sm">
      <h2 id="certificates-title" className="text-xl sm:text-2xl font-bold tracking-tight">گواهینامه‌ها</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {certificates.map((c, idx) => (
          <li 
            key={idx} 
            className="rounded-lg bg-gradient-to-br from-gray-50 to-white p-4 sm:p-5 shadow-sm ring-1 ring-gray-200 transition-all duration-200 hover:shadow-md hover:ring-gray-300 dark:from-gray-800 dark:to-gray-900 dark:ring-gray-700 dark:hover:ring-gray-600"
          >
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="h-16 w-16 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                {c.image ? (
                  <Image 
                    src={c.image} 
                    alt={`لوگوی ${c.issuer}`} 
                    width={80} 
                    height={80} 
                    className="h-full w-full object-contain p-2" 
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600" />
                )}
              </div>
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-2">
                  {c.url ? (
                    <a 
                      href={c.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="font-semibold text-sm sm:text-base text-gray-900 dark:text-gray-100 hover:text-brand transition-colors leading-tight"
                    >
                      {c.title}
                    </a>
                  ) : (
                    <h3 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-gray-100 leading-tight">
                      {c.title}
                    </h3>
                  )}
                  <span className="shrink-0 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-md">
                    {c.year}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{c.issuer}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}


