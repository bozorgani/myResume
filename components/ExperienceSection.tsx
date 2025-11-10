'use client';

import { motion } from 'framer-motion';
import { FadeInUp, StaggerChildren, StaggerItem } from './animations';

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
    <section 
      id="experience" 
      aria-labelledby="experience-title" 
      className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 md:p-10 lg:p-12 shadow-lg"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      <motion.div 
        className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-orange-100/50 to-red-100/50 dark:from-orange-900/20 dark:to-red-900/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="relative space-y-6">
        <FadeInUp>
          <div className="space-y-2">
            <h2 id="experience-title" className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              تجربه و سوابق
            </h2>
            <motion.div 
              className="h-1 w-20 bg-gradient-to-r from-brand to-indigo-500 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>
        </FadeInUp>
        
        <StaggerChildren className="grid grid-cols-1 gap-6" staggerDelay={0.15}>
          {experiences.map((exp, idx) => (
            <StaggerItem key={idx}>
              <motion.article 
                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-6 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:border-brand dark:hover:border-brand"
                itemScope
                itemType="https://schema.org/JobPosting"
                itemProp="itemListElement"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-brand/10 to-indigo-500/10 rounded-full blur-2xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: idx * 0.5
                  }}
                />
                
                <div className="relative space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="flex-1 min-w-0 space-y-1">
                      <motion.h3 
                        className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-brand dark:group-hover:text-blue-400 transition-colors"
                        itemProp="title"
                        whileHover={{ x: 4 }}
                      >
                        {exp.role}
                      </motion.h3>
                      <p 
                        className="text-base font-medium text-gray-600 dark:text-gray-400"
                        itemProp="hiringOrganization"
                        itemScope
                        itemType="https://schema.org/Organization"
                      >
                        <span itemProp="name">{exp.company}</span>
                      </p>
                    </div>
                    <motion.time 
                      className="shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-brand to-brand-dark px-4 py-2 rounded-lg shadow-sm"
                      itemProp="datePosted"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {exp.start} — {exp.end}
                    </motion.time>
                  </div>
                  <p 
                    className="text-base text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-4"
                    itemProp="description"
                  >
                    {exp.summary}
                  </p>
                </div>
              </motion.article>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}


