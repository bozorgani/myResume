'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import type { Project } from '@/lib/projects';

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const ref = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['5deg', '-5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-5deg', '5deg']);

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
      className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-all duration-300 hover:shadow-2xl" 
      aria-labelledby={`${project.slug}-title`}
      itemProp="item"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
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
        y: isHovered ? -8 : 0,
      }}
    >
      {/* Magic Bento gradient border */}
      <motion.div 
        className="absolute -inset-0.5 rounded-xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.8), rgba(147, 51, 234, 0.8), rgba(236, 72, 153, 0.8))',
        }}
        animate={{ opacity: isHovered ? 1 : 0 }}
      />
      
      {/* Glow effect following mouse */}
      <motion.div
        className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.4), transparent 40%)`,
        }}
      />
      <motion.div 
        className="aspect-video overflow-hidden rounded-t-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 relative"
        style={{ transform: 'translateZ(20px)' }}
        animate={{
          scale: isHovered ? 1.05 : 1,
        }}
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
      <div className="p-5 space-y-3 relative" style={{ transform: 'translateZ(10px)' }}>
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


