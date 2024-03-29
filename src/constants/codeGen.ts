import {
  formatCss,
  formatHex,
  formatHsl,
  formatRgb,
  modeLch,
  modeOklch,
  useMode as loadMode,
} from 'culori/fn';
import type { ColorFormat } from 'types';

const lch = loadMode(modeLch),
  oklch = loadMode(modeOklch);

export const codeFormats = {
  none: { displayName: 'None' },
  css: { displayName: 'CSS' },
  scss: { displayName: 'SCSS' },
  json: { displayName: 'JSON' },
} as const;

export const colorFormats = {
  hex: {
    displayName: 'Hex',
    toString: color => formatHex(color) as string,
  },
  rgb: {
    displayName: 'RGB',
    toString: color => (formatRgb(color) as string).replaceAll(',', ''),
  },
  rgbRaw: {
    displayName: 'RGB (Raw)',
    toString: color =>
      (formatRgb(color) as string).replaceAll(',', '').slice(4, -1),
  },
  hsl: {
    displayName: 'HSL',
    toString: color => (formatHsl(color) as string).replaceAll(',', ''),
  },
  hslRaw: {
    displayName: 'HSL (Raw)',
    toString: color =>
      (formatHsl(color) as string).replaceAll(',', '').slice(4, -1),
  },
  lch: {
    displayName: 'LCH',
    toString: color =>
      `lch(${(formatCss(lch(color)) as string)
        .slice(4, -1)
        .split(' ')
        .map(num => Math.round(Number(num) * 100) / 100)
        .join(' ')})`,
  },
  lchRaw: {
    displayName: 'LCH (Raw)',
    toString: color =>
      (formatCss(lch(color)) as string)
        .slice(4, -1)
        .split(' ')
        .map(num => Math.round(Number(num) * 100) / 100)
        .join(' '),
  },
  oklch: {
    displayName: 'OKLCH',
    toString: color =>
      `oklch(${(formatCss(oklch(color)) as string)
        .slice(6, -1)
        .split(' ')
        .map(num => Math.round(Number(num) * 100) / 100)
        .join(' ')})`,
  },
  oklchRaw: {
    displayName: 'OKLCH (Raw)',
    toString: color =>
      (formatCss(oklch(color)) as string)
        .slice(6, -1)
        .split(' ')
        .map(num => Math.round(Number(num) * 100) / 100)
        .join(' '),
  },
} as const satisfies Record<string, ColorFormat>;
