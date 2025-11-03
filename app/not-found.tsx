import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">Page not found</h1>
      <p className="text-gray-700">The page you’re looking for doesn’t exist or was moved.</p>
      <div className="flex gap-3">
        <Link href="/" className="rounded bg-brand px-4 py-2 font-medium text-white hover:bg-brand-dark">Go home</Link>
        <Link href="/projects" className="rounded border px-4 py-2 hover:bg-gray-50">Browse Projects</Link>
      </div>
    </div>
  );
}


