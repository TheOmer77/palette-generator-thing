import type { Config } from 'tailwindcss';
import scrollbar from 'tailwind-scrollbar';
import plugin from 'tailwindcss/plugin';

//@ts-expect-error Javascript only, no type decleration
import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette';
//@ts-expect-error Javascript only, no type decleration
import toColorValue from 'tailwindcss/lib/util/toColorValue';

const shades = [50, ...[...Array(9).keys()].map(key => (key + 1) * 100), 950];

const customPlugin = plugin(({ addUtilities, matchUtilities, theme }) => {
  const themeColors = flattenColorPalette(theme('colors'));

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
    { values: themeColors, type: 'color' }
  );

  addUtilities({
    '.state-layer': {
      position: 'relative',
      overflow: 'hidden',
      '&.fixed': { position: 'fixed' },
      '&.absolute': { position: 'absolute' },
      '&::after': {
        content: '""',
        position: 'absolute',
        insetBlockStart: '0',
        insetInlineStart: '0',
        width: '100%',
        height: '100%',
        zIndex: '1',
        transition: 'background-color 100ms cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  });
  matchUtilities(
    { 'state-layer': value => ({ '&::after': { backgroundColor: value } }) },
    { values: themeColors, type: 'color' }
  );
});

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: { inherit: 'inherit' },
      height: { screen: '100dvh' },
      maxHeight: { screen: '100dvh' },
      screens: { '2xl': '1440px' },
      animation: {
        fadein: 'fadein 200ms',
        fadeout: 'fadeout 200ms',
        'fadeout-fast': 'fadeout 150ms',
        slidein: 'slidein 200ms',
        slideout: 'slideout 200ms',
        slideDown: 'slideDown 200ms',
        slideUp: 'slideUp 200ms',
        slideDownAndFade: 'slideDownAndFade 150ms cubic-bezier(0, 0, 0.2, 1);',
        slideLeftAndFade: 'slideLeftAndFade 150ms cubic-bezier(0, 0, 0.2, 1);',
        slideUpAndFade: 'slideUpAndFade 150ms cubic-bezier(0, 0, 0.2, 1);',
        slideRightAndFade:
          'slideRightAndFade 150ms cubic-bezier(0, 0, 0.2, 1);',
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
        slideDown: {
          from: { height: '0' },
          to: { height: 'var(--radix-collapsible-content-height)' },
        },
        slideUp: {
          from: { height: 'var(--radix-collapsible-content-height)' },
          to: { height: '0' },
        },
        slideDownAndFade: {
          from: { opacity: '0', transform: 'translateY(-2px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeftAndFade: {
          from: { opacity: '0', transform: 'translateX(2px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        slideUpAndFade: {
          from: { opacity: '0', transform: 'translateY(2px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideRightAndFade: {
          from: { opacity: '0', transform: 'translateX(-2px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
    colors: {
      inherit: 'inherit',
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
