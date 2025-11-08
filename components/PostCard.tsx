import Link from 'next/link';
import Image from 'next/image';
import type { Post } from '@/lib/posts';
import { getPostUrl } from '@/lib/posts';

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="group rounded-lg sm:rounded-xl border bg-white p-3 sm:p-4 md:p-5 shadow-sm transition hover:shadow-md dark:bg-gray-900 dark:border-gray-800 h-full flex flex-col" aria-labelledby={`${post.slug}-title`}>
      {post.image && (
        <div className="aspect-video overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 mb-3 sm:mb-4">
          <Image src={post.image} alt={`تصویر کاور ${post.title}`} width={800} height={450} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
        </div>
      )}
      <h3 id={`${post.slug}-title`} className="mt-0 sm:mt-1 text-base sm:text-lg md:text-xl font-semibold line-clamp-2 leading-snug">
        <Link href={getPostUrl(post) as any} className="hover:underline text-gray-900 dark:text-gray-100">{post.title}</Link>
      </h3>
      <p className="mt-2 sm:mt-3 text-sm sm:text-base line-clamp-3 text-gray-700 dark:text-gray-300 flex-grow">{post.description}</p>
      <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
        <time dateTime={new Date(post.date).toISOString()} className="whitespace-nowrap">{new Date(post.date).toLocaleDateString('fa-IR')}</time>
        <span>•</span>
        {post.readingTime ? <span className="whitespace-nowrap">{post.readingTime} دقیقه مطالعه</span> : <span className="whitespace-nowrap">مطالعه سریع</span>}
      </div>
      {(post.categories && post.categories.length > 0) && (
        <div className="hidden md:block mt-3 sm:mt-4 w-full">
          <div className="overflow-x-auto scrollbar-hide sm:overflow-x-visible">
            <div className="flex items-center gap-2 flex-nowrap sm:flex-wrap sm:w-full">
              {post.categories.map((cat, index) => (
                <Link 
                  key={cat.slug}
                  href={`/blog?category=${cat.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 dark:bg-gray-800 px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors whitespace-nowrap shrink-0"
                >
                  <span className="text-xs sm:text-sm">📂</span>
                  <span>{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
      {(!post.categories || post.categories.length === 0) && post.category && (
        <div className="hidden md:block mt-3 sm:mt-4">
          <Link 
            href={`/blog?category=${post.category.slug}`}
            className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 dark:bg-gray-800 px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <span className="text-xs sm:text-sm">📂</span>
            <span>{post.category.name}</span>
          </Link>
        </div>
      )}
    </article>
  );
}


