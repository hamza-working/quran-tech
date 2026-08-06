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
        primary: {
          50: '#e6fffe',
          100: '#ccfffd',
          400: '#00e5e0',
          500: '#00cec9',
          600: '#00b5b0',
          700: '#009c98',
          800: '#008380',
          900: '#006a67',
        },
        gold: {
          300: '#fde68a',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
      },
      fontFamily: {
        cairo: ['var(--font-cairo)'],
      },
      boxShadow: {
        kids: '0 8px 30px rgba(0, 206, 201, 0.25)',
        gold: '0 8px 30px rgba(251, 191, 36, 0.3)',
      },
    },
  },
  plugins: [],
};

export default config;