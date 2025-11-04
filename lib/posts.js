const CMS_API_BASE = process.env.NEXT_PUBLIC_CMS_API || 'http://localhost:4000';

function buildMediaUrl(path) {
  if (!path) return undefined;
  if (path.startsWith('http')) return path;
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${CMS_API_BASE}${clean}`;
}

function extractTextFromTiptap(node) {
  if (!node) return '';
  if (typeof node === 'string') return node;
  if (Array.isArray(node)) return node.map(extractTextFromTiptap).join('');
  const text = node.text || '';
  const children = node.content ? extractTextFromTiptap(node.content) : '';
  return node.type === 'paragraph' ? `\n\n${text}${children}` : `${text}${children}`;
}

function renderContentToHtml(content) {
  if (!content) return '';
  if (typeof content === 'string') return content;
  try {
    const walk = (node) => {
      if (!node) return '';
      if (Array.isArray(node)) return node.map(walk).join('');
      const type = node.type;
      const text = node.text || '';
      const marks = (node.marks || []).map((m) => m.type);
      const openMarks = (s) => marks.reduce((acc, m) => {
        if (m === 'bold' || m === 'strong') return `<strong>${acc}`;
        if (m === 'italic' || m === 'em') return `<em>${acc}`;
        if (m === 'code') return `<code>${acc}`;
        return acc;
      }, s);
      const closeMarks = (s) => marks.reduceRight((acc, m) => {
        if (m === 'bold' || m === 'strong') return `${acc}</strong>`;
        if (m === 'italic' || m === 'em') return `${acc}</em>`;
        if (m === 'code') return `${acc}</code>`;
        return acc;
      }, '');
      const children = node.content ? walk(node.content) : '';
      switch (type) {
        case 'text':
          return `${openMarks(text)}${closeMarks('')}`;
        case 'paragraph':
          return `<p>${children}</p>`;
        case 'heading': {
          const level = Math.min(6, Math.max(1, (node.attrs && node.attrs.level) || 2));
          return `<h${level}>${children}</h${level}>`;
        }
        case 'bulletList':
          return `<ul>${children}</ul>`;
        case 'orderedList':
          return `<ol>${children}</ol>`;
        case 'listItem':
          return `<li>${children}</li>`;
        case 'blockquote':
          return `<blockquote>${children}</blockquote>`;
        case 'horizontalRule':
          return '<hr />';
        case 'hardBreak':
          return '<br />';
        case 'image': {
          const src = buildMediaUrl(node.attrs && node.attrs.src) || '';
          const alt = (node.attrs && node.attrs.alt) || '';
          return src ? `<img src="${src}" alt="${alt}" />` : '';
        }
        default:
          return children;
      }
    };
    return walk(content);
  } catch {
    return `<p>${extractTextFromTiptap(content)}</p>`;
  }
}

function mapCmsPostToSitePost(p) {
  const imagePath = (p && p.coverImageId && p.coverImageId.path) || (p && p.seo && p.seo.ogImageId && p.seo.ogImageId.path);
  return {
    slug: p.slug,
    title: p.title,
    description: p.excerpt || (p.seo && p.seo.metaDescription) || '',
    date: p.publishAt || p.updatedAt || p.createdAt || new Date().toISOString(),
    image: buildMediaUrl(imagePath),
    content: renderContentToHtml(p.content)
  };
}

export async function getAllPosts() {
  const url = `${CMS_API_BASE}/v1/posts?status=published&limit=100`;
  const res = await fetch(url, { next: { revalidate: 300 } });
  if (!res.ok) return [];
  const data = await res.json();
  const items = Array.isArray(data && data.items) ? data.items : [];
  return items.map(mapCmsPostToSitePost).sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug) {
  const res = await fetch(`${CMS_API_BASE}/v1/posts/slug/${slug}`, { next: { revalidate: 300 } });
  if (!res.ok) return undefined;
  const data = await res.json();
  return mapCmsPostToSitePost(data);
}
