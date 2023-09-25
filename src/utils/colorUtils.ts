import {
  formatHex,
  modeHsl,
  modeOkhsl,
  modeRgb,
  parseHex,
  random,
  type Hsl,
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
  hsl = loadMode(modeHsl),
  rgb = loadMode(modeRgb);

const fixupRgb = (value: number) =>
  Math.round(Math.max(0, Math.min(1, value)) * 255);

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

export function generatePalette(baseColor: string) {
  const { h, s } = okhsl(
    parseHex(baseColor) ? baseColor : FALLBACK_COLOR
  ) as Okhsl;

  return shadesLightnessValues.map(shade =>
    formatHex(rgb({ mode: 'okhsl', h, s, l: shade / 100 }))
  );
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

export const getColorVariantFn =
  (modifyOkhsl: (okhsl: Okhsl) => Okhsl) => (baseColor: string) => {
    const baseRgb = rgb(baseColor) as Rgb,
      baseOkhsl = okhsl(baseRgb || FALLBACK_COLOR) as Okhsl;
    const resultRgb = rgb(modifyOkhsl(baseOkhsl));
    return formatHex(resultRgb);
  };

/** Get function to get a modified color with a given saturation. */
export const getSaturationColorFn = (newSaturation: number) =>
  getColorVariantFn(({ h, l }) => ({ mode: 'okhsl', h, s: newSaturation, l }));

/**
 * Get function to get a modified color with a given hue.
 *
 * If `addToExistingHue = true`, the new hue will be added to the original hue,
 * otherwise it will replace it.
 */
export const getHueColorFn = (
  newHue: number,
  {
    addToExistingHue = false,
    limitSaturation = false,
    lightnessMode = 'hsl',
  }: {
    addToExistingHue?: boolean;
    limitSaturation?: boolean;
    lightnessMode?: 'okhsl' | 'hsl';
  } = {}
) =>
  getColorVariantFn(baseColor => {
    const { mode, h, s, l } = baseColor;
    if (lightnessMode === 'okhsl')
      return {
        mode,
        h: addToExistingHue && h ? (h + newHue) % 360 : newHue,
        s: limitSaturation ? Math.max(s, MIN_LIMITED_SATURATION) : s,
        l: limitSaturation
          ? Math.min(Math.max(MIN_LIMITED_LIGHTNESS, l), MAX_LIMITED_LIGHTNESS)
          : l,
      };

    const resultH =
        addToExistingHue && typeof h === 'number' ? (h + newHue) % 360 : newHue,
      hslResultH = hsl({ mode: 'okhsl', h: resultH, s, l }).h;
    const hslBaseColor = hsl(baseColor) as Hsl;
    const resultL = Math.min(
      Math.max(okhsl({ ...hslBaseColor, h: hslResultH }).l, Math.min(0.2, l)),
      Math.max(0.8, l)
    );

    return { mode, h: resultH, s, l: resultL };
  });

export const getNeutralColor = getColorVariantFn(({ mode, h, s, l }) => ({
  mode,
  h,
  s: s * 0.2,
  l,
}));

export const getDangerColor = getColorVariantFn(baseColor => {
  const { mode, h, s, l } = baseColor;

  const colorIsreddish =
    typeof h === 'number' && h >= MIN_REDDISH_HUE && h <= MAX_REDDISH_HUE;
  const potentialSuggestionHue = calculateSteps(30, 330, 11)
    .map(hue => (typeof h === 'number' ? (h + hue) % 360 : hue))
    .find(
      hue =>
        hue >= (colorIsreddish ? REDDISH_MIN_DANGER_HUE : MIN_DANGER_HUE) &&
        hue <= (colorIsreddish ? REDDISH_MAX_DANGER_HUE : MAX_DANGER_HUE)
    );

  const resultH =
      potentialSuggestionHue ||
      (colorIsreddish ? REDDISH_DEFAULT_DANGER_HUE : DEFAULT_DANGER_HUE),
    hslResultH = hsl({ mode: 'okhsl', h: resultH, s, l }).h;
  const hslBaseColor = hsl(baseColor) as Hsl;
  const resultL = Math.min(
    Math.max(okhsl({ ...hslBaseColor, h: hslResultH }).l, Math.min(0.2, l)),
    Math.max(0.8, l)
  );

  return {
    mode,
    h: resultH,
    s: Math.max(s, MIN_LIMITED_SATURATION),
    l: Math.min(
      Math.max(MIN_LIMITED_LIGHTNESS, resultL),
      MAX_LIMITED_LIGHTNESS
    ),
  };
});
