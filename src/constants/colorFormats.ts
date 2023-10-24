import {
  formatCss,
  formatHex,
  formatHsl,
  formatRgb,
  modeLch,
  useMode as loadMode,
  type Color,
} from 'culori/fn';

const lch = loadMode(modeLch);

type ColorFormat = {
  id: string;
  displayName: string;
  toString: (color: string | Color) => string;
};

export const colorFormats = [
  {
    id: 'hex',
    displayName: 'Hex',
    toString: color => formatHex(color) as string,
  },
  {
    id: 'rgb',
    displayName: 'RGB',
    toString: color => (formatRgb(color) as string).replaceAll(',', ''),
  },
  {
    id: 'rgbRaw',
    displayName: 'RGB (Raw)',
    toString: color =>
      (formatRgb(color) as string).replaceAll(',', '').slice(4, -1),
  },
  {
    id: 'hsl',
    displayName: 'HSL',
    toString: color => (formatHsl(color) as string).replaceAll(',', ''),
  },
  {
    id: 'hslRaw',
    displayName: 'HSL (Raw)',
    toString: color =>
      (formatHsl(color) as string).replaceAll(',', '').slice(4, -1),
  },
  {
    id: 'lch',
    displayName: 'LCH',
    toString: color =>
      `lch(${(formatCss(lch(color)) as string)
        .slice(4, -1)
        .split(' ')
        .map(num => Math.round(Number(num) * 100) / 100)
        .join(' ')})`,
  },
  {
    id: 'lchRaw',
    displayName: 'LCH (Raw)',
    toString: color =>
      (formatCss(lch(color)) as string)
        .slice(4, -1)
        .split(' ')
        .map(num => Math.round(Number(num) * 100) / 100)
        .join(' '),
  },
  { id: 'oklch', displayName: 'OKLCH' },
  { id: 'oklchRaw', displayName: 'OKLCH (Raw)' },
] as const satisfies readonly ColorFormat[];
