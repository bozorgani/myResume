import type { Metadata } from 'next';
import { SITE, createPageMeta } from '@/lib/seo';
import { getAllPosts, getAllCategories } from '@/lib/posts';
import { Schema } from '@/components/Schema';
import Link from 'next/link';
import Image from 'next/image';
import { PostCard } from '@/components/PostCard';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = createPageMeta({
  title: `بلاگ | ${SITE.name}`,
  description: `مجموعه مقالات تخصصی ${SITE.name} درباره توسعه Full-Stack با Next.js و React، بهینه‌سازی عملکرد وب‌سایت‌ها، بهبود Core Web Vitals، و بهترین شیوه‌های سئو فنی. تجربیات عملی، راهنماهای گام‌به‌گام، و نکات پیشرفته در زمینه توسعه وب.`,
  url: `${SITE.domain}/blog`,
  keywords: [
    'مقالات توسعه وب',
    'بلاگ Next.js',
    'مقالات React',
    'مقالات سئو فنی',
    'بهینه‌سازی عملکرد',
    'Core Web Vitals',
    'توسعه Full-Stack',
    'مقالات برنامه‌نویسی'
  ]
});

export default async function BlogPage({ searchParams }: { searchParams?: { q?: string; page?: string; category?: string; tag?: string } }) {
  let posts: Awaited<ReturnType<typeof getAllPosts>>;
  let categories: Awaited<ReturnType<typeof getAllCategories>>;
  try {
    posts = await getAllPosts();
  } catch (error) {
    posts = [];
  }
  
  try {
    categories = await getAllCategories();
  } catch (error) {
    categories = [];
  }
  
  const query = (searchParams?.q || '').trim();
  const categorySlug = searchParams?.category;
  const tagSlug = searchParams?.tag;

  let filtered = posts;
  
  if (categorySlug) {
    filtered = filtered.filter((p) => {
      // Check if category matches in categories array
      if (p.categories && p.categories.length > 0) {
        return p.categories.some((cat) => cat.slug === categorySlug);
      }
      // Fallback to single category
      return p.category?.slug === categorySlug;
    });
  }
  
  if (tagSlug) {
    filtered = filtered.filter((p) => p.tags?.some((tag) => tag.slug === tagSlug));
  }

  if (query) {
    filtered = filtered.filter((p) => {
      const hay = `${p.title} ${p.description}`.toLowerCase();
      return hay.includes(query.toLowerCase());
    });
  }

  const pageSize = 9;
  const currentPage = Math.max(1, parseInt(searchParams?.page || '1', 10) || 1);
  const totalPages = Math.max(1, Math.ceil(Math.max(0, filtered.length - 1) / pageSize));

  const [first, ...restAll] = filtered;
  const restSource = restAll.length ? restAll : filtered;
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const paginatedRest = restSource.slice(start, end);

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${SITE.name} Blog`,
    url: `${SITE.domain}/blog`,
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      description: p.description,
      datePublished: p.date,
      url: `${SITE.domain}/blog/${p.slug}`,
      image: p.image ? [p.image] : undefined
    }))
  } as const;

  return (
    <div className="space-y-8 sm:space-y-10 lg:space-y-12">
      <Schema json={blogSchema} />

      <header className="relative overflow-hidden rounded-3xl border-2 border-gray-200/80 dark:border-gray-800/80 bg-gradient-to-br from-white via-gray-50/50 to-white dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 p-8 sm:p-10 lg:p-12 shadow-xl dark:shadow-2xl backdrop-blur-sm">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-90"></div>
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] bg-[radial-gradient(circle_at_1px_1px,_currentColor_1px,_transparent_0)] bg-[length:24px_24px]"></div>
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-gray-50 dark:via-gray-100 dark:to-gray-50 bg-clip-text text-transparent">
              بلاگ {SITE.name}
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            مجموعه مقالات تخصصی درباره توسعه Full-Stack با Next.js و React، بهینه‌سازی عملکرد وب‌سایت‌ها، بهبود Core Web Vitals، و بهترین شیوه‌های سئو فنی. در این بلاگ تجربیات عملی، راهنماهای گام‌به‌گام، و نکات پیشرفته در زمینه توسعه وب و بهبود رتبه‌بندی در موتورهای جستجو را به اشتراک می‌گذارم.
          </p>
        </div>
      </header>

      {first && (
        <section className="group overflow-hidden rounded-3xl border-2 border-gray-200/80 dark:border-gray-800/80 bg-gradient-to-br from-white/90 via-gray-50/90 to-white/90 dark:from-gray-900/90 dark:via-gray-950/90 dark:to-gray-900/90 backdrop-blur-sm shadow-xl dark:shadow-2xl hover:shadow-2xl transition-all duration-300">
          <div className="grid gap-0 sm:gap-6 lg:grid-cols-2">
            {first.image && (
              <div className="relative aspect-[16/10] w-full lg:aspect-auto lg:min-h-[400px] overflow-hidden">
                <Image
                  src={first.image}
                  alt={`کاور ${first.title}`}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-700"></div>
              </div>
            )}
            <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-4 leading-tight">
                <Link href={`/blog/${first.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-50 dark:to-gray-300 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-purple-600 dark:group-hover:from-blue-400 dark:group-hover:to-purple-400 transition-all">
                    {first.title}
                  </span>
                </Link>
              </h2>
              <p className="mt-2 sm:mt-3 text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3">{first.description}</p>
              <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <time dateTime={new Date(first.date).toISOString()} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100/80 dark:bg-gray-800/80">
                  <span>📅</span>
                  <span>{new Date(first.date).toLocaleDateString('fa-IR')}</span>
                </time>
                {first.readingTime ? (
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50/80 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                    <span>⏱️</span>
                    <span>{first.readingTime} دقیقه</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-50/80 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                    <span>⚡</span>
                    <span>سریع</span>
                  </span>
                )}
              </div>
              {(first.categories && first.categories.length > 0) && (
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {first.categories.map((cat) => (
                    <Link 
                      key={cat.slug}
                      href={`/blog?category=${cat.slug}`}
                      className="group inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200/80 dark:from-gray-800 dark:to-gray-700/80 px-3.5 py-1.5 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                    >
                      <span className="text-sm transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">📂</span>
                      <span>{cat.name}</span>
                    </Link>
                  ))}
                </div>
              )}
              {(!first.categories || first.categories.length === 0) && first.category && (
                <div className="mt-4">
                  <Link 
                    href={`/blog?category=${first.category.slug}`}
                    className="group inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200/80 dark:from-gray-800 dark:to-gray-700/80 px-3.5 py-1.5 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                  >
                    <span className="text-sm transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">📂</span>
                    <span>{first.category.name}</span>
                  </Link>
                </div>
              )}
              <Link 
                href={`/blog/${first.slug}`} 
                className="mt-6 sm:mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm sm:text-base font-semibold text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
              >
                <span>مطالعه مقاله</span>
                <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Categories Section */}
      {categories.length > 0 && (
        <section className="rounded-2xl border-2 border-gray-200/80 dark:border-gray-800/80 bg-gradient-to-br from-white/90 via-gray-50/90 to-white/90 dark:from-gray-900/90 dark:via-gray-950/90 dark:to-gray-900/90 backdrop-blur-sm p-6 sm:p-8 shadow-xl dark:shadow-2xl">
          <h2 className="mb-5 text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">دسته‌بندی‌ها</h2>
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <Link
              href="/blog"
              className={`group inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 ${
                !categorySlug
                  ? 'bg-gradient-to-r from-gray-900 to-gray-800 text-white dark:from-white dark:to-gray-100 dark:text-gray-900 shadow-lg'
                  : 'bg-gradient-to-br from-gray-100 to-gray-200/80 dark:from-gray-800 dark:to-gray-700/80 text-gray-700 dark:text-gray-300 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-700 dark:hover:to-gray-600'
              }`}
            >
              <span className="text-base transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">📂</span>
              <span>همه</span>
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/blog?category=${cat.slug}`}
                className={`group inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 ${
                  categorySlug === cat.slug
                    ? 'bg-gradient-to-r from-gray-900 to-gray-800 text-white dark:from-white dark:to-gray-100 dark:text-gray-900 shadow-lg'
                    : 'bg-gradient-to-br from-gray-100 to-gray-200/80 dark:from-gray-800 dark:to-gray-700/80 text-gray-700 dark:text-gray-300 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-700 dark:hover:to-gray-600'
                }`}
              >
                <span className="text-base transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">📂</span>
                <span>{cat.name}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section>
        <div className="mb-6 sm:mb-8 flex flex-col items-stretch justify-between gap-4 sm:gap-5 sm:flex-row sm:items-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">جدیدترین مقالات</h2>
          <form method="get" action="/blog" className="relative w-full sm:w-auto">
            <input
              type="search"
              name="q"
              placeholder="جستجوی عنوان و خلاصه..."
              defaultValue={query}
              className="w-full rounded-xl border-2 border-gray-200/80 dark:border-gray-700/80 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm px-4 py-3 pr-11 text-sm outline-none focus:border-blue-400 dark:focus:border-blue-600 focus:ring-4 focus:ring-blue-500/20 dark:focus:ring-blue-500/30 transition-all duration-200 sm:min-w-[300px] dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
              aria-label="جستجو در مقالات"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-lg" aria-hidden>
              🔎
            </span>
            {categorySlug && <input type="hidden" name="category" value={categorySlug} />}
            {tagSlug && <input type="hidden" name="tag" value={tagSlug} />}
          </form>
        </div>
        {(categorySlug || tagSlug) && (
          <div className="mb-4 sm:mb-6 flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">فیلتر فعال:</span>
            {categorySlug && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                <span>📂</span>
                <span>
                  {(() => {
                    // Try to find category name from categories array first
                    const postWithCategory = posts.find((p) => 
                      (p.categories && p.categories.some((cat) => cat.slug === categorySlug)) ||
                      p.category?.slug === categorySlug
                    );
                    if (postWithCategory?.categories) {
                      const cat = postWithCategory.categories.find((c) => c.slug === categorySlug);
                      if (cat) return cat.name;
                    }
                    return postWithCategory?.category?.name || categorySlug;
                  })()}
                </span>
                <a 
                  href={query || tagSlug ? `/blog?${new URLSearchParams({ ...(query ? { q: query } : {}), ...(tagSlug ? { tag: tagSlug } : {}) }).toString()}` : '/blog'}
                  className="hover:text-red-600 dark:hover:text-red-400"
                  aria-label="حذف فیلتر دسته‌بندی"
                >
                  ✕
                </a>
              </span>
            )}
            {tagSlug && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 text-sm font-medium text-blue-700 dark:text-blue-300">
                <span>🏷️</span>
                <span>{posts.find((p) => p.tags?.some((tag) => tag.slug === tagSlug))?.tags?.find((tag) => tag.slug === tagSlug)?.name || tagSlug}</span>
                <a 
                  href={query || categorySlug ? `/blog?${new URLSearchParams({ ...(query ? { q: query } : {}), ...(categorySlug ? { category: categorySlug } : {}) }).toString()}` : '/blog'}
                  className="hover:text-red-600 dark:hover:text-red-400"
                  aria-label="حذف فیلتر تگ"
                >
                  ✕
                </a>
              </span>
            )}
          </div>
        )}
        {paginatedRest.length === 0 ? (
          <div className="rounded-xl border bg-white p-8 text-center">
            <p className="text-gray-700 dark:text-gray-300">مقاله‌ای یافت نشد.</p>
            {posts.length === 0 && (
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                در حال حاضر مقاله‌ای در دسترس نیست. لطفاً بعداً دوباره تلاش کنید.
              </p>
            )}
          </div>
        ) : (
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {paginatedRest.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <nav className="mt-10 sm:mt-12 flex items-center justify-center gap-2" aria-label="صفحه‌بندی">
            {Array.from({ length: totalPages }).map((_, i) => {
              const page = i + 1;
              const params = new URLSearchParams();
              if (query) params.set('q', query);
              if (categorySlug) params.set('category', categorySlug);
              if (tagSlug) params.set('tag', tagSlug);
              if (page > 1) params.set('page', String(page));
              const href = params.toString() ? `/blog?${params.toString()}` : '/blog';
              const isActive = page === currentPage;
              return (
                <a
                  key={page}
                  href={href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`inline-flex h-10 min-w-[40px] items-center justify-center rounded-xl border-2 px-4 text-sm font-semibold transition-all duration-200 ${
                    isActive 
                      ? 'bg-gradient-to-r from-gray-900 to-gray-800 text-white dark:from-white dark:to-gray-100 dark:text-gray-900 border-gray-900 dark:border-white shadow-lg scale-105' 
                      : 'bg-white/80 dark:bg-gray-900/80 text-gray-700 dark:text-gray-300 border-gray-200/80 dark:border-gray-700/80 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 hover:scale-105 hover:shadow-md backdrop-blur-sm'
                  }`}
                >
                  {page}
                </a>
              );
            })}
          </nav>
        )}
      </section>
    </div>
  );
}


