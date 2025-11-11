'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import type { Post } from '@/lib/posts';
import { getPostUrl } from '@/lib/posts';

export function PostCard({ post, index = 0 }: { post: Post; index?: number }) {
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
      className="group rounded-lg sm:rounded-xl border bg-white p-3 sm:p-4 md:p-5 shadow-sm transition hover:shadow-xl dark:bg-gray-900 dark:border-gray-800 h-full flex flex-col relative" 
      aria-labelledby={`${post.slug}-title`}
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
        y: isHovered ? -4 : 0,
      }}
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
          background: `radial-gradient(400px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.3), transparent 40%)`,
        }}
      />
      {post.image && (
        <motion.div 
          className="aspect-video overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 mb-3 sm:mb-4 relative"
          style={{ transform: 'translateZ(20px)' }}
          animate={{
            scale: isHovered ? 1.03 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <Image 
            src={post.image} 
            alt={`تصویر کاور ${post.title}`} 
            width={800} 
            height={450} 
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" 
            className="h-full w-full object-cover transition-transform duration-300" 
          />
        </motion.div>
      )}
      <div className="relative" style={{ transform: 'translateZ(10px)' }}>
        <motion.h3 
          id={`${post.slug}-title`} 
          className="mt-0 sm:mt-1 text-base sm:text-lg md:text-xl font-semibold line-clamp-2 leading-snug"
          whileHover={{ x: 4 }}
        >
          <Link href={getPostUrl(post) as any} className="hover:underline text-gray-900 dark:text-gray-100">{post.title}</Link>
        </motion.h3>
        <p className="mt-2 sm:mt-3 text-sm sm:text-base line-clamp-3 text-gray-700 dark:text-gray-300 flex-grow">{post.description}</p>
      </div>
      <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
        <time dateTime={new Date(post.date).toISOString()} className="whitespace-nowrap">{new Date(post.date).toLocaleDateString('fa-IR')}</time>
        <span>•</span>
        {post.readingTime ? <span className="whitespace-nowrap">{post.readingTime} دقیقه مطالعه</span> : <span className="whitespace-nowrap">مطالعه سریع</span>}
      </div>
      {(post.categories && post.categories.length > 0) && (
        <div className="hidden md:block mt-3 sm:mt-4 w-full">
          <div className="overflow-x-auto scrollbar-hide sm:overflow-x-visible">
            <div className="flex items-center gap-2 flex-nowrap sm:flex-wrap sm:w-full">
              {post.categories.map((cat, catIndex) => (
                <motion.div
                  key={cat.slug}
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link 
                    href={`/blog?category=${cat.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 dark:bg-gray-800 px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors whitespace-nowrap shrink-0"
                  >
                    <span className="text-xs sm:text-sm">📂</span>
                    <span>{cat.name}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
      {(!post.categories || post.categories.length === 0) && post.category && (
        <div className="hidden md:block mt-3 sm:mt-4">
          <motion.div whileHover={{ scale: 1.05, y: -2 }}>
            <Link 
              href={`/blog?category=${post.category.slug}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 dark:bg-gray-800 px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <span className="text-xs sm:text-sm">📂</span>
              <span>{post.category.name}</span>
            </Link>
          </motion.div>
        </div>
      )}
    </motion.article>
  );
}


