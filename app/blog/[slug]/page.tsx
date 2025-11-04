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

      {/* Article Header */}
      <header className="mt-6 mb-8">
        <div className="rounded-2xl border bg-white p-6 sm:p-8 lg:p-10 shadow-sm">
          {post.image && (
            <div className="relative mb-6 sm:mb-8 overflow-hidden rounded-xl shadow-md">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={post.image}
                  alt={`کاور ${post.title}`}
                  fill
                  sizes="(min-width: 1024px) 1200px, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          )}
          
          <h1 id="post-title" className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 leading-tight mb-4">
            {post.title}
          </h1>
          
          {post.description && (
            <p className="text-lg sm:text-xl text-gray-600 mb-6 leading-relaxed">
              {post.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm sm:text-base text-gray-600 mb-4">
            <time dateTime={new Date(post.date).toISOString()} className="flex items-center gap-1">
              <span>📅</span>
              <span>{new Date(post.date).toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </time>
            <span className="text-gray-400">•</span>
            {post.readingTime ? (
              <span className="flex items-center gap-1">
                <span>⏱️</span>
                <span>{post.readingTime} دقیقه مطالعه</span>
              </span>
            ) : (
              <span>مطالعه سریع</span>
            )}
          </div>

          {(post.category || (post.tags && post.tags.length > 0)) && (
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-4 border-t border-gray-200">
              {post.category && (
                <Link 
                  href={`/blog?category=${post.category.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
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
                      className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-sm text-blue-700 hover:bg-blue-100 transition-colors"
                    >
                      <span>🏷️</span>
                      <span>{tag.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Article Content */}
      <div className="grid gap-8 lg:grid-cols-[1fr_300px] lg:gap-12">
        <div className="min-w-0">
          <div 
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: contentWithIds }} 
          />
        </div>
        
        {toc.length > 0 && (
          <aside className="lg:sticky lg:top-24 h-max">
            <div className="rounded-xl border bg-white p-4 sm:p-5 shadow-sm">
              <h2 className="mb-4 text-base font-bold text-gray-900">فهرست مطالب</h2>
              <nav>
                <ul className="space-y-2">
                  {toc.map((h) => (
                    <li key={h.id} className={h.level === 3 ? 'pr-4' : ''}>
                      <a 
                        href={`#${h.id}`} 
                        className="block text-sm text-gray-700 hover:text-brand dark:hover:text-brand-dark transition-colors leading-relaxed"
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>
        )}
      </div>

      {/* Navigation */}
      {(prev || next) && (
        <nav className="mt-12 sm:mt-16 grid gap-4 sm:grid-cols-2" aria-label="پیمایش مقاله‌ها">
          {prev && (
            <Link 
              href={`/blog/${prev.slug}`} 
              className="group rounded-xl border bg-white p-5 sm:p-6 shadow-sm hover:bg-gray-50 hover:shadow-md transition-all"
            >
              <div className="mb-2 text-xs font-medium text-gray-500 uppercase tracking-wide">مقاله قبلی</div>
              <div className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-brand transition-colors line-clamp-2">
                {prev.title}
              </div>
            </Link>
          )}
          {next && (
            <Link 
              href={`/blog/${next.slug}`} 
              className="group rounded-xl border bg-white p-5 sm:p-6 shadow-sm hover:bg-gray-50 hover:shadow-md transition-all sm:justify-self-end"
            >
              <div className="mb-2 text-xs font-medium text-gray-500 uppercase tracking-wide text-left sm:text-right">مقاله بعدی</div>
              <div className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-brand transition-colors line-clamp-2">
                {next.title}
              </div>
            </Link>
          )}
        </nav>
      )}
    </article>
  );
}


