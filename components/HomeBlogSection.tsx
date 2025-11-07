import Link from 'next/link';
import { getAllPosts, type Post } from '@/lib/posts';
import { PostCard } from '@/components/PostCard';

export async function HomeBlogSection() {
  let posts: Post[] = [];
  try {
    posts = await getAllPosts();
  } catch {
    posts = [];
  }
  const latest = posts.slice(0, 3);
  return (
    <section id="blog" aria-labelledby="blog-title" className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 id="blog-title" className="text-xl font-semibold">آخرین مقالات</h2>
        <Link href="/blog" className="text-sm text-brand hover:underline">مشاهده همه</Link>
      </div>
      {latest.length === 0 ? (
        <p className="text-gray-600 text-sm dark:text-gray-400">فعلاً مقاله‌ای منتشر نشده است.</p>
      ) : (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      )}
    </section>
  );
}


