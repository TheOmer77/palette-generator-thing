/* import {
  argbFromHex,
  blueFromArgb,
  greenFromArgb,
  Hct,
  hexFromArgb,
  redFromArgb,
} from '@material/material-color-utilities'; */
import { defaultErrorHue, shades } from 'constants';
import {
  formatHex,
  modeOklch,
  modeRgb,
  parseHex,
  random,
  type Oklch,
  type Rgb,
  // This is named like a react hook, which confuses ESLint
  useMode as loadMode,
  toGamut,
} from 'culori/fn';

const oklch = loadMode(modeOklch),
  rgb = loadMode(modeRgb);

const fixupRgb = (value: number) =>
  Math.round(Math.max(0, Math.min(1, value)) * 255);

const getColorVariantFunction = (modifyOklch: (oklch: Oklch) => Oklch) => {
  function variantFunc(baseColor: string, format?: 'hex'): string;
  function variantFunc(baseColor: string, format: 'rgb'): Rgb;
  function variantFunc(baseColor: string, format?: 'rgbArray'): RgbArray;
  function variantFunc(
    baseColor: string,
    format: 'hex' | 'rgb' | 'rgbArray' = 'hex'
  ) {
    const baseRgb = rgb(baseColor) as Rgb,
      baseOklch = oklch(baseRgb || '#000') as Oklch;
    const resultRgb = toGamut('rgb')(modifyOklch(baseOklch));
    return format === 'rgbArray'
      ? [fixupRgb(resultRgb.r), fixupRgb(resultRgb.g), fixupRgb(resultRgb.b)]
      : format === 'hex'
      ? formatHex(resultRgb)
      : resultRgb;
  }

  return variantFunc;
};

export type RgbArray = [red: number, green: number, blue: number];

export const isValidHexColor = (hex: string) => !!parseHex(hex);

export const autoAddHexHash = (value: string) =>
  typeof parseHex(value) !== 'undefined' && !value.startsWith('#')
    ? `#${value}`
    : value;

export const hexInverseBw = (hex: string) => {
  const { r, g, b } = rgb(hex) as Rgb;

  const luminance =
    0.2126 * fixupRgb(r) + 0.7152 * fixupRgb(g) + 0.0722 * fixupRgb(b);
  return `rgba(${
    luminance < 140 ? '255,255,255' : '0,0,0'
  },var(--tw-text-opacity, 1)`;
};

export const randomHexColor = () => formatHex(random());

export function generatePalette(baseColor: string, returnAs?: 'hex'): string[];
export function generatePalette(
  baseColor: string,
  returnAs: 'rgbValues'
): RgbArray[];
export function generatePalette(
  baseColor: string,
  returnAs: 'hex' | 'rgbValues' = 'hex'
) {
  const { c, h } = oklch(parseHex(baseColor) ? baseColor : '#000') as Oklch;

  return shades.map(shade => {
    const { r, g, b } = toGamut('rgb')({
      mode: 'oklch',
      l: shade / 100,
      c,
      h,
    });
    return returnAs === 'rgbValues'
      ? [fixupRgb(r), fixupRgb(g), fixupRgb(b)]
      : formatHex({ mode: 'rgb', r, g, b });
  });
}

export const getNeutralColor = getColorVariantFunction(({ mode, l, h }) => ({
  mode,
  l,
  c: 0.01,
  h,
}));

export const getSecondaryColor = getColorVariantFunction(
  ({ mode, l, c, h }) => ({
    mode,
    l,
    c,
    h: (h as number) + 180,
  })
);

export const getDangerColor = getColorVariantFunction(({ mode, l, c }) => ({
  mode,
  l,
  c,
  h: defaultErrorHue,
}));

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
