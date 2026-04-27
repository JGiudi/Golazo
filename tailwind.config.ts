import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Tokens del "frontend real" (Vite) portados a Tailwind v3
        brand: '#00E676',
        'brand-dark': '#00C853',
        bg: '#0B0E11',
        surface: '#1A1D21',
        'surface-light': '#2A2D35',
        'accent-yellow': '#FFD600',

        // Tokens solicitados originalmente (compat)
        'pitch-black': '#080C10',
        'electric-green': '#00E676',
        'goal-yellow': '#FFD600',
        'dark-surface': '#12181F',
      },
      fontFamily: {
        display: ['var(--font-bebas-neue)', 'sans-serif'],
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
