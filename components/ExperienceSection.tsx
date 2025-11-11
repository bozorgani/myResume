'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { FadeInUp, StaggerChildren, StaggerItem } from './animations';
import ScrollReveal from './ScrollReveal';

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
        <div className="space-y-2">
          <ScrollReveal
            as="h2"
            id="experience-title"
            baseOpacity={0}
            enableBlur={true}
            baseRotation={5}
            blurStrength={8}
            containerClassName="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white"
            textClassName=""
            wordAnimationEnd="top center"
          >
            تجربه و سوابق
          </ScrollReveal>
          <motion.div 
            className="h-1 w-20 bg-gradient-to-r from-brand to-indigo-500 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </div>
        
        <StaggerChildren className="grid grid-cols-1 gap-6" staggerDelay={0.15}>
          {experiences.map((exp, idx) => {
            const ExperienceCard = () => {
              const ref = useRef<HTMLElement>(null);
              const [isHovered, setIsHovered] = useState(false);
              const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

              const x = useMotionValue(0);
              const y = useMotionValue(0);

              const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 });
              const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 });

              const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['4deg', '-4deg']);
              const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-4deg', '4deg']);

              const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
                if (!ref.current) return;
                const rect = ref.current.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const mouseY = e.clientY - rect.top;
                const xPct = mouseX / rect.width - 0.5;
                const yPct = mouseY / rect.height - 0.5;
                x.set(xPct);
                y.set(yPct);
                setMousePosition({ x: (mouseX / rect.width) * 100, y: (mouseY / rect.height) * 100 });
              };

              const handleMouseLeave = () => {
                x.set(0);
                y.set(0);
                setIsHovered(false);
                setMousePosition({ x: 50, y: 50 });
              };

              return (
                <motion.article 
                  ref={ref}
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-6 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl"
                  itemScope
                  itemType="https://schema.org/JobPosting"
                  itemProp="itemListElement"
                  onMouseMove={handleMouseMove}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d',
                  }}
                  animate={{
                    scale: isHovered ? 1.02 : 1,
                    y: isHovered ? -5 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Magic Bento gradient border */}
                  <motion.div 
                    className="absolute -inset-0.5 rounded-xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.7), rgba(147, 51, 234, 0.7), rgba(236, 72, 153, 0.7))',
                    }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                  />
                  
                  {/* Glow effect following mouse */}
                  <motion.div
                    className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(500px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.3), transparent 40%)`,
                    }}
                  />
                  <motion.div 
                    className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-brand/10 to-indigo-500/10 rounded-full blur-2xl"
                    style={{ transform: 'translateZ(5px)' }}
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
                  
                  <div className="relative space-y-4" style={{ transform: 'translateZ(10px)' }}>
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
              );
            };

            return (
              <StaggerItem key={idx}>
                <ExperienceCard />
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </div>
    </section>
  );
}


