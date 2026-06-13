import type { Metadata } from 'next';
import { SITE, createPageMeta } from '@/lib/seo';
import { getAllPosts, getAllCategories, getPostUrl } from '@/lib/posts';
import { Schema } from '@/components/Schema';
import Link from 'next/link';
import Image from 'next/image';
import { PostCard } from '@/components/PostCard';
import { CategoriesDrawerButton } from '@/components/CategoriesDrawerButton';
import { BlogSidebar } from '@/components/BlogSidebar';

// بهینه‌سازی: استفاده از ISR برای بهتر شدن performance
export const revalidate = 180; // 3 minutes

// Generate metadata dynamically to handle canonical URLs properly
export async function generateMetadata({ 
  searchParams 
}: { 
  searchParams?: { q?: string; page?: string; category?: string; tag?: string } 
}): Promise<Metadata> {
  // IMPORTANT: Build canonical URL that EXACTLY matches the page URL
  // Google's "Alternate page with proper canonical tag" error occurs when:
  // 1. Canonical URL doesn't match the actual page URL
  // 2. Multiple URLs have the same canonical (creating a canonical chain)
  // 
  // Solution: Each page (including filtered/paginated) should canonicalize to itself
  // This tells Google that each URL is a unique, indexable page
  
  const currentPage = Math.max(1, parseInt(searchParams?.page || '1', 10) || 1);
  const hasTag = !!searchParams?.tag;
  const hasCategory = !!searchParams?.category;
  const searchQuery = searchParams?.q?.trim() || '';
  // Check if search query is a real query (not a placeholder like {search_term_string})
  const isPlaceholderQuery = searchQuery.includes('{') && searchQuery.includes('}');
  const hasSearchQuery = searchQuery.length > 0 && !isPlaceholderQuery;
  
  // SEO Fix: For placeholder queries, canonicalize to /blog to prevent indexing
  // This ensures Google doesn't try to index test URLs from SearchAction schema
  if (isPlaceholderQuery) {
    const canonicalUrl = `${SITE.domain}/blog`;
    return createPageMeta({
      title: `بلاگ | ${SITE.name}`,
      description: `مجموعه مقالات تخصصی ${SITE.name} درباره توسعه Full-Stack با Next.js و React، بهینه‌سازی عملکرد وب‌سایت‌ها، بهبود Core Web Vitals، و بهترین شیوه‌های سئو فنی.`,
      url: canonicalUrl,
      robots: 'noindex, follow' // Don't index placeholder queries
    });
  }
  
  // Build canonical URL with consistent parameter ordering
  // IMPORTANT: Order must be consistent (alphabetical: category, page, q, tag)
  // This ensures canonical URL matches the actual page URL exactly
  // Google requires canonical URL to match the actual URL to avoid "Duplicate" errors
  // 
  // CRITICAL: URLSearchParams.toString() automatically sorts parameters alphabetically
  // This matches the middleware normalization, ensuring canonical URL matches the actual URL
  const canonicalParams = new URLSearchParams();
  
  // Add parameters in alphabetical order for consistency
  // This ensures canonical URL matches regardless of parameter order in request
  // Order: category, page, q, tag (alphabetical)
  if (hasCategory && searchParams?.category) {
    canonicalParams.set('category', searchParams.category);
  }
  // Only include page parameter if it's greater than 1
  // Page 1 should not include page parameter in canonical URL
  if (currentPage > 1) {
    canonicalParams.set('page', String(currentPage));
  }
  if (hasSearchQuery && searchParams?.q) {
    canonicalParams.set('q', searchParams.q.trim());
  }
  if (hasTag && searchParams?.tag) {
    canonicalParams.set('tag', searchParams.tag);
  }
  
  // Build canonical URL - MUST match the actual page URL exactly
  // URLSearchParams.toString() automatically sorts parameters alphabetically
  // This matches the middleware normalization, ensuring consistency
  const canonicalUrl = canonicalParams.toString()
    ? `${SITE.domain}/blog?${canonicalParams.toString()}`
    : `${SITE.domain}/blog`;
  
  // SEO Strategy:
  // - Tag pages: Index them (they show unique filtered content)
  // - Category pages: Index them (they show unique filtered content)  
  // - Search query pages: NOINDEX to prevent indexing dynamic/low-quality search results
  // - Base /blog page: Index it
  // - Paginated pages: Index them (they show different content)
  const shouldNoIndex = hasSearchQuery; // Don't index search query pages
  
  // Fetch categories to get real category names for better SEO
  let categoryName: string | undefined;
  let tagName: string | undefined;
  
  if (hasCategory || hasTag) {
    try {
      const [posts, categories] = await Promise.all([
        getAllPosts().catch(() => []),
        getAllCategories().catch(() => [])
      ]);
      
      // Helper to flatten categories
      const flattenCategories = (cats: typeof categories): Array<{ slug: string; name: string }> => {
        const result: Array<{ slug: string; name: string }> = [];
        cats.forEach(cat => {
          result.push({ slug: cat.slug, name: cat.name });
          if (cat.children && cat.children.length > 0) {
            result.push(...flattenCategories(cat.children));
          }
        });
        return result;
      };
      
      if (hasCategory && searchParams?.category) {
        const allCategoriesFlat = flattenCategories(categories);
        const foundCategory = allCategoriesFlat.find(cat => cat.slug === searchParams.category);
        categoryName = foundCategory?.name || searchParams.category;
      }
      
      if (hasTag && searchParams?.tag) {
        // Find tag name from posts
        const foundPost = posts.find(p => p.tags?.some(tag => tag.slug === searchParams.tag));
        const foundTag = foundPost?.tags?.find(tag => tag.slug === searchParams.tag);
        tagName = foundTag?.name || searchParams.tag;
      }
    } catch (error) {
      // If fetch fails, use slug as fallback
      if (hasCategory) categoryName = searchParams?.category;
      if (hasTag) tagName = searchParams?.tag;
    }
  }
  
  // Build descriptive title and description based on filters
  // This improves SEO and helps Google understand the page content
  let pageTitle = `بلاگ | ${SITE.name}`;
  let pageDescription = `مجموعه مقالات تخصصی ${SITE.name} درباره توسعه Full-Stack با Next.js و React، بهینه‌سازی عملکرد وب‌سایت‌ها، بهبود Core Web Vitals، و بهترین شیوه‌های سئو فنی. تجربیات عملی، راهنماهای گام‌به‌گام، و نکات پیشرفته در زمینه توسعه وب.`;
  
  if (hasTag && tagName) {
    pageTitle = `مقالات با برچسب ${tagName} | بلاگ ${SITE.name}`;
    pageDescription = `مقالات و مطالب تخصصی با برچسب "${tagName}" از بلاگ ${SITE.name}. مجموعه مقالات تخصصی درباره توسعه Full-Stack، بهینه‌سازی عملکرد و سئو فنی.`;
  } else if (hasCategory && categoryName) {
    pageTitle = `مقالات دسته‌بندی ${categoryName} | بلاگ ${SITE.name}`;
    pageDescription = `مقالات و مطالب تخصصی دسته‌بندی "${categoryName}" از بلاگ ${SITE.name}. مجموعه مقالات تخصصی درباره توسعه Full-Stack، بهینه‌سازی عملکرد و سئو فنی.`;
  } else if (currentPage > 1) {
    pageTitle = `بلاگ | ${SITE.name} - صفحه ${currentPage}`;
    pageDescription = `صفحه ${currentPage} از بلاگ ${SITE.name}. مجموعه مقالات تخصصی درباره توسعه Full-Stack با Next.js و React.`;
  }
  
  // Build keywords array with category/tag specific keywords
  const baseKeywords = [
    'مقالات توسعه وب',
    'بلاگ Next.js',
    'مقالات React',
    'مقالات سئو فنی',
    'بهینه‌سازی عملکرد',
    'Core Web Vitals',
    'توسعه Full-Stack',
    'مقالات برنامه‌نویسی'
  ];
  
  if (categoryName) {
    baseKeywords.unshift(categoryName, `مقالات ${categoryName}`);
  }
  if (tagName) {
    baseKeywords.unshift(tagName, `مقالات ${tagName}`);
  }
  
  return createPageMeta({
    title: pageTitle,
    description: pageDescription,
    url: canonicalUrl, // Canonical URL that matches the actual page URL
    keywords: baseKeywords,
    // SEO Fix: Explicitly set robots to "index, follow" for category/tag pages
    // This ensures Google indexes these pages even if they have no content yet
    // For search query pages, use "noindex, follow"
    robots: shouldNoIndex ? 'noindex, follow' : 'index, follow'
  });
}

export default async function BlogPage({ searchParams }: { searchParams?: { q?: string; page?: string; category?: string; tag?: string } }) {
  // Parallel fetching برای سریع‌تر شدن
  let posts: Awaited<ReturnType<typeof getAllPosts>>;
  let categories: Awaited<ReturnType<typeof getAllCategories>>;
  
  try {
    // اجرای موازی برای سریع‌تر شدن
    [posts, categories] = await Promise.all([
      getAllPosts().catch((error) => {
        console.error('[BlogPage] Error fetching posts:', error);
        return [];
      }),
      getAllCategories().catch((error) => {
        console.error('[BlogPage] Error fetching categories:', error);
        return [];
      })
    ]);
  } catch (error) {
    console.error('[BlogPage] Unexpected error:', error);
    posts = [];
    categories = [];
  }
  
  const query = (searchParams?.q || '').trim();
  const categorySlug = searchParams?.category;
  const tagSlug = searchParams?.tag;

  // Helper function to flatten categories for finding category name
  const flattenCategories = (cats: typeof categories): Array<{ slug: string; name: string }> => {
    const result: Array<{ slug: string; name: string }> = [];
    cats.forEach(cat => {
      result.push({ slug: cat.slug, name: cat.name });
      if (cat.children && cat.children.length > 0) {
        result.push(...flattenCategories(cat.children));
      }
    });
    return result;
  };

  const allCategoriesFlat = flattenCategories(categories);
  
  // Find category and tag names for smart filtering
  let categoryName = '';
  if (categorySlug) {
    const foundCategory = allCategoriesFlat.find(cat => cat.slug === categorySlug);
    categoryName = foundCategory?.name || '';
  }
  
  let tagName = '';
  if (tagSlug) {
    const foundPost = posts.find(p => p.tags?.some(tag => tag.slug === tagSlug));
    const foundTag = foundPost?.tags?.find(tag => tag.slug === tagSlug);
    tagName = foundTag?.name || '';
  }

  // Helper function to find a category by slug in the hierarchical structure
  const findCategoryBySlug = (cats: typeof categories, targetSlug: string): typeof categories[0] | null => {
    if (!targetSlug) return null;
    
    // Normalization helper: lowercase, decode URI, and remove hyphens/spaces for fuzzy matching
    const normalize = (s: string) => {
      if (!s) return '';
      try {
        return decodeURIComponent(s).toLowerCase().replace(/[-\s_]+/g, '').trim();
      } catch (e) {
        return s.toLowerCase().replace(/[-\s_]+/g, '').trim();
      }
    };
    
    const normalizedTarget = normalize(targetSlug);

    // Level 1: Exact normalized match
    for (const cat of cats) {
      if (normalize(cat.slug) === normalizedTarget) {
        return cat;
      }
      if (cat.children && cat.children.length > 0) {
        const found = findCategoryBySlug(cat.children, targetSlug);
        if (found) return found;
      }
    }
    
    return null;
  };

  // Helper function to get all category slugs (including children) for a given category slug
  const getCategorySlugsIncludingChildren = (slug: string): string[] => {
    const result: string[] = [slug];
    
    const category = findCategoryBySlug(categories, slug);
    if (category) {
      // If it's a main category (has children), include all its children slugs
      if (category.children && category.children.length > 0) {
        category.children.forEach(child => {
          result.push(child.slug);
        });
      }
    }
    
    return result;
  };

  let filtered = posts;
  
  if (categorySlug) {
    // Get all slugs to match (category itself + its children if it's a main category)
    const slugsToMatch = getCategorySlugsIncludingChildren(categorySlug);
    
    // Normalization helper
    const normalize = (s: string) => {
      if (!s) return '';
      try {
        return decodeURIComponent(s).toLowerCase().replace(/[-\s_]+/g, '').trim();
      } catch (e) {
        return s.toLowerCase().replace(/[-\s_]+/g, '').trim();
      }
    };
    
    const normalizedSlugsToMatch = slugsToMatch.map(normalize);
    const normalizedCategorySlug = normalize(categorySlug);
    
    filtered = filtered.filter((p) => {
      let matches = false;
      
      // Check if category matches in categories array
      if (p.categories && p.categories.length > 0) {
        matches = p.categories.some((cat) => {
          const normCat = normalize(cat.slug);
          return normalizedSlugsToMatch.includes(normCat) || normCat.includes(normalizedCategorySlug) || normalizedCategorySlug.includes(normCat);
        });
      }
      
      // Fallback to single category if not matched yet
      if (!matches && p.category?.slug) {
        const normCat = normalize(p.category.slug);
        matches = normalizedSlugsToMatch.includes(normCat) || normCat.includes(normalizedCategorySlug) || normalizedCategorySlug.includes(normCat);
      }
      
      // Smart Fallback: Check if category name matches (to handle slug mismatches like "pwa-چیست" vs "pwa-chyst")
      if (!matches && categoryName) {
        const normCatName = normalize(categoryName);
        if (p.categories && p.categories.length > 0) {
          matches = p.categories.some(cat => normalize(cat.name).includes(normCatName) || normCatName.includes(normalize(cat.name)));
        }
        if (!matches && p.category?.name) {
          matches = normalize(p.category.name).includes(normCatName) || normCatName.includes(normalize(p.category.name));
        }
      }

      return matches;
    });
  }
  
  if (tagSlug) {
    const normalize = (s: string) => {
      if (!s) return '';
      try {
        return decodeURIComponent(s).toLowerCase().replace(/[-\s_]+/g, '').trim();
      } catch (e) {
        return s.toLowerCase().replace(/[-\s_]+/g, '').trim();
      }
    };
    const normalizedTagSlug = normalize(tagSlug);
    const normTagName = tagName ? normalize(tagName) : '';
    
    filtered = filtered.filter((p) => p.tags?.some((tag) => {
      const normTag = normalize(tag.slug);
      let isMatch = normTag === normalizedTagSlug || normTag.includes(normalizedTagSlug) || normalizedTagSlug.includes(normTag);
      
      // Smart Fallback for Tags
      if (!isMatch && normTagName && tag.name) {
        const normTagCatName = normalize(tag.name);
        isMatch = normTagCatName.includes(normTagName) || normTagName.includes(normTagCatName);
      }
      return isMatch;
    }));
  }

  if (query) {
    const queryLower = query.toLowerCase();
    filtered = filtered.filter((p) => {
      // Search in title and description
      const titleMatch = p.title.toLowerCase().includes(queryLower);
      const descMatch = p.description.toLowerCase().includes(queryLower);
      
      // Also search in content (strip HTML tags for search)
      const contentText = p.content ? p.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').toLowerCase() : '';
      const contentMatch = contentText.includes(queryLower);
      
      return titleMatch || descMatch || contentMatch;
    });
  }

  // Calculate pagination values
  const pageSize = 9;
  const currentPage = Math.max(1, parseInt(searchParams?.page || '1', 10) || 1);
  
  // Show featured post (first) on page 1 if there are any filtered posts
  // Featured post will be the first post from filtered results
  const showFeaturedPost = currentPage === 1 && filtered.length > 0;
  
  // Calculate total pages based on whether we show featured post or not
  const itemsToPaginate = showFeaturedPost ? filtered.length - 1 : filtered.length;
  const totalPages = Math.max(1, Math.ceil(itemsToPaginate / pageSize));

  // Get featured post from filtered results (first post)
  const first = showFeaturedPost ? filtered[0] : undefined;
  const postsToPaginate = showFeaturedPost && filtered.length > 0 ? filtered.slice(1) : filtered;
  
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const paginatedRest = postsToPaginate.slice(start, end);

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${SITE.name} Blog`,
    url: `${SITE.domain}/blog`,
    description: `مجموعه مقالات تخصصی درباره توسعه Full-Stack، بهینه‌سازی عملکرد، و سئو فنی`,
    inLanguage: 'fa-IR',
    publisher: {
      '@type': 'Person',
      name: SITE.name,
      url: SITE.domain
    },
    blogPost: posts.slice(0, 10).map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      description: p.description,
      datePublished: p.date,
      dateModified: p.updatedAt || p.date,
      url: `${SITE.domain}${getPostUrl(p)}`,
      image: p.image ? (p.image.startsWith('http') ? p.image : `${SITE.domain}${p.image}`) : undefined,
      author: {
        '@type': 'Person',
        name: SITE.name
      }
    }))
  } as const;

  // Build CollectionPage schema with category/tag specific information
  const collectionPageName = categorySlug 
    ? `مقالات دسته‌بندی ${allCategoriesFlat.find(cat => cat.slug === categorySlug)?.name || categorySlug}`
    : tagSlug
    ? `مقالات با برچسب ${posts.find((p) => p.tags?.some((tag) => tag.slug === tagSlug))?.tags?.find((tag) => tag.slug === tagSlug)?.name || tagSlug}`
    : `بلاگ ${SITE.name}`;
  
  const collectionPageUrl = categorySlug
    ? `${SITE.domain}/blog?category=${categorySlug}`
    : tagSlug
    ? `${SITE.domain}/blog?tag=${tagSlug}`
    : `${SITE.domain}/blog`;
  
  const collectionPageDescription = categorySlug
    ? `مقالات و مطالب تخصصی دسته‌بندی "${allCategoriesFlat.find(cat => cat.slug === categorySlug)?.name || categorySlug}" از بلاگ ${SITE.name}`
    : tagSlug
    ? `مقالات و مطالب تخصصی با برچسب "${posts.find((p) => p.tags?.some((tag) => tag.slug === tagSlug))?.tags?.find((tag) => tag.slug === tagSlug)?.name || tagSlug}" از بلاگ ${SITE.name}`
    : `مجموعه مقالات تخصصی ${SITE.name}`;

  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: collectionPageName,
    url: collectionPageUrl,
    description: collectionPageDescription,
    inLanguage: 'fa-IR',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: filtered.length,
      itemListElement: paginatedRest.slice(0, 10).map((p, index) => ({
        '@type': 'ListItem',
        position: start + index + 1,
        item: {
          '@type': 'BlogPosting',
          headline: p.title,
          url: `${SITE.domain}${getPostUrl(p)}`
        }
      }))
    },
    // Add about property for category pages to help Google understand the topic
    ...(categorySlug && {
      about: {
        '@type': 'Thing',
        name: allCategoriesFlat.find(cat => cat.slug === categorySlug)?.name || categorySlug
      }
    }),
    // Add keywords for tag pages
    ...(tagSlug && {
      keywords: posts.find((p) => p.tags?.some((tag) => tag.slug === tagSlug))?.tags?.find((tag) => tag.slug === tagSlug)?.name || tagSlug
    })
  } as const;

  return (
    <div className="space-y-8 sm:space-y-10 lg:space-y-12 w-full relative">
      <Schema json={blogSchema} />
      <Schema json={collectionPageSchema} />
      
      {/* Header - Full Width */}
      <header className="relative overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-gray-200/80 dark:border-gray-800/80 bg-gradient-to-br from-white via-gray-50/50 to-white dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 shadow-xl dark:shadow-2xl backdrop-blur-sm">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-90"></div>
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] bg-[radial-gradient(circle_at_1px_1px,_currentColor_1px,_transparent_0)] bg-[length:24px_24px]"></div>
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-gray-50 dark:via-gray-100 dark:to-gray-50 bg-clip-text text-transparent">
              بلاگ {SITE.name}
            </span>
          </h1>
          <p className="mx-auto mt-3 sm:mt-4 max-w-2xl text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed px-2 sm:px-0">
            مجموعه مقالات تخصصی درباره توسعه Full-Stack با Next.js و React، بهینه‌سازی عملکرد وب‌سایت‌ها، بهبود Core Web Vitals، و بهترین شیوه‌های سئو فنی. در این بلاگ تجربیات عملی، راهنماهای گام‌به‌گام، و نکات پیشرفته در زمینه توسعه وب و بهبود رتبه‌بندی در موتورهای جستجو را به اشتراک می‌گذارم.
          </p>
        </div>
      </header>

      {/* Main Content with Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-8 sm:space-y-10 lg:space-y-12">
          {first && (
        <section className="group overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-gray-200/80 dark:border-gray-800/80 bg-gradient-to-br from-white/90 via-gray-50/90 to-white/90 dark:from-gray-900/90 dark:via-gray-950/90 dark:to-gray-900/90 backdrop-blur-sm shadow-xl dark:shadow-2xl hover:shadow-2xl transition-all duration-300">
          <div className="grid gap-0 lg:grid-cols-2">
            {first.image && (
              <div className="relative aspect-[16/9] sm:aspect-[16/10] w-full lg:aspect-auto lg:min-h-[400px] overflow-hidden">
                <Image
                  src={first.image}
                  alt={`کاور ${first.title}`}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-700"></div>
              </div>
            )}
            <div className="p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight mb-3 sm:mb-4 leading-tight">
                <Link href={getPostUrl(first) as any} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-50 dark:to-gray-300 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-purple-600 dark:group-hover:from-blue-400 dark:group-hover:to-purple-400 transition-all">
                    {first.title}
                  </span>
                </Link>
              </h2>
              <p className="mt-2 sm:mt-3 text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3">{first.description}</p>
              <div className="mt-3 sm:mt-4 md:mt-5 flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                <time dateTime={new Date(first.date).toISOString()} className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-gray-100/80 dark:bg-gray-800/80">
                  <span className="text-sm sm:text-base">📅</span>
                  <span>{new Date(first.date).toLocaleDateString('fa-IR')}</span>
                </time>
                {first.readingTime ? (
                  <span className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-blue-50/80 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                    <span className="text-sm sm:text-base">⏱️</span>
                    <span>{first.readingTime} دقیقه</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-green-50/80 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                    <span className="text-sm sm:text-base">⚡</span>
                    <span>سریع</span>
                  </span>
                )}
              </div>
              {(first.categories && first.categories.length > 0) && (
                <div className="hidden md:block mt-3 sm:mt-4 w-full">
                  <div className="overflow-x-auto scrollbar-hide sm:overflow-x-visible">
                    <div className="flex items-center gap-2 flex-nowrap sm:flex-wrap sm:w-full">
                      {first.categories.map((cat) => (
                        <Link 
                          key={cat.slug}
                          href={`/blog?category=${cat.slug}`}
                          className="group inline-flex items-center gap-1.5 rounded-lg sm:rounded-xl bg-gradient-to-br from-gray-100 to-gray-200/80 dark:from-gray-800 dark:to-gray-700/80 px-2 sm:px-2.5 md:px-3.5 py-1 sm:py-1.5 text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 whitespace-nowrap shrink-0"
                        >
                          <span className="text-xs sm:text-sm transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">📂</span>
                          <span>{cat.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {(!first.categories || first.categories.length === 0) && first.category && (
                <div className="hidden md:block mt-3 sm:mt-4">
                  <Link 
                    href={`/blog?category=${first.category.slug}`}
                    className="group inline-flex items-center gap-1.5 rounded-lg sm:rounded-xl bg-gradient-to-br from-gray-100 to-gray-200/80 dark:from-gray-800 dark:to-gray-700/80 px-2 sm:px-2.5 md:px-3.5 py-1 sm:py-1.5 text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                  >
                    <span className="text-xs sm:text-sm transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">📂</span>
                    <span>{first.category.name}</span>
                  </Link>
                </div>
              )}
              <Link 
                href={getPostUrl(first) as any} 
                className="mt-4 sm:mt-6 md:mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm md:text-base font-semibold text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
              >
                <span>مطالعه مقاله</span>
                <span className="text-base sm:text-lg transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </section>
          )}

          {/* Categories Section - Hidden on mobile (use drawer instead), visible only on tablet */}
          {categories.length > 0 && (
            <section className="hidden md:block lg:hidden rounded-2xl border-2 border-gray-200/80 dark:border-gray-800/80 bg-gradient-to-br from-white/90 via-gray-50/90 to-white/90 dark:from-gray-900/90 dark:via-gray-950/90 dark:to-gray-900/90 backdrop-blur-sm p-4 sm:p-6 md:p-8 shadow-xl dark:shadow-2xl">
              <h2 className="mb-4 sm:mb-5 md:mb-6 text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <span className="text-xl sm:text-2xl">📚</span>
                <span>دسته‌بندی‌ها</span>
              </h2>
              <div className="w-full space-y-4">
                {/* All Categories Button */}
                <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 flex-wrap">
                  <Link
                    href="/blog"
                    className={`group inline-flex items-center gap-1.5 sm:gap-2 rounded-xl px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base font-bold whitespace-nowrap transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 ${
                      !categorySlug
                        ? 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white dark:from-blue-600 dark:via-purple-600 dark:to-blue-600 shadow-xl ring-2 ring-gray-900/20 dark:ring-blue-500/30'
                        : 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 text-gray-700 dark:text-gray-200 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-700 dark:hover:to-gray-600 border border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    <span className="text-base sm:text-lg transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">📂</span>
                    <span>همه مقالات</span>
                  </Link>
                </div>
                
                {/* Main Categories with Subcategories */}
                {categories.map((mainCat) => {
                  const isMainCategoryActive = categorySlug === mainCat.slug;
                  const isSubCategoryActive = mainCat.children?.some(subCat => subCat.slug === categorySlug);
                  const isActive = isMainCategoryActive || isSubCategoryActive;
                  
                  return (
                    <div key={mainCat.slug} className="space-y-3">
                      {/* Main Category */}
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/blog?category=${mainCat.slug}`}
                          className={`group inline-flex items-center gap-2 sm:gap-2.5 rounded-xl px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-3.5 text-sm sm:text-base font-bold whitespace-nowrap transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 flex-1 ${
                            isMainCategoryActive
                              ? 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white dark:from-blue-600 dark:via-purple-600 dark:to-blue-600 shadow-xl ring-2 ring-gray-900/20 dark:ring-blue-500/30'
                              : isActive
                              ? 'bg-gradient-to-br from-blue-100 via-blue-50 to-blue-100 dark:from-blue-900/60 dark:via-blue-800/60 dark:to-blue-900/60 text-blue-800 dark:text-blue-200 border-2 border-blue-300 dark:border-blue-600 hover:from-blue-200 hover:to-blue-100 dark:hover:from-blue-800/80 dark:hover:to-blue-700/80'
                              : 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 text-gray-800 dark:text-gray-200 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-700 dark:hover:to-gray-600 border border-gray-300 dark:border-gray-600'
                          }`}
                        >
                          <span className="text-base sm:text-lg transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">📂</span>
                          <span>{mainCat.name}</span>
                          {mainCat.children && mainCat.children.length > 0 && (
                            <span className="text-xs sm:text-sm opacity-75 bg-white/20 dark:bg-black/20 px-2 py-0.5 rounded-full">
                              {mainCat.children.length}
                            </span>
                          )}
                        </Link>
                      </div>
                      
                      {/* Subcategories */}
                      {mainCat.children && mainCat.children.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 md:gap-3 mr-6 sm:mr-8 md:mr-10 pl-2 border-r-2 border-gray-200 dark:border-gray-700">
                          {mainCat.children.map((subCat) => (
                            <Link
                              key={subCat.slug}
                              href={`/blog?category=${subCat.slug}`}
                              className={`group inline-flex items-center gap-1.5 sm:gap-2 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 ${
                                categorySlug === subCat.slug
                                  ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white shadow-lg ring-2 ring-blue-400/50 dark:ring-blue-500/50'
                                  : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/90 border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                              }`}
                            >
                              <span className="text-xs sm:text-sm transition-transform duration-300 group-hover:scale-110 text-blue-500 dark:text-blue-400">•</span>
                              <span className={categorySlug === subCat.slug ? 'text-white' : 'text-gray-700 dark:text-gray-200'}>{subCat.name}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

      <section>
        <div className="mb-4 sm:mb-6 md:mb-8 flex flex-col items-stretch justify-between gap-3 sm:gap-4 md:gap-5 sm:flex-row sm:items-center">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">جدیدترین مقالات</h2>
          <form method="get" action="/blog" className="relative w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="relative flex-1 sm:flex-initial">
              <input
                type="search"
                name="q"
                placeholder="جستجوی عنوان و خلاصه..."
                defaultValue={query}
                className="w-full rounded-xl border-2 border-gray-200/80 dark:border-gray-700/80 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm px-3 sm:px-4 py-2.5 sm:py-3 pr-10 sm:pr-11 text-sm outline-none focus:border-blue-400 dark:focus:border-blue-600 focus:ring-4 focus:ring-blue-500/20 dark:focus:ring-blue-500/30 transition-all duration-200 sm:min-w-[280px] md:min-w-[300px] dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                aria-label="جستجو در مقالات"
              />
              <span className="pointer-events-none absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-base sm:text-lg" aria-hidden>
                🔎
              </span>
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 whitespace-nowrap"
              aria-label="جستجو"
            >
              <span>جستجو</span>
            </button>
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
                  {allCategoriesFlat.find(cat => cat.slug === categorySlug)?.name || categorySlug}
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
          <div className="rounded-xl border bg-white dark:bg-gray-900 p-8 sm:p-10 md:p-12 text-center">
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
                {categorySlug 
                  ? `مقاله‌ای در دسته‌بندی "${allCategoriesFlat.find(cat => cat.slug === categorySlug)?.name || categorySlug}" یافت نشد`
                  : tagSlug
                  ? `مقاله‌ای با برچسب "${posts.find((p) => p.tags?.some((tag) => tag.slug === tagSlug))?.tags?.find((tag) => tag.slug === tagSlug)?.name || tagSlug}" یافت نشد`
                  : 'مقاله‌ای یافت نشد'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {categorySlug 
                  ? `در حال حاضر مقاله‌ای در دسته‌بندی "${allCategoriesFlat.find(cat => cat.slug === categorySlug)?.name || categorySlug}" منتشر نشده است. به زودی مقالات جدیدی در این دسته‌بندی منتشر خواهند شد.`
                  : tagSlug
                  ? `در حال حاضر مقاله‌ای با برچسب "${posts.find((p) => p.tags?.some((tag) => tag.slug === tagSlug))?.tags?.find((tag) => tag.slug === tagSlug)?.name || tagSlug}" منتشر نشده است. به زودی مقالات جدیدی با این برچسب منتشر خواهند شد.`
                  : posts.length === 0 
                  ? 'در حال حاضر مقاله‌ای در دسترس نیست. لطفاً بعداً دوباره تلاش کنید.'
                  : 'مقاله‌ای با فیلترهای انتخابی شما یافت نشد. لطفاً فیلترها را تغییر دهید یا از جستجو استفاده کنید.'}
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <a 
                  href="/blog"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  مشاهده همه مقالات
                </a>
                {categorySlug && (
                  <a 
                    href="/blog"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 dark:border-gray-700 px-6 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
                  >
                    حذف فیلتر
                  </a>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2">
            {paginatedRest.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <nav className="mt-8 sm:mt-10 md:mt-12 flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap" aria-label="صفحه‌بندی">
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
                  className={`inline-flex h-9 sm:h-10 min-w-[36px] sm:min-w-[40px] items-center justify-center rounded-lg sm:rounded-xl border-2 px-3 sm:px-4 text-xs sm:text-sm font-semibold transition-all duration-200 ${
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

        {/* Sidebar - Desktop Only */}
        <aside className="lg:col-span-1">
          <BlogSidebar categories={categories} />
        </aside>
      </div>

      {/* Mobile Categories Drawer Button - Fixed at bottom right, outside page structure */}
      <CategoriesDrawerButton categories={categories} activeCategory={categorySlug} />
    </div>
  );
}


