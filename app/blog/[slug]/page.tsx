import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SITE, createPageMeta } from '@/lib/seo';
import { getAllPosts, getPostBySlug } from '@/lib/posts';
import { Schema } from '@/components/Schema';
import { Breadcrumbs } from '@/components/Breadcrumbs';

type Params = { slug: string };

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return createPageMeta({
    title: `${post.title} | ${SITE.name}`,
    description: post.description,
    url: `${SITE.domain}/blog/${post.slug}`,
    image: post.image
  });
}

export default function BlogPostPage({ params }: { params: Params }) {
  const post = getPostBySlug(params.slug);
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

  return (
    <article className="prose max-w-none prose-headings:scroll-mt-20" aria-labelledby="post-title">
      <Schema json={articleSchema} />
      <Schema json={breadcrumbSchema} />
      <Breadcrumbs items={[{ name: 'صفحه اصلی', href: '/' }, { name: 'بلاگ', href: '/blog' }, { name: post.title }]} />
      {/* اختیاری: تصویر کاور می‌تواند اینجا با سایزها برای LCP بهتر اضافه شود */}
      <h1 id="post-title" className="text-3xl font-bold tracking-tight">{post.title}</h1>
      <p className="mt-1 text-sm text-gray-600">{new Date(post.date).toLocaleDateString('fa-IR')}</p>
      <p className="mt-4 text-gray-800">{post.description}</p>
      <hr className="my-6" />
      <div className="text-gray-800">{post.content}</div>
    </article>
  );
}


