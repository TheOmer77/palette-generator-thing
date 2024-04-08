import type { Config } from 'tailwindcss';
import scrollbar from 'tailwind-scrollbar';
import animate from 'tailwindcss-animate';

// importing '@/config/tailwind' doesn't work here
import {
  animations,
  autofillOverride,
  stateLayer,
} from './src/config/tailwind';

const shades = [50, ...[...Array(9).keys()].map(key => (key + 1) * 100), 950];

const config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: { '2xl': '1400px' },
    },
    extend: {
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
  plugins: [animate, animations, autofillOverride, scrollbar, stateLayer],
} satisfies Config;

export default config;
