import type { Metadata } from 'next';
import { SITE, createPageMeta } from '@/lib/seo';
import { getAllPosts } from '@/lib/posts';
import { Schema } from '@/components/Schema';
import Link from 'next/link';
import Image from 'next/image';
import { PostCard } from '@/components/PostCard';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = createPageMeta({
  title: `بلاگ | ${SITE.name}`,
  description: `مقالات ${SITE.name} درباره عملکرد، سئو و توسعه فول‌استک`,
  url: `${SITE.domain}/blog`
});

export default async function BlogPage({ searchParams }: { searchParams?: { q?: string; page?: string } }) {
  let posts: Awaited<ReturnType<typeof getAllPosts>>;
  try {
    posts = await getAllPosts();
  } catch (error) {
    console.error('[BlogPage] Error loading posts:', error);
    posts = [];
  }
  
  const query = (searchParams?.q || '').trim();

  const filtered = query
    ? posts.filter((p) => {
        const hay = `${p.title} ${p.description}`.toLowerCase();
        return hay.includes(query.toLowerCase());
      })
    : posts;

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

      <header className="relative overflow-hidden rounded-3xl border bg-gradient-to-b from-gray-50 to-white p-6 sm:p-8 lg:p-10">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">بلاگ {SITE.name}</h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base text-gray-700 dark:text-gray-300">
            مجموعه مقالات تخصصی درباره توسعه Full-Stack با Next.js و React، بهینه‌سازی عملکرد وب‌سایت‌ها، بهبود Core Web Vitals، و بهترین شیوه‌های سئو فنی. در این بلاگ تجربیات عملی، راهنماهای گام‌به‌گام، و نکات پیشرفته در زمینه توسعه وب و بهبود رتبه‌بندی در موتورهای جستجو را به اشتراک می‌گذارم.
          </p>
        </div>
      </header>

      {first && (
        <section className="overflow-hidden rounded-2xl border bg-white shadow-sm">
          <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
            {first.image && (
              <div className="relative aspect-[16/10] w-full lg:aspect-auto lg:min-h-[360px]">
                <Image
                  src={first.image}
                  alt={`کاور ${first.title}`}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-4 sm:p-6 lg:p-10">
              <h2 className="text-xl font-bold tracking-tight sm:text-2xl lg:text-3xl">
                <Link href={`/blog/${first.slug}`} className="hover:underline">{first.title}</Link>
              </h2>
              <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-700">{first.description}</p>
              <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
                <time dateTime={new Date(first.date).toISOString()}>{new Date(first.date).toLocaleDateString('fa-IR')}</time>
                <span>•</span>
                {first.readingTime ? <span>{first.readingTime} دقیقه مطالعه</span> : <span>مطالعه سریع</span>}
              </div>
              <Link href={`/blog/${first.slug}`} className="mt-4 sm:mt-6 inline-flex items-center gap-2 rounded-md bg-black px-3 py-2 text-sm sm:text-base sm:px-4 text-white hover:bg-gray-900">
                مطالعه مقاله
              </Link>
            </div>
          </div>
        </section>
      )}

      <section>
        <div className="mb-4 sm:mb-6 flex flex-col items-stretch justify-between gap-3 sm:gap-4 sm:flex-row sm:items-center">
          <h2 className="text-lg sm:text-xl font-semibold">جدیدترین مقالات</h2>
          <form method="get" action="/blog" className="relative w-full sm:w-auto">
            <input
              type="search"
              name="q"
              placeholder="جستجوی عنوان و خلاصه..."
              defaultValue={query}
              className="w-full rounded-lg border px-3 py-2 pr-9 text-sm outline-none focus:border-gray-400 sm:min-w-[280px]"
              aria-label="جستجو در مقالات"
            />
            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden>
              🔎
            </span>
          </form>
        </div>
        {paginatedRest.length === 0 ? (
          <div className="rounded-xl border bg-white p-8 text-center">
            <p className="text-gray-600">مقاله‌ای یافت نشد.</p>
            {posts.length === 0 && (
              <p className="mt-2 text-sm text-gray-500">
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
          <nav className="mt-8 flex items-center justify-center gap-2" aria-label="صفحه‌بندی">
            {Array.from({ length: totalPages }).map((_, i) => {
              const page = i + 1;
              const params = new URLSearchParams();
              if (query) params.set('q', query);
              if (page > 1) params.set('page', String(page));
              const href = params.toString() ? `/blog?${params.toString()}` : '/blog';
              const isActive = page === currentPage;
              return (
                <a
                  key={page}
                  href={href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`inline-flex h-9 min-w-[36px] items-center justify-center rounded-md border px-3 text-sm ${isActive ? 'bg-black text-white' : 'bg-white hover:bg-gray-50'}`}
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


