export type Project = {
  slug: string;
  title: string;
  oneLiner: string;
  description: string;
  tech: string[];
  image: string; // path under /public
  liveUrl?: string;
  repoUrl?: string;
};

export const projects: Project[] = [
  {
    slug: 'full-stack-developer',
    title: 'Full Stack Developer Case Study',
    oneLiner: 'A scalable web application built with Next.js, Node.js, and MongoDB.',
    description:
      'Designed and implemented a scalable web platform focusing on performance, accessibility, and SEO. Implemented SSR/SSG strategies, API design, and CI/CD.',
    tech: ['Next.js', 'TypeScript', 'Node.js', 'MongoDB', 'TailwindCSS'],
    image: '/images/project-1-placeholder.svg',
    liveUrl: 'https://bozorgani.ir/demo/full-stack',
    repoUrl: 'https://github.com/bozorgani/full-stack-demo'
  },
  {
    slug: 'perf-optimization-toolkit',
    title: 'Performance Optimization Toolkit',
    oneLiner: 'Improving Core Web Vitals with code-splitting and image optimization.',
    description:
      'A toolkit and methodology to systematically improve LCP, CLS, and INP in production apps using profiling, code-splitting, and optimized media delivery.',
    tech: ['React', 'Next/Image', 'Lighthouse', 'Web Vitals'],
    image: '/images/project-2-placeholder.svg',
    liveUrl: 'https://bozorgani.ir/demo/perf-toolkit',
    repoUrl: 'https://github.com/bozorgani/perf-toolkit'
  }
];

export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}


