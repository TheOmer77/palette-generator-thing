import type { Config } from 'tailwindcss';
import scrollbar from 'tailwind-scrollbar';
import plugin from 'tailwindcss/plugin';
import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette';
import toColorValue from 'tailwindcss/lib/util/toColorValue';

const shades = [50, ...[...Array(9).keys()].map(key => (key + 1) * 100), 950];

const customPlugin = plugin(({ matchUtilities, theme }) => {
  const themeColors = flattenColorPalette(theme('colors'));
  const colors = Object.fromEntries(
    Object.entries(themeColors).map(([k, v]) => [k, toColorValue(v)])
  );
  matchUtilities(
    {
      'autofill-override': value => ({
        '&:-webkit-autofill': {
          WebkitBoxShadow: `0 0 0px 1000px ${toColorValue(
            value
          )} inset !important`,
        },
      }),
    },
    { values: colors, type: 'color' }
  );
});

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
    colors: {
      white: '#fff',
      black: '#000',
      transparent: 'transparent',
      ...['primary', 'neutral', 'danger'].reduce(
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
  plugins: [scrollbar, customPlugin],
};

export default config;
