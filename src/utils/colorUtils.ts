import {
  formatHex,
  modeOkhsl,
  modeRgb,
  parseHex,
  random,
  type Okhsl,
  type Rgb,
  // This is named like a react hook, which confuses ESLint
  useMode as loadMode,
} from 'culori/fn';
import {
  MAX_SHADE_NAME,
  defaultErrorHue,
  fallbackColor,
  shades,
} from 'constants';

const okhsl = loadMode(modeOkhsl),
  rgb = loadMode(modeRgb);

const fixupRgb = (value: number) =>
  Math.round(Math.max(0, Math.min(1, value)) * 255);

const getColorVariantFunction = (modifyOkhsl: (okhsl: Okhsl) => Okhsl) => {
  function variantFunc(baseColor: string, format?: 'hex'): string;
  function variantFunc(baseColor: string, format: 'rgb'): Rgb;
  function variantFunc(baseColor: string, format?: 'rgbArray'): RgbArray;
  function variantFunc(
    baseColor: string,
    format: 'hex' | 'rgb' | 'rgbArray' = 'hex'
  ) {
    const baseRgb = rgb(baseColor) as Rgb,
      baseOkhsl = okhsl(baseRgb || fallbackColor) as Okhsl;
    const resultRgb = rgb(modifyOkhsl(baseOkhsl));
    return format === 'rgbArray'
      ? [fixupRgb(resultRgb.r), fixupRgb(resultRgb.g), fixupRgb(resultRgb.b)]
      : format === 'hex'
      ? formatHex(resultRgb)
      : resultRgb;
  }

  return variantFunc;
};

export type RgbArray = [red: number, green: number, blue: number];

export const isValidHexColor = (hexColor: string) => !!parseHex(hexColor);

export const isHexColorLight = (hexColor: string) => {
  const { r, g, b } = parseHex(hexColor) as Rgb;
  const luminance =
    0.2126 * fixupRgb(r) + 0.7152 * fixupRgb(g) + 0.0722 * fixupRgb(b);
  return luminance >= 140;
};

export const autoAddHexHash = (value: string) =>
  typeof parseHex(value) !== 'undefined' && !value.startsWith('#')
    ? `#${value}`
    : value;

export const hexInverseBw = (hexColor: string) =>
  `rgba(${
    isHexColorLight(hexColor) ? '0,0,0' : '255,255,255'
  },var(--tw-text-opacity, 1)`;

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
  const { h, s } = okhsl(
    parseHex(baseColor) ? baseColor : fallbackColor
  ) as Okhsl;

  return shades.map(shade => {
    const shadeRgb = rgb({
      mode: 'okhsl',
      h,
      s,
      l: shade / 100,
    });
    return returnAs === 'rgbValues'
      ? [fixupRgb(shadeRgb.r), fixupRgb(shadeRgb.g), fixupRgb(shadeRgb.b)]
      : formatHex(shadeRgb);
  });
}

export const getClosestShade = (
  hexColor: string,
  { minShade, maxShade }: { minShade?: number; maxShade?: number } = {}
) => {
  const l = okhsl(hexColor)?.l || 0;
  const closestShade =
    Math.round((MAX_SHADE_NAME - l * MAX_SHADE_NAME) / 100) * 100;
  return typeof minShade === 'number' && typeof maxShade === 'number'
    ? Math.min(Math.max(closestShade, minShade), maxShade)
    : typeof minShade === 'number'
    ? Math.max(closestShade, minShade)
    : typeof maxShade === 'number'
    ? Math.min(closestShade, maxShade)
    : closestShade;
};

export const getContrastShade = (hexColor: string) =>
  isHexColorLight(hexColor) ? 950 : 50;

export const getNeutralColor = getColorVariantFunction(({ mode, h, s, l }) => ({
  mode,
  h,
  s: s * 0.2,
  l,
}));

export const getSecondaryColor = getColorVariantFunction(
  ({ mode, h, s, l }) => ({
    mode,
    h: (h as number) + 180,
    s,
    l,
  })
);

export const getDangerColor = getColorVariantFunction(({ mode, s, l }) => ({
  mode,
  h: defaultErrorHue,
  s,
  l,
}));
