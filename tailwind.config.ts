import type { Config } from 'tailwindcss';
import scrollbar from 'tailwind-scrollbar';
import animate from 'tailwindcss-animate';
import plugin from 'tailwindcss/plugin';

//@ts-expect-error Javascript only, no type decleration
import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette';
//@ts-expect-error Javascript only, no type decleration
import toColorValue from 'tailwindcss/lib/util/toColorValue';

const shades = [50, ...[...Array(9).keys()].map(key => (key + 1) * 100), 950];

const animationVars = plugin(({ matchUtilities, theme }) => {
  matchUtilities(
    { duration: value => ({ '--animation-duration': value }) },
    { values: theme('transitionDuration') }
  );
  matchUtilities(
    { duration: value => ({ '--animation-timing-function': value }) },
    { values: theme('transitionTimingFunction') }
  );
});
const customPlugin = plugin(({ addUtilities, matchUtilities, theme }) => {
  const themeColors = flattenColorPalette(theme('colors'));

  matchUtilities(
    {
      'autofill-override': value => ({
        '--tw-autofill-override-bg': toColorValue(value),
        '&:-webkit-autofill': {
          WebkitBoxShadow: `0 0 0px 1000px var(--tw-autofill-override-bg) inset,
var(--tw-ring-offset-shadow), var(--tw-ring-shadow),
var(--tw-shadow, 0 0 #0000) !important`,
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
        transition: 'background-color 75ms cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  });
  matchUtilities(
    { 'state-layer': value => ({ '&::after': { backgroundColor: value } }) },
    { values: themeColors, type: 'color' }
  );
});

const config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: { '2xl': '1400px' },
    },
    extend: {
      animation: ({ theme }) => {
        const duration = `var(
  --animation-duration,
  ${theme('transitionDuration.DEFAULT')}
)`,
          timingFunction = `var(
  --animation-timing-function,
  ${theme('transitionTimingFunction.DEFAULT')}
)`;
        return {
          'collapse-in': `collapse-in ${duration} ${timingFunction}`,
          'collapse-out': `collapse-out ${duration} ${timingFunction}`,
          'fade-in': `fade-in ${duration} ${timingFunction}`,
          'fade-out': `fade-out ${duration} ${timingFunction}`,
          'scale-x-in': `scale-x-in ${duration} ${timingFunction}`,
          'scale-x-out': `scale-x-out ${duration} ${timingFunction}`,
          'scale-y-in': `scale-y-in ${duration} ${timingFunction}`,
          'scale-y-out': `scale-y-out ${duration} ${timingFunction}`,
          'slide-in': `slide-in ${duration} ${timingFunction}`,
          'slide-out': `slide-out ${duration} ${timingFunction}`,
          'tooltip-in': `tooltip-in 150ms ${timingFunction}`,
          'tooltip-out': `fade-out 150ms ${timingFunction}`,
          'zoom-in': `zoom-in ${duration} ${timingFunction}`,
          'zoom-out': `zoom-out ${duration} ${timingFunction}`,
        };
      },
      borderRadius: {
        lg: 'var(--border-radius)',
        md: 'calc(var(--border-radius) - 2px)',
        sm: 'calc(var(--border-radius) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-family)', 'sans-serif'],
        mono: ['var(--font-family-mono)', 'monospace'],
      },
      height: { screen: '100dvh' },
      keyframes: {
        'collapse-in': {
          from: { height: '0', overflow: 'hidden' },
          to: {
            height: 'var(--radix-collapsible-content-height)',
            overflow: 'hidden',
          },
        },
        'collapse-out': {
          from: {
            height: 'var(--radix-collapsible-content-height)',
            overflow: 'hidden',
          },
          to: { height: '0', overflow: 'hidden' },
        },
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'fade-out': { from: { opacity: '1' }, to: { opacity: '0' } },
        'scale-x-in': {
          from: { opacity: '0', transform: 'scaleX(0.95)' },
          to: { opacity: '1', transform: 'scaleX(1)' },
        },
        'scale-x-out': {
          from: { opacity: '1', transform: 'scaleX(1)' },
          to: { opacity: '0', transform: 'scaleX(0.95)' },
        },
        'scale-y-in': {
          from: { opacity: '0', transform: 'scaleY(0.95)' },
          to: { opacity: '1', transform: 'scaleY(1)' },
        },
        'scale-y-out': {
          from: { opacity: '1', transform: 'scaleY(1)' },
          to: { opacity: '0', transform: 'scaleY(0.95)' },
        },
        'slide-in': {
          from: {
            transform: `translate(
  var(--slide-translate-origin-x, 0%),
  var(--slide-translate-origin-y, 0%)
)`,
          },
          to: { transform: 'translate(0%, 0%)' },
        },
        'slide-out': {
          from: { transform: 'translate(0%, 0%)' },
          to: {
            transform: `translate(
  var(--slide-translate-origin-x, 0%),
  var(--slide-translate-origin-y, 0%)
)`,
          },
        },
        'tooltip-in': {
          from: {
            opacity: '0',
            transform: `translate(
  var(--slide-translate-origin-x, 0%),
  var(--slide-translate-origin-y, 0%)
)`,
          },
          to: { opacity: '1', transform: 'translate(0%, 0%)' },
        },
        'zoom-in': {
          from: {
            opacity: '0',
            transform: `translate(
  var(--zoom-translate-x, 0%),
  var(--zoom-translate-y, 0%)
) scale(0.95)`,
          },
          to: {
            opacity: '1',
            transform: `translate(
  var(--zoom-translate-x, 0%),
  var(--zoom-translate-y, 0%)
) scale(1)`,
          },
        },
        'zoom-out': {
          from: {
            opacity: '1',
            transform: `translate(
  var(--zoom-translate-x, 0%),
  var(--zoom-translate-y, 0%)
) scale(1)`,
          },
          to: {
            opacity: '0',
            transform: `translate(
  var(--zoom-translate-x, 0%),
  var(--zoom-translate-y, 0%)
) scale(0.95)`,
          },
        },
      },
      maxHeight: { screen: '100dvh' },
      screens: { '2xl': '1440px' },
      spacing: { em: '1em', inherit: 'inherit' },
      transitionTimingFunction: { DEFAULT: 'cubic-bezier(0.2, 1, 0.4, 1)' },
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
            {
              DEFAULT: `rgb(var(--color-${colorName}-main))`,
              active: `rgb(var(--color-${colorName}-active))`,
              foreground: `rgb(var(--color-${colorName}-foreground))`,
            }
          ),
        }),
        {}
      ),

      border: 'rgb(var(--color-border))',
      ring: 'rgb(var(--color-ring))',
      background: 'rgb(var(--color-background))',
      foreground: 'rgb(var(--color-foreground))',
      secondary: {
        DEFAULT: 'rgb(var(--color-secondary))',
        foreground: 'rgb(var(--color-secondary-foreground))',
      },
      muted: {
        DEFAULT: 'rgb(var(--color-muted))',
        foreground: 'rgb(var(--color-muted-foreground))',
      },
      accent: {
        DEFAULT: 'rgb(var(--color-accent))',
        foreground: 'rgb(var(--color-accent-foreground))',
      },
      popover: {
        DEFAULT: 'rgb(var(--color-popover))',
        foreground: 'rgb(var(--color-popover-foreground))',
      },
      card: {
        DEFAULT: 'rgb(var(--color-card))',
        foreground: 'rgb(var(--color-card-foreground))',
      },
      input: {
        DEFAULT: 'rgb(var(--color-input))',
        hover: 'rgb(var(--color-input-hover))',
        invalid: 'rgb(var(--color-input-invalid))',
      },
    },
  },
  plugins: [scrollbar, animate, animationVars, customPlugin],
} satisfies Config;

export default config;
