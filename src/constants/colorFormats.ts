import { formatHex, formatRgb, type Color } from 'culori/fn';

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
  { id: 'hsl', displayName: 'HSL' },
  { id: 'hslRaw', displayName: 'HSL (Raw)' },
  { id: 'lch', displayName: 'LCH' },
  { id: 'lchRaw', displayName: 'LCH (Raw)' },
  { id: 'oklch', displayName: 'OKLCH' },
  { id: 'oklchRaw', displayName: 'OKLCH (Raw)' },
] as const satisfies readonly ColorFormat[];
