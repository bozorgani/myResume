import Link from 'next/link';
import Image from 'next/image';
import type { Post } from '@/lib/posts';

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="group rounded-lg border p-4 transition-colors hover:border-brand" aria-labelledby={`${post.slug}-title`}>
      {post.image && (
        <div className="aspect-video overflow-hidden rounded bg-gray-100">
          <Image src={post.image} alt={`Cover image for ${post.title}`} width={800} height={450} sizes="(min-width: 640px) 50vw, 100vw" className="h-full w-full object-cover" />
        </div>
      )}
      <h3 id={`${post.slug}-title`} className="mt-3 text-lg font-semibold">
        <Link href={`/blog/${post.slug}`} className="hover:underline">{post.title}</Link>
      </h3>
      <p className="text-gray-700">{post.description}</p>
      <p className="mt-1 text-sm text-gray-500">{new Date(post.date).toLocaleDateString()}</p>
    </article>
  );
}


