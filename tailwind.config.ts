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
          DEFAULT: '#0ea5e9', // sky-500
          dark: '#0284c7'
        }
      }
    }
  },
  plugins: []
};

export default config;


