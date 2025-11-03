import type { Metadata } from 'next';
import { SITE, createPageMeta } from '@/lib/seo';
import { getAllPosts } from '@/lib/posts';
import { PostCard } from '@/components/PostCard';

export const metadata: Metadata = createPageMeta({
  title: `بلاگ | ${SITE.name}`,
  description: `مقالات ${SITE.name} درباره عملکرد، سئو و توسعه فول‌استک`,
  url: `${SITE.domain}/blog`
});

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">بلاگ</h1>
      <div className="grid gap-6 sm:grid-cols-2">
        {posts.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>
    </div>
  );
}


