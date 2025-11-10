'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Project } from '@/lib/projects';

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <motion.article 
      className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-all duration-300 hover:shadow-xl hover:border-brand dark:hover:border-brand" 
      aria-labelledby={`${project.slug}-title`}
      itemProp="item"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
    >
      <motion.div 
        className="aspect-video overflow-hidden rounded-t-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4 }}
      >
        <Image
          src={project.image}
          alt={`تصویر پروژه ${project.title}`}
          width={800}
          height={450}
          sizes="(min-width: 640px) 50vw, 100vw"
          className="h-full w-full object-cover transition-transform duration-500"
          itemProp="image"
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
      <div className="p-5 space-y-3">
        <motion.h3 
          id={`${project.slug}-title`} 
          className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-brand dark:group-hover:text-blue-400 transition-colors"
          itemProp="name"
          whileHover={{ x: 4 }}
        >
          {project.title}
        </motion.h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed" itemProp="description">
          {project.oneLiner}
        </p>
        <motion.ul 
          className="flex flex-wrap gap-2 text-xs" 
          aria-label="فناوری‌های استفاده‌شده"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {project.tech.map((t, techIndex) => (
            <motion.li 
              key={t} 
              className="rounded-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 px-3 py-1.5 font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
              itemProp="keywords"
              whileHover={{ scale: 1.1, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              {t}
            </motion.li>
          ))}
        </motion.ul>
        <div className="pt-2">
          <motion.div whileHover={{ x: -4 }}>
            <Link 
              className="inline-flex items-center gap-2 text-brand hover:text-brand-dark font-semibold transition-colors group/link" 
              href={`/projects/${project.slug}`}
              aria-label={`مشاهده جزئیات پروژه ${project.title}`}
              itemProp="url"
            >
              مطالعهٔ موردی را بخوانید
              <motion.svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                animate={{ x: [0, 4, 0] }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </motion.svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}


