import Link from 'next/link';

export type Crumb = { name: string; href?: string };

export function Breadcrumbs({ items, className = '' }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="مسیر ناوبری" className={`text-sm text-gray-600 dark:text-gray-400 ${className}`}>
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((c, i) => (
          <li key={`${c.name}-${i}`} className="flex items-center gap-2">
            {c.href ? (
              <Link href={c.href as any} className="hover:underline hover:text-brand transition-colors">{c.name}</Link>
            ) : (
              <span aria-current="page" className="font-medium text-gray-900 dark:text-gray-200">{c.name}</span>
            )}
            {i < items.length - 1 && <span aria-hidden="true" className="text-gray-400 dark:text-gray-600">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}


