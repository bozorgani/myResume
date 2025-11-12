import type { Config } from 'tailwindcss';

// TailwindCSS configuration optimized for performance and a11y.
// - 'content' paths ensure purging of unused styles for minimal CSS.
// - Custom color tokens keep design consistent and accessible.
const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  // Optimize CSS output by removing unused styles (Tailwind v3+ automatically purges)
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0369a1', // sky-700 - کنتراست بهتر با text-white (WCAG AA)
          dark: '#075985' // sky-800
        }
      }
    }
  },
  plugins: [],
  // Minimal safelist - only classes that are dynamically generated and can't be detected
  safelist: [
    'dark', // Required for dark mode class toggle
    'blog-content', // Used in blog posts with dangerouslySetInnerHTML
  ]
};

export default config;


