'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { SITE } from '@/lib/seo';
import { FadeInUp, StaggerChildren, StaggerItem } from './animations';

const contactItems = [
  {
    type: 'email',
    href: `mailto:${SITE.email}`,
    label: 'ایمیل',
    subtitle: SITE.email,
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    hoverBg: 'group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50',
    itemProp: 'email'
  },
  {
    type: 'contact',
    href: '/contact',
    label: 'فرم تماس',
    subtitle: 'ارسال پیام',
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    hoverBg: 'group-hover:bg-green-200 dark:group-hover:bg-green-900/50'
  },
  {
    type: 'github',
    href: SITE.github,
    label: 'GitHub',
    subtitle: 'مشاهده پروژه‌ها',
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    ),
    bgColor: 'bg-gray-100 dark:bg-gray-700',
    hoverBg: 'group-hover:bg-gray-200 dark:group-hover:bg-gray-600',
    itemProp: 'sameAs',
    external: true
  },
  {
    type: 'linkedin',
    href: SITE.linkedin,
    label: 'LinkedIn',
    subtitle: 'ارتباط حرفه‌ای',
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    hoverBg: 'group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50',
    itemProp: 'sameAs',
    external: true
  }
];

export function ContactSection() {
  return (
    <section 
      id="contact" 
      aria-labelledby="contact-title" 
      className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 p-6 sm:p-8 md:p-10 lg:p-12 shadow-lg"
      itemScope
      itemType="https://schema.org/ContactPage"
    >
      <motion.div 
        className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-indigo-100/50 to-purple-100/50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="relative space-y-6">
        <FadeInUp>
          <div className="space-y-2">
            <h2 id="contact-title" className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              تماس با من
            </h2>
            <motion.div 
              className="h-1 w-20 bg-gradient-to-r from-brand to-indigo-500 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <p className="text-lg text-gray-600 dark:text-gray-400 pt-2">
              برای همکاری، مشاوره یا هر سوالی که دارید، خوشحال می‌شوم با شما در ارتباط باشم.
            </p>
          </div>
        </FadeInUp>

        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4" staggerDelay={0.1}>
          {contactItems.map((item, index) => (
            <StaggerItem key={item.type}>
              <motion.div
                whileHover={{ y: -8, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                {item.type === 'contact' ? (
                  <Link 
                    href={item.href}
                    className="group flex flex-col items-center gap-2 sm:gap-3 rounded-xl bg-white dark:bg-gray-800 p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-brand dark:hover:border-brand"
                    aria-label={item.label}
                  >
                    <motion.div 
                      className={`rounded-full ${item.bgColor} p-2.5 sm:p-3 ${item.hoverBg} transition-colors`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {item.icon}
                    </motion.div>
                    <div className="text-center">
                      <div className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">{item.label}</div>
                      <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">{item.subtitle}</div>
                    </div>
                  </Link>
                ) : (
                  <a 
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="group flex flex-col items-center gap-2 sm:gap-3 rounded-xl bg-white dark:bg-gray-800 p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-brand dark:hover:border-brand"
                    aria-label={item.label}
                    {...(item.itemProp ? { itemProp: item.itemProp } : {})}
                  >
                    <motion.div 
                      className={`rounded-full ${item.bgColor} p-2.5 sm:p-3 ${item.hoverBg} transition-colors`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {item.icon}
                    </motion.div>
                    <div className="text-center">
                      <div className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">{item.label}</div>
                      <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1 break-all">{item.subtitle}</div>
                    </div>
                  </a>
                )}
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}


