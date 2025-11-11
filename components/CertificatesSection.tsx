'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ElectricBorder from './ElectricBorder';

type Certificate = {
  title: string;
  issuer: string;
  year: string;
  url?: string;
  image?: string;
  skills?: string[];
};

const certificates: Certificate[] = [
  { 
    title: 'Progressive Web Apps (PWA)', 
    issuer: 'Web Development', 
    year: '۱۴۰۲', 
    image: '/images/pwas.png', 
    url: '#',
    skills: ['PWA', 'Service Workers', 'Web App Manifest', 'Offline Support', 'Push Notifications', 'Cache API']
  },
  { 
    title: 'React Server Side Rendering (SSR)', 
    issuer: 'React Development', 
    year: '۱۴۰۲', 
    image: '/images/reactssr.png', 
    url: '#',
    skills: ['React.js', 'Next.js', 'SSR', 'SSG', 'Server Components', 'Hydration', 'React Hooks']
  },
  { 
    title: 'Modern JavaScript', 
    issuer: 'JavaScript Development', 
    year: '۱۴۰۱', 
    image: '/images/mjs.jpeg', 
    url: '#',
    skills: ['JavaScript', 'ES6+', 'Async/Await', 'Promises', 'Modules', 'Destructuring', 'Arrow Functions', 'Classes']
  },
  { 
    title: 'RESTful API Development', 
    issuer: 'Backend Development', 
    year: '۱۴۰۲', 
    image: '/images/restfullapi.png', 
    url: '#',
    skills: ['REST APIs', 'Node.js', 'Express.js']
  }
];

function CertificateModal({ certificate, isOpen, onClose }: { certificate: Certificate | null; isOpen: boolean; onClose: () => void }) {
  if (!isOpen || !certificate) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="نمایش عکس گواهینامه"
    >
      <div 
        className="relative max-w-5xl w-full max-h-[95vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-10 p-3 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white shadow-lg transition-colors"
          aria-label="بستن مودال"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image Only */}
        {certificate.image && (
          <div className="relative w-full h-auto max-h-[95vh] overflow-hidden rounded-lg shadow-2xl">
            <Image
              src={certificate.image}
              alt={`عکس گواهینامه ${certificate.title}`}
              width={1400}
              height={1000}
              className="w-full h-auto object-contain"
              priority
              quality={95}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export function CertificatesSection() {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCertificate(null);
    document.body.style.overflow = 'unset';
  };

  // Close modal on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
        setSelectedCertificate(null);
        document.body.style.overflow = 'unset';
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isModalOpen]);

  return (
    <section 
      id="certificates" 
      aria-labelledby="certificates-title" 
      className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 md:p-10 lg:p-12 shadow-lg"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-yellow-100/50 to-orange-100/50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="relative space-y-6">
        <div className="space-y-2">
          <h2 id="certificates-title" className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            گواهینامه‌ها
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-brand to-indigo-500 rounded-full"></div>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {certificates.map((c, idx) => (
            <li 
              key={idx}
              itemScope
              itemType="https://schema.org/Certificate"
              itemProp="itemListElement"
            >
              <ElectricBorder
                color="#7df9ff"
                speed={1}
                chaos={0.5}
                thickness={2}
                style={{ borderRadius: 16 }}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-100/30 to-orange-100/30 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-full blur-2xl"></div>
                
                <div className="relative flex flex-col sm:flex-row items-start gap-4 p-6">
                {/* Image - Full width on mobile, fixed width on desktop */}
                <button
                  onClick={() => handleImageClick(c)}
                  className="w-full sm:w-auto sm:h-40 sm:shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center border border-gray-200 dark:border-gray-600 shadow-md group-hover:shadow-lg transition-all cursor-pointer hover:scale-105 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 h-48 sm:h-40 sm:aspect-square md:h-48"
                  aria-label={`مشاهده عکس بزرگ گواهینامه ${c.title}`}
                >
                  {c.image ? (
                    <Image 
                      src={c.image} 
                      alt={`عکس گواهینامه ${c.title} از ${c.issuer}`} 
                      width={192} 
                      height={192} 
                      className="h-full w-full object-cover rounded-xl" 
                      itemProp="image"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
                      <svg className="w-16 h-16 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                  )}
                </button>
                <div className="min-w-0 flex-1 w-full sm:w-auto space-y-2">
                  {/* Title and Year in one line on mobile */}
                  <div className="flex flex-row items-center justify-between gap-3">
                    {c.url ? (
                      <a 
                        href={c.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="font-bold text-base text-gray-900 dark:text-white hover:text-brand dark:hover:text-blue-400 transition-colors leading-tight group-hover:underline flex-1 min-w-0"
                        itemProp="url"
                      >
                        {c.title}
                      </a>
                    ) : (
                      <h3 
                        className="font-bold text-base text-gray-900 dark:text-white leading-tight flex-1 min-w-0"
                        itemProp="name"
                      >
                        {c.title}
                      </h3>
                    )}
                    <time 
                      className="shrink-0 inline-flex items-center gap-1 text-xs font-semibold text-white bg-gradient-to-r from-yellow-500 to-orange-500 px-3 py-1 rounded-full shadow-sm"
                      itemProp="dateCreated"
                    >
                      {c.year}
                    </time>
                  </div>
                  <p 
                    className="text-sm font-medium text-gray-600 dark:text-gray-400"
                    itemProp="issuer"
                    itemScope
                    itemType="https://schema.org/Organization"
                  >
                    <span itemProp="name">{c.issuer}</span>
                  </p>
                  
                  {/* Skills Preview */}
                  {c.skills && c.skills.length > 0 && (
                    <div className="pt-3">
                      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">مهارت‌های یادگرفته شده:</p>
                      <div className="flex flex-wrap gap-2">
                        {c.skills.slice(0, 4).map((skill, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 text-xs font-semibold text-blue-700 dark:text-blue-300 shadow-sm"
                          >
                            {skill}
                          </span>
                        ))}
                        {c.skills.length > 4 && (
                          <button
                            onClick={() => handleImageClick(c)}
                            className="inline-flex items-center px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                          >
                            +{c.skills.length - 4} بیشتر
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                </div>
              </ElectricBorder>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal */}
      <CertificateModal 
        certificate={selectedCertificate}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}


