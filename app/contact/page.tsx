import type { Metadata } from 'next';
import { SITE, createPageMeta } from '@/lib/seo';

export const metadata: Metadata = createPageMeta({
  title: `Contact | ${SITE.name}`,
  description: `Contact ${SITE.name} for collaborations, consulting, or opportunities.`,
  url: `${SITE.domain}/contact`
});

export default function ContactPage() {
  const mailto = `mailto:hello@bozorgani.ir`;
  return (
    <article className="space-y-6" aria-labelledby="contact-title">
      <header>
        <h1 id="contact-title" className="text-3xl font-bold tracking-tight">Contact</h1>
        <p className="mt-2 text-gray-700">Send a message using the form below or email me directly.</p>
      </header>

      <form action={mailto} method="post" className="max-w-xl space-y-4" aria-describedby="contact-help">
        <p id="contact-help" className="text-sm text-gray-600">This form opens your email client to send the message.</p>
        <div>
          <label htmlFor="name" className="block text-sm font-medium">Name</label>
          <input id="name" name="name" required className="mt-1 w-full rounded border px-3 py-2" autoComplete="name" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">Email</label>
          <input id="email" name="email" type="email" required className="mt-1 w-full rounded border px-3 py-2" autoComplete="email" />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium">Message</label>
          <textarea id="message" name="body" required rows={6} className="mt-1 w-full rounded border px-3 py-2" />
        </div>
        <div className="flex items-center gap-3">
          <button type="submit" className="rounded bg-brand px-4 py-2 font-medium text-white hover:bg-brand-dark">Open email</button>
          <a href={mailto} className="text-brand hover:underline">Or email directly</a>
        </div>
      </form>
    </article>
  );
}


