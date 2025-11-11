'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { SITE } from '@/lib/seo';
import { FadeInUp, StaggerChildren, StaggerItem } from './animations';
import ScrollReveal from './ScrollReveal';

export function AboutSection() {
  const stats = [
    {
      value: '10+',
      label: 'سال تجربه حرفه‌ای در توسعه وب',
      gradient: 'from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30',
      border: 'border-blue-100 dark:border-blue-800/50',
      blur: 'bg-blue-200/30 dark:bg-blue-800/20',
      text: 'text-brand dark:text-blue-400'
    },
    {
      value: 'Full-Stack',
      label: 'React, Next.js, Node.js, MongoDB',
      gradient: 'from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30',
      border: 'border-purple-100 dark:border-purple-800/50',
      blur: 'bg-purple-200/30 dark:bg-purple-800/20',
      text: 'text-purple-600 dark:text-purple-400'
    },
    {
      value: 'SEO Expert',
      label: 'بهینه‌سازی فنی و Core Web Vitals',
      gradient: 'from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30',
      border: 'border-green-100 dark:border-green-800/50',
      blur: 'bg-green-200/30 dark:bg-green-800/20',
      text: 'text-green-600 dark:text-green-400'
    }
  ];

  return (
    <section 
      id="about" 
      aria-labelledby="about-title" 
      className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 md:p-10 lg:p-12 shadow-lg"
      itemScope
      itemType="https://schema.org/Person"
    >
      <motion.div 
        className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100/50 to-indigo-100/50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
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
            id="about-title"
            baseOpacity={0}
            enableBlur={true}
            baseRotation={5}
            blurStrength={8}
            containerClassName="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white"
            textClassName=""
            wordAnimationEnd="top center"
          >
            درباره من
          </ScrollReveal>
          <motion.div 
            className="h-1 w-20 bg-gradient-to-r from-brand to-indigo-500 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </div>

        <div className="space-y-5 text-lg text-gray-700 dark:text-gray-300 leading-relaxed" itemProp="description">
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
            من {SITE.name}، یک توسعه‌دهنده Full-Stack با بیش از ۱۰ سال تجربه در ساخت و توسعه وب‌اپلیکیشن‌های مدرن و مقیاس‌پذیر هستم. تخصص اصلی من در استفاده از تکنولوژی‌های مدرن JavaScript شامل React، Next.js و Node.js برای ساخت محصولات دیجیتالی با عملکرد بالا و تجربه کاربری عالی است.
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
            در طول سال‌های فعالیت حرفه‌ای، تمرکز ویژه‌ای بر بهینه‌سازی عملکرد، بهبود سئو فنی، و دسترس‌پذیری وب‌سایت‌ها داشته‌ام. من در طراحی معماری نرم‌افزار، پیاده‌سازی سیستم‌های مدیریت محتوا (CMS)، و بهینه‌سازی Core Web Vitals تخصص دارم. همچنین در زمینه مشاوره فنی و راه‌اندازی پروژه‌های استارتاپی تجربه فراوانی دارم.
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
            هدف من ساخت محصولات دیجیتالی است که نه تنها از نظر فنی عالی باشند، بلکه برای موتورهای جستجو بهینه شده و تجربه کاربری بی‌نظیری ارائه دهند. من معتقد هستم که ترکیب تکنولوژی‌های مدرن با بهترین شیوه‌های سئو و UX می‌تواند به موفقیت پروژه‌ها کمک شایانی کند.
          </ScrollReveal>
        </div>

        {/* Statistics Cards */}
        <StaggerChildren className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3 pt-4" staggerDelay={0.1}>
          {stats.map((stat, index) => {
            const StatCard = () => {
              const ref = useRef<HTMLDivElement>(null);
              const [isHovered, setIsHovered] = useState(false);
              const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

              const x = useMotionValue(0);
              const y = useMotionValue(0);

              const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 });
              const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 });

              const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['4deg', '-4deg']);
              const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-4deg', '4deg']);

              const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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
                <motion.div 
                  ref={ref}
                  className={`group relative overflow-hidden rounded-xl bg-gradient-to-br ${stat.gradient} p-4 sm:p-6 border ${stat.border} shadow-sm transition-all duration-300`}
                  onMouseMove={handleMouseMove}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d',
                  }}
                  animate={{
                    scale: isHovered ? 1.05 : 1,
                    y: isHovered ? -5 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Magic Bento gradient border */}
                  <motion.div 
                    className="absolute -inset-0.5 rounded-xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.6), rgba(147, 51, 234, 0.6), rgba(236, 72, 153, 0.6))',
                    }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                  />
                  
                  {/* Glow effect following mouse */}
                  <motion.div
                    className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(300px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.3), transparent 40%)`,
                    }}
                  />
                  <motion.div 
                    className={`absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 ${stat.blur} rounded-full blur-2xl`}
                    style={{ transform: 'translateZ(5px)' }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.5
                    }}
                  />
                  <div className="relative" style={{ transform: 'translateZ(10px)' }}>
                    <motion.div 
                      className={`text-3xl sm:text-4xl font-bold ${stat.text} mb-1 sm:mb-2`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">{stat.label}</div>
                  </div>
                </motion.div>
              );
            };

            return (
              <StaggerItem key={index}>
                <StatCard />
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </div>
    </section>
  );
}


