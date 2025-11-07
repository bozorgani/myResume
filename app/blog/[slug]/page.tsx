import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SITE, createPageMeta } from '@/lib/seo';
import { getAllPosts, getPostBySlug, type Post } from '@/lib/posts';
import Image from 'next/image';
import Link from 'next/link';
import { Schema } from '@/components/Schema';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ScrollToTop } from '@/components/ScrollToTop';

// بهینه‌سازی: استفاده از ISR برای بهتر شدن performance
export const revalidate = 300; // 5 minutes

type Params = { slug: string };

// Note: generateStaticParams is not used when dynamic = 'force-dynamic'
// but we keep it for type safety
export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return createPageMeta({
      title: `مقاله پیدا نشد | ${SITE.name}`,
      description: `مقاله مورد نظر یافت نشد. به صفحه بلاگ بازگردید.`,
      url: `${SITE.domain}/blog`
    });
  }
  // Ensure description exists and is not empty
  const description = post.description && post.description.trim() 
    ? post.description 
    : `مقاله ${post.title} از بلاگ ${SITE.name} درباره توسعه Full-Stack، بهینه‌سازی عملکرد و سئو فنی.`;
  
  // Extract keywords from categories and tags
  const keywords = [
    ...(post.categories?.map(c => c.name) || []),
    ...(post.tags?.map(t => t.name) || []),
    post.category?.name,
    'مقالات توسعه وب',
    'بلاگ',
    'Next.js',
    'React',
    'سئو فنی'
  ].filter(Boolean) as string[];

  const base = createPageMeta({
    title: `${post.title} | ${SITE.name}`,
    description: description,
    url: post.canonicalUrl || `${SITE.domain}/blog/${post.slug}`,
    image: post.image,
    keywords: keywords,
    author: SITE.name,
    publishedTime: post.date,
    modifiedTime: post.date,
    type: 'article',
    section: post.categories?.[0]?.name || post.category?.name
  });
  
  return base;
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

  // Extract keywords from categories and tags
  const keywords = [
    ...(post.categories?.map(c => c.name) || []),
    ...(post.tags?.map(t => t.name) || []),
    post.category?.name,
    'مقالات توسعه وب',
    'بلاگ',
    'Next.js',
    'React',
    'سئو فنی'
  ].filter(Boolean) as string[];

  // Calculate word count from content
  const wordCount = post.content ? post.content.replace(/<[^>]*>/g, '').split(/\s+/).length : 0;
  
  const description = post.description && post.description.trim() 
    ? post.description 
    : `مقاله ${post.title} از بلاگ ${SITE.name} درباره توسعه Full-Stack، بهینه‌سازی عملکرد و سئو فنی.`;
  
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: description,
    datePublished: post.date,
    dateModified: post.date,
    author: { 
      '@type': 'Person', 
      name: SITE.name,
      url: SITE.domain,
      sameAs: [SITE.github, SITE.linkedin]
    },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE.domain}/images/og-default.png`
      }
    },
    image: post.image ? [post.image.startsWith('http') ? post.image : `${SITE.domain}${post.image}`] : [`${SITE.domain}${SITE.ogImage}`],
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE.domain}/blog/${post.slug}`
    },
    articleSection: post.categories?.[0]?.name || post.category?.name || 'توسعه وب',
    keywords: keywords.join(', '),
    wordCount: wordCount,
    inLanguage: 'fa-IR',
    ...(post.readingTime && { timeRequired: `PT${post.readingTime}M` })
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

  // فقط پست‌های قبلی و بعدی را بگیر (نه همه پست‌ها) برای بهتر شدن performance
  // برای سادگی، از getAllPosts استفاده می‌کنیم اما می‌توان در آینده بهینه کرد
  let prev: Post | undefined;
  let next: Post | undefined;
  try {
    const all = await getAllPosts();
    const idx = all.findIndex((p) => p.slug === post.slug);
    prev = idx > 0 ? all[idx - 1] : undefined;
    next = idx >= 0 && idx < all.length - 1 ? all[idx + 1] : undefined;
  } catch (error) {
    console.error('[BlogPostPage] Error fetching all posts for navigation:', error);
    // اگر خطا رخ داد، navigation را نمایش نده
  }

  return (
    <article className="max-w-none">
      <Schema json={articleSchema} />
      <Schema json={breadcrumbSchema} />
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: 'صفحه اصلی', href: '/' }, { name: 'بلاگ', href: '/blog' }, { name: post.title }]} />

        {/* Article Header */}
        <header className="mt-3 sm:mt-4 md:mt-6 mb-6 sm:mb-8 md:mb-10 lg:mb-14 max-w-7xl">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-gray-200/80 dark:border-gray-800/80 bg-gradient-to-br from-white via-gray-50/50 to-white dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 shadow-xl dark:shadow-2xl backdrop-blur-sm">
          {/* Decorative gradient overlay */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-90"></div>
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] bg-[radial-gradient(circle_at_1px_1px,_currentColor_1px,_transparent_0)] bg-[length:24px_24px]"></div>
          
          {post.image && (
            <div className="relative mb-4 sm:mb-6 md:mb-8 lg:mb-10 overflow-hidden rounded-xl sm:rounded-2xl shadow-2xl ring-2 ring-gray-200/50 dark:ring-gray-700/50 group">
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image
                  src={post.image}
                  alt={`کاور ${post.title}`}
                  fill
                  sizes="(min-width: 1024px) 1200px, 100vw"
                  className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-105"
                  priority
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent pointer-events-none"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-700 pointer-events-none"></div>
            </div>
          )}
          
          <div className="relative z-10">
            <h1 id="post-title" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50 leading-[1.1] mb-3 sm:mb-4 md:mb-5 lg:mb-6">
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-gray-50 dark:via-gray-100 dark:to-gray-50 bg-clip-text text-transparent">
                {post.title}
              </span>
            </h1>
            
            {post.description && (
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-4 sm:mb-5 md:mb-6 lg:mb-7 xl:mb-8 leading-relaxed font-normal">
                {post.description}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm md:text-base mb-4 sm:mb-5 md:mb-6 pb-4 sm:pb-5 md:pb-6 border-b border-gray-200/80 dark:border-gray-700/80">
              <time 
                dateTime={new Date(post.date).toISOString()} 
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 md:py-2.5 rounded-lg sm:rounded-xl bg-gray-100/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 font-medium backdrop-blur-sm hover:bg-gray-200/80 dark:hover:bg-gray-700/80 transition-colors"
              >
                <span className="text-base sm:text-lg leading-none">📅</span>
                <span className="whitespace-nowrap">{new Date(post.date).toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </time>
              {post.readingTime ? (
                <span className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 md:py-2.5 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-50 to-blue-100/80 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-700 dark:text-blue-300 font-medium backdrop-blur-sm hover:from-blue-100 hover:to-blue-200 dark:hover:from-blue-800/40 dark:hover:to-blue-700/40 transition-all">
                  <span className="text-base sm:text-lg leading-none">⏱️</span>
                  <span className="whitespace-nowrap">{post.readingTime} دقیقه مطالعه</span>
                </span>
              ) : (
                <span className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 md:py-2.5 rounded-lg sm:rounded-xl bg-gradient-to-r from-green-50 to-emerald-50/80 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-300 font-medium backdrop-blur-sm hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-800/40 dark:hover:to-emerald-800/40 transition-all">
                  <span className="text-base sm:text-lg leading-none">⚡</span>
                  <span className="whitespace-nowrap">مطالعه سریع</span>
                </span>
              )}
            </div>
          </div>

          {((post.categories && post.categories.length > 0) || post.category) && (
            <div className="hidden md:block relative z-10 pt-4 sm:pt-5 md:pt-6 border-t-2 border-gray-200/80 dark:border-gray-700/80">
              {(post.categories && post.categories.length > 0) && (
                <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-2 sm:gap-3">
                  <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest whitespace-nowrap">دسته‌بندی‌ها</span>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 w-full sm:w-auto">
                    {post.categories.map((cat) => (
                      <Link 
                        key={cat.slug}
                        href={`/blog?category=${cat.slug}`}
                        className="group relative inline-flex items-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl bg-gradient-to-br from-gray-100 to-gray-200/80 dark:from-gray-800 dark:to-gray-700/80 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5 backdrop-blur-sm"
                      >
                        <span className="text-sm sm:text-base transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">📂</span>
                        <span className="relative z-10">{cat.name}</span>
                        <span className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-300"></span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              {(!post.categories || post.categories.length === 0) && post.category && (
                <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-2 sm:gap-3">
                  <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest whitespace-nowrap">دسته‌بندی</span>
                  <Link 
                    href={`/blog?category=${post.category.slug}`}
                    className="group relative inline-flex items-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl bg-gradient-to-br from-gray-100 to-gray-200/80 dark:from-gray-800 dark:to-gray-700/80 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5 backdrop-blur-sm"
                  >
                    <span className="text-sm sm:text-base transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">📂</span>
                    <span className="relative z-10">{post.category.name}</span>
                    <span className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-300"></span>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

        {/* Article Content */}
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px] lg:gap-10 xl:gap-12">
          <div className="min-w-0 max-w-6xl lg:max-w-7xl order-2 lg:order-1">
            <div 
              className="blog-content rounded-2xl sm:rounded-3xl border border-gray-200/80 dark:border-gray-800/80 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 shadow-xl dark:shadow-2xl"
              dangerouslySetInnerHTML={{ __html: contentWithIds }} 
            />
          </div>
        
        {toc.length > 0 && (
          <aside className="lg:sticky lg:top-6 h-max order-1 lg:order-2 mb-6 lg:mb-0">
            <div className="rounded-xl sm:rounded-2xl border-2 border-gray-200/80 dark:border-gray-800/80 bg-gradient-to-br from-white/90 via-gray-50/90 to-white/90 dark:from-gray-900/90 dark:via-gray-950/90 dark:to-gray-900/90 backdrop-blur-md p-4 sm:p-6 shadow-xl dark:shadow-2xl">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b-2 border-gray-200/80 dark:border-gray-700/80">
                <span className="text-xl sm:text-2xl leading-none">📑</span>
                <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100">فهرست مطالب</h2>
              </div>
              <nav className="max-h-[400px] sm:max-h-[500px] lg:max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
                <ul className="space-y-2 sm:space-y-2.5">
                  {toc.map((h) => (
                    <li key={h.id} className={h.level === 3 ? 'pr-4 sm:pr-6' : ''}>
                      <a 
                        href={`#${h.id}`} 
                        className="group flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 leading-relaxed py-1 sm:py-1.5 px-2 rounded-lg hover:bg-blue-50/50 dark:hover:bg-blue-900/10"
                      >
                        <span className={`mt-1 sm:mt-1.5 flex-shrink-0 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gray-300 dark:bg-gray-600 group-hover:bg-blue-600 dark:group-hover:bg-blue-400 transition-all duration-300 group-hover:scale-125 ${h.level === 3 ? 'mr-1.5 sm:mr-2' : ''}`}></span>
                        <span className="group-hover:translate-x-[-3px] transition-transform duration-200 flex-1">{h.text}</span>
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
          <nav className="mt-8 sm:mt-10 md:mt-12 lg:mt-16 xl:mt-20 grid gap-4 sm:gap-5 md:gap-6 sm:grid-cols-2 max-w-6xl" aria-label="پیمایش مقاله‌ها">
          {prev && (
            <Link 
              href={`/blog/${prev.slug}`} 
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl border-2 border-gray-200/80 dark:border-gray-800/80 bg-gradient-to-br from-white/90 via-gray-50/90 to-white/90 dark:from-gray-900/90 dark:via-gray-950/90 dark:to-gray-900/90 backdrop-blur-md p-4 sm:p-6 md:p-8 shadow-xl hover:shadow-2xl hover:border-blue-300/80 dark:hover:border-blue-700/80 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-blue-600 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              <div className="flex items-start gap-3 sm:gap-4 relative z-10">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200/80 dark:from-blue-900/40 dark:to-blue-800/40 flex items-center justify-center group-hover:scale-110 group-hover:rotate-[-5deg] transition-all duration-300 shadow-lg group-hover:shadow-blue-500/50">
                  <span className="text-lg sm:text-xl md:text-2xl leading-none">←</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="mb-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">مقاله قبلی</div>
                  <div className="text-sm sm:text-base md:text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                    {prev.title}
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300 rounded-xl sm:rounded-2xl"></div>
            </Link>
          )}
          {next && (
            <Link 
              href={`/blog/${next.slug}`} 
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl border-2 border-gray-200/80 dark:border-gray-800/80 bg-gradient-to-br from-white/90 via-gray-50/90 to-white/90 dark:from-gray-900/90 dark:via-gray-950/90 dark:to-gray-900/90 backdrop-blur-md p-4 sm:p-6 md:p-8 shadow-xl hover:shadow-2xl hover:border-purple-300/80 dark:hover:border-purple-700/80 transition-all duration-300 hover:-translate-y-1 sm:justify-self-end"
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              <div className="flex items-start gap-3 sm:gap-4 relative z-10">
                <div className="flex-1 min-w-0 text-left sm:text-right">
                  <div className="mb-2 text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest">مقاله بعدی</div>
                  <div className="text-sm sm:text-base md:text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2 leading-snug">
                    {next.title}
                  </div>
                </div>
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-100 to-pink-200/80 dark:from-purple-900/40 dark:to-pink-800/40 flex items-center justify-center group-hover:scale-110 group-hover:rotate-[5deg] transition-all duration-300 shadow-lg group-hover:shadow-purple-500/50">
                  <span className="text-lg sm:text-xl md:text-2xl leading-none">→</span>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 transition-all duration-300 rounded-xl sm:rounded-2xl"></div>
            </Link>
          )}
          </nav>
        )}

        <ScrollToTop />
      </div>
    </article>
  );
}


