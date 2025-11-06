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
  plugins: []
};

export default config;


