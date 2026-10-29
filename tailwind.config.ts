import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Premium Reliance Colour Palette
        navy: {
          DEFAULT: '#063B78',
          light: '#0B5EA8',
        },
        blue: {
          DEFAULT: '#168AAD',
          light: '#3BA4ED',
        },
        yellow: {
          DEFAULT: '#FFD21F',
          light: '#FFE066',
        },
        // Surface Colours
        white: '#FFFFFF',
        background: '#F1F7FC',
        // Text Colours
        dark: '#172B3A',
        secondary: '#536579',
        // UI Colours
        border: '#DCE5EE',
        success: '#15803D',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '88': '22rem',
        '96': '24rem',
        '104': '26rem',
        '112': '28rem',
        '120': '30rem',
      },
      fontSize: {
        'hero': ['clamp(3rem, 5vw, 3.75rem)', { lineHeight: '1.1', fontWeight: '700' }],
        'h1': ['clamp(2.25rem, 4vw, 3rem)', { lineHeight: '1.2', fontWeight: '700' }],
        'h2': ['clamp(1.75rem, 3vw, 2.25rem)', { lineHeight: '1.2', fontWeight: '600' }],
        'h3': ['clamp(1.25rem, 2vw, 1.75rem)', { lineHeight: '1.3', fontWeight: '600' }],
        'h4': ['clamp(1rem, 1.5vw, 1.25rem)', { lineHeight: '1.3', fontWeight: '600' }],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(6, 59, 120, 0.08)',
        'medium': '0 4px 16px rgba(6, 59, 120, 0.12)',
        'lift': '0 8px 24px rgba(6, 59, 120, 0.15)',
      },
    },
  },
  plugins: [],
};

export default config;
