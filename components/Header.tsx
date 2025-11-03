import Link from 'next/link';

export function Header() {
  return (
    <header className="border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3" aria-label="Primary">
        <Link href="/" className="font-semibold text-gray-900" aria-label="Go to home">
          M.A. Bozorgani
        </Link>
        <ul className="flex items-center gap-6">
          <li><Link className="hover:text-brand" href="/projects">Projects</Link></li>
          <li><Link className="hover:text-brand" href="/blog">Blog</Link></li>
          <li><Link className="hover:text-brand" href="/resume">Resume</Link></li>
          <li><Link className="hover:text-brand" href="/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}

