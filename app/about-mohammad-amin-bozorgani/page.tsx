import type { Metadata } from 'next';
import Image from 'next/image';
import { SITE, createPageMeta } from '@/lib/seo';
import { Schema } from '@/components/Schema';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const metadata: Metadata = createPageMeta({
  title: `Mohammad Amin Bozorgani (محمد امین بزرگانی) | Full Stack Engineer`,
  description: `Official biography of Mohammad Amin Bozorgani (محمد امین بزرگانی), Senior Full Stack Engineer, SEO Expert, and System Architect from Iran. Specializing in Next.js, React, Node.js, and Technical SEO.`,
  url: `${SITE.domain}/about-mohammad-amin-bozorgani`,
  keywords: [
    'Mohammad Amin Bozorgani',
    'محمد امین بزرگانی',
    'امین بزرگانی',
    'Amin Bozorgani',
    'Full Stack Engineer',
    'Senior Developer',
    'SEO Expert',
    'System Architect',
    'Next.js Developer',
    'React Developer',
    'برنامه نویس فول استک',
    'توسعه دهنده وب'
  ]
});

export default function AboutMePage() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Mohammad Amin Bozorgani',
    alternateName: 'محمد امین بزرگانی',
    url: SITE.domain,
    image: [
      `${SITE.domain}/images/mohammad-amin-bozorgani-profile-1.webp`,
      `${SITE.domain}/images/mohammad-amin-bozorgani-workspace.webp`
    ],
    jobTitle: 'Full Stack Engineer & SEO Expert',
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance / Consultant'
    },
    description: 'Senior Full Stack Engineer and Technical SEO Expert specializing in Next.js, React, Node.js, and Web Performance.',
    sameAs: [
      SITE.github,
      SITE.linkedin,
      `https://twitter.com/${SITE.twitter.replace('@', '')}`
    ],
    knowsAbout: [
      'Next.js Architecture',
      'React.js',
      'Node.js',
      'Technical SEO',
      'Core Web Vitals',
      'System Architecture',
      'Progressive Web Apps (PWA)',
      'Web Performance Optimization'
    ],
    alumniOf: {
      '@type': 'Organization',
      name: 'Software Engineering'
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IR'
    }
  } as const;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.domain },
      { '@type': 'ListItem', position: 2, name: 'Mohammad Amin Bozorgani', item: `${SITE.domain}/about-mohammad-amin-bozorgani` }
    ]
  } as const;

  return (
    <article className="min-h-screen bg-[#0a0a0a] text-gray-200">
      <Schema json={personSchema} />
      <Schema json={breadcrumbSchema} />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[{ name: 'صفحه اصلی', href: '/' }, { name: 'Mohammad Amin Bozorgani' }]} />
        
        {/* Premium Hero Section */}
        <section className="mt-12 mb-24 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
              Mohammad Amin <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Bozorgani</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-medium text-gray-400">
              محمد امین بزرگانی
            </h2>
            <div className="flex flex-wrap gap-3 pt-2">
              <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium tracking-wide">Full Stack Engineer</span>
              <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium tracking-wide">SEO Expert</span>
              <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium tracking-wide">System Architect</span>
            </div>
            <p className="text-lg text-gray-400 leading-relaxed max-w-2xl pt-4">
              A passionate software engineer focused on building scalable, performant, and accessible web applications. I bridge the gap between complex engineering and exceptional user experience.
            </p>
          </div>
          
          <div className="w-full md:w-1/3 max-w-md">
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10 group">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 z-10 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-0"></div>
              <Image 
                src="/images/mohammad-amin-bozorgani-profile-1.webp" 
                alt="Mohammad Amin Bozorgani - محمد امین بزرگانی" 
                fill 
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105" 
                priority 
              />
            </div>
          </div>
        </section>

        {/* Biography Storytelling */}
        <section className="mb-24 scroll-mt-24">
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-4">
            <span className="w-8 h-px bg-blue-500"></span>
            Professional Biography
          </h3>
          <div className="prose prose-invert prose-lg max-w-none text-gray-300">
            <p>
              Hi, I&apos;m <strong>Mohammad Amin Bozorgani (محمد امین بزرگانی)</strong>, a Full Stack Engineer and Technical SEO Expert based in Iran. My journey in web development started with a deep curiosity about how digital products scale and how search engines understand the web.
            </p>
            <p>
              Over the years, I&apos;ve specialized in the modern JavaScript ecosystem, particularly <strong>Next.js, React, and Node.js</strong>. I don&apos;t just write code; I architect systems that are built for performance, accessibility, and discoverability. My unique blend of software engineering and Technical SEO allows me to build applications that not only function flawlessly but also rank at the top of Google search results.
            </p>
            <p>
              My philosophy is simple: <em>&quot;Build for the user, optimize for the machine.&quot;</em> Whether it&apos;s crafting a high-performance PWA, designing a microservices architecture, or implementing complex Schema markup for Google Entity Recognition, I ensure that every line of code serves a purpose.
            </p>
          </div>
        </section>

        {/* Core Expertise / Philosophy */}
        <section className="mb-24">
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-4">
            <span className="w-8 h-px bg-purple-500"></span>
            Core Expertise
          </h3>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="text-4xl mb-4">⚡</div>
              <h4 className="text-xl font-bold text-white mb-3">Next.js & React Architecture</h4>
              <p className="text-gray-400">Deep expertise in Server Components, SSR/SSG, streaming, and building complex layouts that load instantly.</p>
            </div>
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="text-4xl mb-4">🔍</div>
              <h4 className="text-xl font-bold text-white mb-3">Technical SEO & Web Vitals</h4>
              <p className="text-gray-400">Mastery in Core Web Vitals optimization, dynamic metadata, JSON-LD structured data, and search engine crawler behavior.</p>
            </div>
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="text-4xl mb-4">⚙️</div>
              <h4 className="text-xl font-bold text-white mb-3">Backend & DevOps</h4>
              <p className="text-gray-400">Designing robust APIs with Node.js/Express, managing databases (MongoDB, PostgreSQL), and orchestrating deployments with Docker.</p>
            </div>
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="text-4xl mb-4">📱</div>
              <h4 className="text-xl font-bold text-white mb-3">Progressive Web Apps (PWA)</h4>
              <p className="text-gray-400">Creating native-like web experiences with service workers, offline capabilities, and manifest configurations.</p>
            </div>
          </div>
        </section>

        {/* Personal Gallery Section */}
        <section className="mb-24">
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-4">
            <span className="w-8 h-px bg-pink-500"></span>
            Personal Gallery
          </h3>
          <p className="text-gray-400 mb-8">Glimpses into my workspace, coding sessions, and professional life.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Gallery Placeholders - requires actual images to be uploaded to public/images/ */}
            {[
              { id: 1, name: 'mohammad-amin-bozorgani-profile-1.webp', alt: 'محمد امین بزرگانی برنامه نویس فول استک - Mohammad Amin Bozorgani' },
              { id: 2, name: 'mohammad-amin-bozorgani-workspace.webp', alt: 'Mohammad Amin Bozorgani coding setup and workspace' },
              { id: 3, name: 'mohammad-amin-bozorgani-programming.webp', alt: 'Mohammad Amin Bozorgani developing Next.js application' },
              { id: 4, name: 'profile.webp', alt: 'محمد امین بزرگانی متخصص سئو تکنیکال' },
            ].map((img) => (
              <div key={img.id} className="relative aspect-square rounded-2xl overflow-hidden bg-gray-800 border border-gray-700 flex items-center justify-center text-center text-xs text-gray-500 group cursor-pointer">
                <Image 
                  src={`/images/${img.name}`} 
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                />
              </div>
            ))}
          </div>
        </section>

      </div>
    </article>
  );
}
