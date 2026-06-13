import { PostCard } from '@/components/PostCard';
import { type Post } from '@/lib/posts';

export function RelatedPosts({ currentPost, allPosts }: { currentPost: Post, allPosts: Post[] }) {
  // Filter out the current post
  const otherPosts = allPosts.filter(p => p.slug !== currentPost.slug);

  // Score posts based on matching tags and categories
  const scoredPosts = otherPosts.map(post => {
    let score = 0;
    
    // Check categories
    const currentCategorySlug = currentPost.categories?.[0]?.slug || currentPost.category?.slug;
    const postCategorySlug = post.categories?.[0]?.slug || post.category?.slug;
    
    if (currentCategorySlug && postCategorySlug && currentCategorySlug === postCategorySlug) {
      score += 2; // Category match is important
    }

    // Check tags
    if (currentPost.tags && post.tags) {
      const currentTags = currentPost.tags.map(t => t.slug);
      const postTags = post.tags.map(t => t.slug);
      
      const matchingTags = currentTags.filter(t => postTags.includes(t));
      score += matchingTags.length;
    }

    return { post, score };
  });

  // Sort by score (descending) and take top 2
  const topRelated = scoredPosts
    .filter(p => p.score > 0) // Only show posts that have at least some relation
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map(p => p.post);

  if (topRelated.length === 0) {
    // Fallback: Just show 2 latest posts if no related found
    topRelated.push(...otherPosts.slice(0, 2));
  }

  if (topRelated.length === 0) return null;

  return (
    <div className="mt-16 mb-8 border-t-2 border-gray-100 dark:border-gray-800 pt-10">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">🔗</span>
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">مقالات مرتبط</h3>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {topRelated.map(post => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
