import Link from 'next/link';

export function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="rounded-lg border p-6 dark:border-gray-800">
      <h2 id="contact-title" className="text-xl font-semibold">تماس با من</h2>
      <p className="mt-2 text-gray-700 dark:text-gray-300">برای همکاری یا مشاوره تماس بگیرید.</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <a className="rounded bg-brand px-4 py-2 font-medium text-white hover:bg-brand-dark" href="mailto:hello@bozorgani.ir">ایمیل</a>
        <Link href="/contact" className="rounded border px-4 py-2 font-medium hover:bg-gray-50 dark:hover:bg-gray-800">فرم تماس</Link>
        <a href="https://github.com/bozorgani" className="rounded border px-4 py-2 font-medium hover:bg-gray-50 dark:hover:bg-gray-800" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://www.linkedin.com/in/bozorgani" className="rounded border px-4 py-2 font-medium hover:bg-gray-50 dark:hover:bg-gray-800" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>
    </section>
  );
}


