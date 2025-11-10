'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getAllPosts, type Post } from '@/lib/posts';
import { PostCard } from '@/components/PostCard';
import { FadeInUp, StaggerChildren, StaggerItem } from './animations';

export function HomeBlogSection() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const allPosts = await getAllPosts();
        setPosts(allPosts.slice(0, 3));
      } catch {
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <section id="blog" aria-labelledby="blog-title" className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 id="blog-title" className="text-xl font-semibold">آخرین مقالات</h2>
        </div>
        <p className="text-gray-600 text-sm dark:text-gray-400">در حال بارگذاری...</p>
      </section>
    );
  }

  return (
    <section id="blog" aria-labelledby="blog-title" className="space-y-6">
      <FadeInUp>
        <div className="flex items-center justify-between">
          <h2 id="blog-title" className="text-xl font-semibold">آخرین مقالات</h2>
          <motion.div whileHover={{ x: -4 }}>
            <Link href="/blog" className="text-sm text-brand hover:underline inline-flex items-center gap-1">
              مشاهده همه
              <motion.svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                animate={{ x: [0, 3, 0] }}
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
      </FadeInUp>
      {posts.length === 0 ? (
        <FadeInUp delay={0.2}>
          <p className="text-gray-600 text-sm dark:text-gray-400">فعلاً مقاله‌ای منتشر نشده است.</p>
        </FadeInUp>
      ) : (
        <StaggerChildren className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.1}>
          {posts.map((p, idx) => (
            <StaggerItem key={p.slug}>
              <PostCard post={p} index={idx} />
            </StaggerItem>
          ))}
        </StaggerChildren>
      )}
    </section>
  );
}


