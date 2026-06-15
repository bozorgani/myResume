import Image from 'next/image';

export function FeaturedDeveloper() {
  return (
    <section className="mt-16 mb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 no-print">
      <div className="relative rounded-3xl overflow-hidden bg-gray-900 border border-gray-800 shadow-2xl p-8 sm:p-12">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 blur-3xl rounded-full -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
          <div className="w-32 h-32 md:w-48 md:h-48 shrink-0 rounded-2xl overflow-hidden ring-4 ring-white/10 shadow-xl bg-gray-800 flex items-center justify-center text-xs text-gray-500 text-center relative group">
            <Image 
              src="/images/IMG_6651_1_-removebg-preview.png" 
              alt="محمد امین بزرگانی متخصص فول استک - Mohammad Amin Bozorgani" 
              fill 
              sizes="(max-width: 768px) 128px, 192px"
              className="object-cover transition-transform duration-500 group-hover:scale-110" 
            />
          </div>
          
          <div className="flex-1 text-center md:text-right">
            <h2 className="text-sm font-bold tracking-widest text-brand uppercase mb-2">Featured Expert</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-2">Mohammad Amin Bozorgani</h3>
            <h4 className="text-xl md:text-2xl font-medium text-gray-300 mb-6">محمد امین بزرگانی</h4>
            
            <p className="text-gray-400 leading-relaxed max-w-2xl mx-auto md:mx-0 mb-8">
              A <strong>Senior Full Stack Engineer</strong> and <strong>SEO Expert</strong> with a proven track record in building high-performance web applications using <em>Next.js</em>, <em>React</em>, and modern architecture patterns. I specialize in bridging the gap between exceptional User Experience and perfect Search Engine visibility.
            </p>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <span className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm font-medium text-gray-300">Next.js Architecture</span>
              <span className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm font-medium text-gray-300">SEO Engineering</span>
              <span className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm font-medium text-gray-300">Backend Engineering</span>
              <a href="/about-mohammad-amin-bozorgani" className="px-5 py-2 rounded-lg bg-brand hover:bg-brand-dark text-white text-sm font-semibold transition-colors shadow-lg shadow-brand/30">
                View Full Profile
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
