'use client';

import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/useIsMobile';
import ScrollReveal from './ScrollReveal';

export function ResumeAboutSection() {
  const isMobile = useIsMobile();

  const workAreas = [
    'ساخت وب‌اپلیکیشن‌های اختصاصی با Next.js، React.js و Node.js',
    'پیاده‌سازی SEO فنی و بهینه‌سازی عملکرد وب‌اپ‌ها',
    'توسعه Progressive Web Apps (PWA) با حالت آفلاین، نوتیفیکیشن پوش و قابلیت نصب',
    'راه‌اندازی خط لوله‌های DevOps با Docker، Linux و CI/CD',
    'mentoring و آموزش تیم‌ها و توسعه‌دهندگان جوان در JS Stack و SEO'
  ];

  return (
    <section 
      id="about" 
      aria-labelledby="resume-about-title" 
      className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 md:p-10 shadow-lg"
      itemScope
      itemType="https://schema.org/Person"
    >
      <motion.div 
        className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100/50 to-indigo-100/50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 hidden sm:block"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="relative space-y-6">
        <div className="space-y-2">
          <ScrollReveal
            as="h2"
            id="resume-about-title"
            baseOpacity={0}
            enableBlur={true}
            baseRotation={5}
            blurStrength={8}
            containerClassName="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white"
            textClassName=""
            wordAnimationEnd="top center"
          >
            درباره من
          </ScrollReveal>
          {isMobile ? (
            <div className="h-1 w-20 bg-gradient-to-r from-brand to-indigo-500 rounded-full" />
          ) : (
            <motion.div 
              className="h-1 w-20 bg-gradient-to-r from-brand to-indigo-500 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          )}
        </div>

        <div className="space-y-5 text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed" itemProp="description">
          <ScrollReveal
            as="p"
            baseOpacity={0}
            enableBlur={true}
            baseRotation={2}
            blurStrength={6}
            containerClassName=""
            textClassName=""
            wordAnimationEnd="top center"
          >
            من یک توسعه‌دهنده فول‌استک جاوااسکریپت (Full-Stack JavaScript Developer) هستم با تخصص در Node.js، Express.js، Next.js، React.js، MongoDB و توسعه Progressive Web Apps (PWA). تمرکز من بر طراحی و توسعه وب‌اپلیکیشن‌های سریع، مقیاس‌پذیر و اختصاصی است که تجربه‌ای شبیه اپلیکیشن موبایل ارائه می‌دهند، شامل حالت آفلاین، نوتیفیکیشن‌های پوش و قابلیت نصب روی دستگاه کاربران.
          </ScrollReveal>
          <ScrollReveal
            as="p"
            baseOpacity={0}
            enableBlur={true}
            baseRotation={2}
            blurStrength={6}
            containerClassName=""
            textClassName=""
            wordAnimationEnd="top center"
          >
            تخصص من در سئوی فنی (Technical SEO) برای پروژه‌های اختصاصی باعث می‌شود وب‌اپ‌ها از نظر Core Web Vitals، SSR، متاتگ‌های داینامیک و داده‌های ساختاریافته کاملاً بهینه باشند. تسلط من بر Docker، Linux و اصول DevOps تضمین می‌کند که سیستم‌ها به صورت مقیاس‌پذیر و پایدار پیاده‌سازی شوند. تجربه تدریس و آموزش نیز به من کمک می‌کند مفاهیم پیچیده را به ساده‌ترین شکل منتقل کنم.
          </ScrollReveal>
        </div>

        {/* Work Areas Section */}
        <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-800">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2"
          >
            <span>💡</span>
            <span>حوزه‌های کاری من:</span>
          </motion.h3>
          
          <ul className="space-y-3 sm:space-y-4">
            {workAreas.map((area, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-3 text-base sm:text-lg text-gray-700 dark:text-gray-300"
              >
                <span className="mt-1.5 shrink-0 w-2 h-2 rounded-full bg-brand dark:bg-brand-light" />
                <span className="leading-relaxed">{area}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

