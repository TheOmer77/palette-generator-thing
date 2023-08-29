/* import {
  argbFromHex,
  blueFromArgb,
  greenFromArgb,
  Hct,
  hexFromArgb,
  redFromArgb,
} from '@material/material-color-utilities'; */
// import { defaultErrorHue } from 'constants';
import { shades } from 'constants';
import {
  formatHex,
  modeHsl,
  modeOklch,
  modeRgb,
  parseHex,
  random,
  type Hsl,
  type Oklch,
  // This is named like a react hook, which confuses ESLint
  useMode as loadMode,
  toGamut,
} from 'culori/fn';

const hsl = loadMode(modeHsl),
  oklch = loadMode(modeOklch);
loadMode(modeRgb);

const fixupRgb = (value: number) =>
  Math.round(Math.max(0, Math.min(1, value)) * 255);

export const isValidHexColor = (hex: string) => !!parseHex(hex);

export const autoAddHexHash = (value: string) =>
  typeof parseHex(value) !== 'undefined' && !value.startsWith('#')
    ? `#${value}`
    : value;

export const hexInverseBw = (hex: string) => {
  const l = fixupRgb((hsl(hex) as Hsl).l);
  return `rgba(${l < 140 ? '255,255,255' : '0,0,0'},var(--tw-text-opacity, 1)`;
};

export const randomHexColor = () => formatHex(random());

export function generatePalette(baseColor: string, returnAs?: 'hex'): string[];
export function generatePalette(
  baseColor: string,
  returnAs: 'rgbValues'
): [r: number, g: number, b: number][];
export function generatePalette(
  baseColor: string,
  returnAs: 'hex' | 'rgbValues' = 'hex'
) {
  const { c, h } = oklch(parseHex(baseColor) ? baseColor : '#000') as Oklch;

  return shades.map(shade => {
    const { r, g, b } = toGamut('rgb')({
      mode: 'oklch',
      l: (1000 - shade) / 1000,
      c,
      h,
    });
    return returnAs === 'rgbValues'
      ? [fixupRgb(r), fixupRgb(g), fixupRgb(b)]
      : formatHex({ mode: 'rgb', r, g, b });
  });
}

/* OLD STUFF STARTS HERE

export type Rgb = [red: number, green: number, blue: number];

export const rgbFromHex = (hex: string): Rgb => {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
    hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b)
  );
  if (!result) throw new Error(`Invalid hex color: ${hex}`);

  return [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16),
  ];
};

export const rgbFromArgb = (argb: number): Rgb => [
  redFromArgb(argb),
  greenFromArgb(argb),
  blueFromArgb(argb),
];

export const isValidHexColor = (hex: string) =>
  /^#([0-9A-F]{3}){1,2}$/i.test(hex);

export function getNeutralVariantHex(baseColor: string, format?: 'hex'): string;
export function getNeutralVariantHex(
  baseColor: string,
  format?: 'argb'
): number;
export function getNeutralVariantHex(baseColor: string, format?: 'rgb'): Rgb;
export function getNeutralVariantHex(
  baseColor: string,
  format: 'hex' | 'rgb' | 'argb' = 'hex'
) {
  const baseColorHct = Hct.fromInt(
    isValidHexColor(baseColor) ? argbFromHex(baseColor) : 0
  );
  const resultHct = Hct.from(
    baseColorHct.hue,
    Math.min(baseColorHct.chroma / 6, 8),
    baseColorHct.tone
  );
  const resultArgb = resultHct.toInt();
  return format === 'argb'
    ? resultArgb
    : format === 'rgb'
    ? rgbFromArgb(resultArgb)
    : hexFromArgb(resultArgb);
}

export function getSecondaryColorHex(baseColor: string, format?: 'hex'): string;
export function getSecondaryColorHex(
  baseColor: string,
  format?: 'argb'
): number;
export function getSecondaryColorHex(baseColor: string, format?: 'rgb'): Rgb;
export function getSecondaryColorHex(
  baseColor: string,
  format: 'hex' | 'rgb' | 'argb' = 'hex'
) {
  const baseColorHct = Hct.fromInt(
    isValidHexColor(baseColor) ? argbFromHex(baseColor) : 0
  );
  const resultHct = Hct.from(
    baseColorHct.hue + 180,
    baseColorHct.chroma,
    baseColorHct.tone
  );
  const resultArgb = resultHct.toInt();
  return format === 'argb'
    ? resultArgb
    : format === 'rgb'
    ? rgbFromArgb(resultArgb)
    : hexFromArgb(resultArgb);
}

export function getErrorColorHex(baseColor: string, format?: 'hex'): string;
export function getErrorColorHex(baseColor: string, format?: 'argb'): number;
export function getErrorColorHex(baseColor: string, format?: 'rgb'): Rgb;
export function getErrorColorHex(
  baseColor: string,
  format: 'hex' | 'rgb' | 'argb' = 'hex'
) {
  const baseColorHct = Hct.fromInt(
    isValidHexColor(baseColor) ? argbFromHex(baseColor) : 0
  );
  const resultHct = Hct.from(
    defaultErrorHue,
    baseColorHct.chroma,
    baseColorHct.tone
  );
  const resultArgb = resultHct.toInt();
  return format === 'argb'
    ? resultArgb
    : format === 'rgb'
    ? rgbFromArgb(resultArgb)
    : hexFromArgb(resultArgb);
}

export const getRoundedTone = (tone: number) => tone - (tone % 5);

export const getMainTone = (argb: number) =>
  getRoundedTone(Hct.fromInt(argb).tone);

export const getContrastTone = (argb: number) => {
  const rgb = rgbFromArgb(argb);
  const luminance = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  return luminance < 140 ? 95 : 5;
};

*/
