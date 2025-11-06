import Link from 'next/link';
import Image from 'next/image';
import type { Post } from '@/lib/posts';

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="group rounded-xl border bg-white p-3 sm:p-4 shadow-sm transition hover:shadow-md dark:bg-gray-900 dark:border-gray-800" aria-labelledby={`${post.slug}-title`}>
      {post.image && (
        <div className="aspect-video overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
          <Image src={post.image} alt={`تصویر کاور ${post.title}`} width={800} height={450} sizes="(min-width: 640px) 50vw, 100vw" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
        </div>
      )}
      <h3 id={`${post.slug}-title`} className="mt-3 sm:mt-4 text-base sm:text-lg font-semibold">
        <Link href={`/blog/${post.slug}`} className="hover:underline">{post.title}</Link>
      </h3>
      <p className="mt-1 sm:mt-2 text-sm sm:text-base line-clamp-3 text-gray-700 dark:text-gray-300">{post.description}</p>
      <div className="mt-2 sm:mt-3 flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
        <time dateTime={new Date(post.date).toISOString()}>{new Date(post.date).toLocaleDateString('fa-IR')}</time>
        <span>•</span>
        {post.readingTime ? <span>{post.readingTime} دقیقه مطالعه</span> : <span>مطالعه سریع</span>}
      </div>
      {(post.categories && post.categories.length > 0) && (
        <div className="mt-2 sm:mt-3 flex flex-wrap items-center gap-2">
          {post.categories.map((cat, index) => (
            <Link 
              key={cat.slug}
              href={`/blog?category=${cat.slug}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1.5 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <span>📂</span>
              <span>{cat.name}</span>
            </Link>
          ))}
        </div>
      )}
      {(!post.categories || post.categories.length === 0) && post.category && (
        <div className="mt-2 sm:mt-3">
          <Link 
            href={`/blog?category=${post.category.slug}`}
            className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1.5 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <span>📂</span>
            <span>{post.category.name}</span>
          </Link>
        </div>
      )}
    </article>
  );
}


