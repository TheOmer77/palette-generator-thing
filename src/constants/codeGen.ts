import {
  formatCss,
  formatHex,
  formatHsl,
  formatRgb,
  modeLab,
  modeLch,
  modeOklch,
  useMode as loadMode,
} from 'culori/fn';
import type { ColorFormat } from '@/types/codeGen';

const lab = loadMode(modeLab),
  lch = loadMode(modeLch),
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
    formatColor: color => formatHex(color) as string,
  },
  rgb: {
    displayName: 'RGB',
    formatColor: color => (formatRgb(color) as string).replaceAll(',', ''),
  },
  rgbRaw: {
    displayName: 'RGB (Raw)',
    formatColor: color =>
      (formatRgb(color) as string).replaceAll(',', '').slice(4, -1),
  },
  hsl: {
    displayName: 'HSL',
    formatColor: color => (formatHsl(color) as string).replaceAll(',', ''),
  },
  hslRaw: {
    displayName: 'HSL (Raw)',
    formatColor: color =>
      (formatHsl(color) as string).replaceAll(',', '').slice(4, -1),
  },
  lab: {
    displayName: 'LAB',
    formatColor: color =>
      `lab(${(formatCss(lab(color)) as string)
        .slice(4, -1)
        .split(' ')
        .map(num => Math.round(Number(num) * 100) / 100)
        .join(' ')})`,
  },
  labRaw: {
    displayName: 'LAB (Raw)',
    formatColor: color =>
      (formatCss(lab(color)) as string)
        .slice(4, -1)
        .split(' ')
        .map(num => Math.round(Number(num) * 100) / 100)
        .join(' '),
  },
  lch: {
    displayName: 'LCH',
    formatColor: color =>
      `lch(${(formatCss(lch(color)) as string)
        .slice(4, -1)
        .split(' ')
        .map(num => Math.round(Number(num) * 100) / 100)
        .join(' ')})`,
  },
  lchRaw: {
    displayName: 'LCH (Raw)',
    formatColor: color =>
      (formatCss(lch(color)) as string)
        .slice(4, -1)
        .split(' ')
        .map(num => Math.round(Number(num) * 100) / 100)
        .join(' '),
  },
  oklch: {
    displayName: 'OKLCH',
    formatColor: color =>
      `oklch(${(formatCss(oklch(color)) as string)
        .slice(6, -1)
        .split(' ')
        .map(num => Math.round(Number(num) * 100) / 100)
        .join(' ')})`,
  },
  oklchRaw: {
    displayName: 'OKLCH (Raw)',
    formatColor: color =>
      (formatCss(oklch(color)) as string)
        .slice(6, -1)
        .split(' ')
        .map(num => Math.round(Number(num) * 100) / 100)
        .join(' '),
  },
} as const satisfies Record<string, ColorFormat>;
