import {
  formatHex,
  formatRgb,
  modeRgb,
  useMode as loadMode,
  type Color,
  type Rgb,
} from 'culori/fn';
import { fixupRgb } from 'utils';

const rgb = loadMode(modeRgb);

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
    toString: color => formatRgb(color) as string,
  },
  {
    id: 'rgbRaw',
    displayName: 'RGB (Raw)',
    toString: color => {
      const { r, g, b } = rgb(color) as Rgb;
      return [fixupRgb(r), fixupRgb(g), fixupRgb(b)].join(' ');
    },
  },
  { id: 'hsl', displayName: 'HSL' },
  { id: 'hslRaw', displayName: 'HSL (Raw)' },
  { id: 'lch', displayName: 'LCH' },
  { id: 'lchRaw', displayName: 'LCH (Raw)' },
  { id: 'oklch', displayName: 'OKLCH' },
  { id: 'oklchRaw', displayName: 'OKLCH (Raw)' },
] as const satisfies readonly ColorFormat[];
