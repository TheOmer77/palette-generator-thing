import type { Config } from 'tailwindcss';
import scrollbar from 'tailwind-scrollbar';
import { screens, shades } from './src/constants';

const config: Config = {
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
        fadein: { from: { opacity: '0' }, to: { opacity: '1' } },
        fadeout: { from: { opacity: '1' }, to: { opacity: '0' } },
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
      ...['primary', 'neutral', 'danger' /*, 'secondary' */].reduce(
        (obj, colorName) => ({
          ...obj,
          [colorName]: [...shades].reduce(
            (obj, shade) => ({
              ...obj,
              [shade]: `rgb(var(--color-${colorName}-${shade}) / <alpha-value>)`,
            }),
            {}
          ),
        }),
        {}
      ),
    },
  },
  plugins: [scrollbar],
};

export default config;
