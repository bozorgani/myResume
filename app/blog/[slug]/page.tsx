import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SITE, createPageMeta } from '@/lib/seo';
import { getAllPosts, getPostBySlug } from '@/lib/posts';
import Image from 'next/image';
import Link from 'next/link';
import { Schema } from '@/components/Schema';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type Params = { slug: string };

// Note: generateStaticParams is not used when dynamic = 'force-dynamic'
// but we keep it for type safety
export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};
  const base = createPageMeta({
    title: `${post.title} | ${SITE.name}`,
    description: post.description,
    url: post.canonicalUrl || `${SITE.domain}/blog/${post.slug}`,
    image: post.image
  });
  return {
    ...base,
    alternates: { canonical: post.canonicalUrl || `${SITE.domain}/blog/${post.slug}` },
    openGraph: {
      ...base.openGraph,
      type: 'article',
      publishedTime: post.date
    }
  };
}

function extractHeadings(html: string): { id: string; text: string; level: 2 | 3 }[] {
  const out: { id: string; text: string; level: 2 | 3 }[] = [];
  const regex = /<h([23])(?:[^>]*)>([\s\S]*?)<\/h\1>/gi;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(html))) {
    const level = Number(m[1]) as 2 | 3;
    const text = m[2].replace(/<[^>]+>/g, '').trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\u0600-\u06FF\s-]/g, '')
      .replace(/\s+/g, '-');
    out.push({ id, text, level });
  }
  return out;
}

function addIdsToHeadings(html: string): string {
  return html.replace(/<h([23])(?![^>]*id=)([^>]*)>([\s\S]*?)<\/h\1>/gi, (_s, lvl, attrs, inner) => {
    const text = String(inner).replace(/<[^>]+>/g, '').trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\u0600-\u06FF\s-]/g, '')
      .replace(/\s+/g, '-');
    return `<h${lvl} id="${id}" ${attrs}>${inner}</h${lvl}>`;
  });
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return notFound();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { '@type': 'Person', name: SITE.name },
    image: post.image ? [post.image] : undefined,
    mainEntityOfPage: `${SITE.domain}/blog/${post.slug}`
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'صفحه اصلی', item: `${SITE.domain}` },
      { '@type': 'ListItem', position: 2, name: 'بلاگ', item: `${SITE.domain}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${SITE.domain}/blog/${post.slug}` }
    ]
  };

  const contentWithIds = addIdsToHeadings(post.content);
  const toc = extractHeadings(contentWithIds);

  const all = await getAllPosts();
  const idx = all.findIndex((p) => p.slug === post.slug);
  const prev = idx > 0 ? all[idx - 1] : undefined;
  const next = idx >= 0 && idx < all.length - 1 ? all[idx + 1] : undefined;

  return (
    <article className="max-w-none">
      <Schema json={articleSchema} />
      <Schema json={breadcrumbSchema} />
      <Breadcrumbs items={[{ name: 'صفحه اصلی', href: '/' }, { name: 'بلاگ', href: '/blog' }, { name: post.title }]} />

      <header className="mt-4 rounded-2xl border bg-white p-4 sm:p-6 shadow-sm">
        {post.image && (
          <div className="relative mb-4 sm:mb-5 overflow-hidden rounded-xl">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={post.image}
                alt={`کاور ${post.title}`}
                fill
                sizes="(min-width: 1024px) 1000px, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}
        <h1 id="post-title" className="text-2xl sm:text-3xl font-bold tracking-tight">{post.title}</h1>
        <div className="mt-3 flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
          <time dateTime={new Date(post.date).toISOString()}>{new Date(post.date).toLocaleDateString('fa-IR')}</time>
          <span>•</span>
          {post.readingTime ? <span>{post.readingTime} دقیقه مطالعه</span> : <span>مطالعه سریع</span>}
        </div>
        {(post.category || (post.tags && post.tags.length > 0)) && (
          <div className="mt-3 flex flex-wrap items-center gap-2 sm:gap-3">
            {post.category && (
              <Link 
                href={`/blog?category=${post.category.slug}`}
                className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs sm:text-sm text-gray-700 hover:bg-gray-200 transition-colors"
              >
                <span>📂</span>
                <span>{post.category.name}</span>
              </Link>
            )}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag.slug}
                    href={`/blog?tag=${tag.slug}`}
                    className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs text-blue-700 hover:bg-blue-100 transition-colors"
                  >
                    <span>🏷️</span>
                    <span>{tag.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
        {post.description && <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-700">{post.description}</p>}
      </header>

      <div className="mt-6 sm:mt-8 grid gap-6 sm:gap-8 lg:grid-cols-[1fr_280px]">
        <div className="prose prose-sm sm:prose-base max-w-none prose-headings:scroll-mt-24">
          <div className="text-sm sm:text-base text-gray-800" dangerouslySetInnerHTML={{ __html: contentWithIds }} />
        </div>
        {toc.length > 0 && (
          <aside className="top-28 h-max rounded-xl border bg-white p-3 sm:p-4 text-xs sm:text-sm shadow-sm lg:sticky" aria-label="فهرست مطالب">
            <h2 className="mb-2 sm:mb-3 text-sm sm:text-base font-semibold">فهرست مطالب</h2>
            <nav>
              <ul className="space-y-1.5 sm:space-y-2">
                {toc.map((h) => (
                  <li key={h.id} className={h.level === 3 ? 'pr-2 sm:pr-3' : ''}>
                    <a href={`#${h.id}`} className="text-gray-700 hover:text-black">
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        )}
      </div>

      {(prev || next) && (
        <nav className="mt-8 sm:mt-10 grid gap-3 sm:gap-4 sm:grid-cols-2" aria-label="پیمایش مقاله‌ها">
          {prev && (
            <a href={`/blog/${prev.slug}`} className="group rounded-xl border bg-white p-3 sm:p-4 shadow-sm hover:bg-gray-50">
              <div className="mb-1 text-xs text-gray-500">مقاله قبلی</div>
              <div className="line-clamp-2 text-sm sm:text-base font-medium group-hover:underline">{prev.title}</div>
            </a>
          )}
          {next && (
            <a href={`/blog/${next.slug}`} className="group rounded-xl border bg-white p-3 sm:p-4 shadow-sm hover:bg-gray-50 sm:justify-self-end">
              <div className="mb-1 text-xs text-gray-500">مقاله بعدی</div>
              <div className="line-clamp-2 text-sm sm:text-base font-medium group-hover:underline">{next.title}</div>
            </a>
          )}
        </nav>
      )}
    </article>
  );
}


