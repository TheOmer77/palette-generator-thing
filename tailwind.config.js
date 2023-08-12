import scrollbar from 'tailwind-scrollbar';
import selectionVariant from 'tailwindcss-selection-variant';
import { screens, tones } from './src/constants';

/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        fadein: 'fadein 200ms',
        fadeout: 'fadeout 200ms',
        slidein: 'slidein 200ms',
        slideout: 'slideout 200ms',
      },
      fontFamily: {
        sans: ['var(--font-family)', 'sans-serif'],
        mono: ['var(--font-family-mono)', 'monospace'],
      },
      keyframes: {
        fadein: { from: { opacity: 0 }, to: { opacity: 1 } },
        fadeout: { from: { opacity: 1 }, to: { opacity: 0 } },
        slidein: {
          from: { transform: 'translateY(100%)' },
          to: { transform: 'translateY(0%)' },
        },
        slideout: {
          from: { transform: 'translateY(0%)' },
          to: { transform: 'translateY(100%)' },
        },
      },
    },
    screens,
    colors: {
      white: '#fff',
      black: '#000',
      transparent: 'transparent',
      ...['primary', 'neutral', 'secondary', 'error'].reduce(
        (obj, colorName) => ({
          ...obj,
          [colorName]: [...tones, 'main', 'light', 'dark', 'contrast'].reduce(
            (obj, tone) => ({
              ...obj,
              [tone]: `rgb(var(--color-${colorName}-${tone}) / <alpha-value>)`,
            }),
            {}
          ),
        }),
        {}
      ),
    },
  },
  plugins: [scrollbar, selectionVariant],
};

export default config;
