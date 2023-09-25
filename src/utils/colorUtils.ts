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

import { calculateSteps } from './calculateSteps';
import {
  DEFAULT_DANGER_HUE,
  FALLBACK_COLOR,
  MAX_DANGER_HUE,
  MAX_LIMITED_LIGHTNESS,
  MAX_REDDISH_HUE,
  MAX_SHADE,
  MIN_DANGER_HUE,
  MIN_LIMITED_LIGHTNESS,
  MIN_LIMITED_SATURATION,
  MIN_REDDISH_HUE,
  REDDISH_DEFAULT_DANGER_HUE,
  REDDISH_MAX_DANGER_HUE,
  REDDISH_MIN_DANGER_HUE,
  shadesLightnessValues,
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
      baseOkhsl = okhsl(baseRgb || FALLBACK_COLOR) as Okhsl;
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
  const rgbColor = rgb(hexColor);
  if (!rgbColor) return false;
  const luminance =
    0.2126 * fixupRgb(rgbColor.r) +
    0.7152 * fixupRgb(rgbColor.g) +
    0.0722 * fixupRgb(rgbColor.b);
  return luminance >= 140;
};

export const toRgbArray = (color: Rgb | string): RgbArray => {
  const { r, g, b } = typeof color === 'string' ? (rgb(color) as Rgb) : color;
  return [fixupRgb(r), fixupRgb(g), fixupRgb(b)];
};

export const autoAddHexHash = (value: string) =>
  typeof parseHex(value) !== 'undefined' && !value.startsWith('#')
    ? `#${value}`
    : value;

export const randomHexColor = () => formatHex(random());

export function generatePalette(baseColor: string, format?: 'hex'): string[];
export function generatePalette(
  baseColor: string,
  format: 'rgbArray'
): RgbArray[];
export function generatePalette(
  baseColor: string,
  format: 'hex' | 'rgbArray' = 'hex'
) {
  const { h, s } = okhsl(
    parseHex(baseColor) ? baseColor : FALLBACK_COLOR
  ) as Okhsl;

  return shadesLightnessValues.map(shade => {
    const shadeRgb = rgb({
      mode: 'okhsl',
      h,
      s,
      l: shade / 100,
    });
    return format === 'rgbArray'
      ? [fixupRgb(shadeRgb.r), fixupRgb(shadeRgb.g), fixupRgb(shadeRgb.b)]
      : formatHex(shadeRgb);
  });
}

export const getClosestShade = (
  hexColor: string,
  { minShade, maxShade }: { minShade?: number; maxShade?: number } = {}
) => {
  const l = okhsl(hexColor)?.l || 0;
  const closestShade = Math.round((MAX_SHADE - l * MAX_SHADE) / 100) * 100;
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

export const getDangerColor = getColorVariantFunction(({ mode, h, s, l }) => {
  const colorIsreddish =
    typeof h === 'number' && h >= MIN_REDDISH_HUE && h <= MAX_REDDISH_HUE;
  const potentialSuggestionHue = calculateSteps(30, 330, 11)
    .map(hue => (typeof h === 'number' ? (h + hue) % 360 : hue))
    .find(
      hue =>
        hue >= (colorIsreddish ? REDDISH_MIN_DANGER_HUE : MIN_DANGER_HUE) &&
        hue <= (colorIsreddish ? REDDISH_MAX_DANGER_HUE : MAX_DANGER_HUE)
    );

  return {
    mode,
    h:
      potentialSuggestionHue ||
      (colorIsreddish ? REDDISH_DEFAULT_DANGER_HUE : DEFAULT_DANGER_HUE),
    s: Math.max(s, MIN_LIMITED_SATURATION),
    l: Math.min(Math.max(MIN_LIMITED_LIGHTNESS, l), MAX_LIMITED_LIGHTNESS),
  };
});
