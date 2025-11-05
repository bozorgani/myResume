import Image from 'next/image';

type Certificate = {
  title: string;
  issuer: string;
  year: string;
  url?: string;
  image?: string; // path under /public or absolute URL
};

const certificates: Certificate[] = [
  { title: 'Advanced React', issuer: 'Udemy', year: '۱۴۰۱', image: '/images/profile-placeholder.svg', url: 'https://www.udemy.com/' },
  { title: 'Node.js Microservices', issuer: 'Coursera', year: '۱۴۰۰', image: '/images/profile-placeholder.svg', url: 'https://www.coursera.org/' }
];

export function CertificatesSection() {
  return (
    <section id="certificates" aria-labelledby="certificates-title" className="rounded-lg border p-6 space-y-6 dark:border-gray-800">
      <h2 id="certificates-title" className="text-xl font-semibold">گواهینامه‌ها</h2>
      <ul className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
        {certificates.map((c, idx) => (
          <li key={idx} className="rounded-lg bg-gray-50 p-5 shadow-sm ring-1 ring-gray-100 transition-shadow hover:shadow-md dark:bg-gray-900 dark:ring-gray-800">
            <div className="flex items-start gap-5">
              <div className="h-24 w-24 shrink-0 overflow-hidden rounded-md bg-gray-100 dark:bg-gray-800">
                {c.image ? (
                  <Image src={c.image} alt={`لوگوی ${c.issuer}`} width={96} height={96} className="h-full w-full object-contain" />
                ) : null}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  {c.url ? (
                    <a href={c.url} target="_blank" rel="noopener noreferrer" className="font-medium hover:text-brand">
                      {c.title}
                    </a>
                  ) : (
                    <h3 className="font-medium">{c.title}</h3>
                  )}
                  <span className="text-sm text-gray-600 dark:text-gray-400">{c.year}</span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">{c.issuer}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}


