import {
  formatHex,
  formatRgb,
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
import { getBezierCurvePointY } from '@/lib/bezierCurve';
import { FALLBACK_COLOR } from '@/constants/fallbackColor';
import {
  DEFAULT_DANGER_HUE,
  MAX_DANGER_HUE,
  MAX_LIMITED_LIGHTNESS,
  MAX_REDDISH_HUE,
  MIN_DANGER_HUE,
  MIN_LIMITED_LIGHTNESS,
  MIN_LIMITED_SATURATION,
  MIN_REDDISH_HUE,
  REDDISH_DEFAULT_DANGER_HUE,
  REDDISH_MAX_DANGER_HUE,
  REDDISH_MIN_DANGER_HUE,
} from '@/constants/hslDefaults';
import {
  DEFAULT_CURVE,
  DEFAULT_MAX_LIGHTNESS,
  DEFAULT_MIN_LIGHTNESS,
  MAX_ACTIVE_SHADE,
  MAX_MAIN_SHADE,
  MAX_SHADE,
  MIN_ACTIVE_SHADE,
  MIN_MAIN_SHADE,
  shades,
} from '@/constants/shades';
import type { GeneratePaletteOptions } from '@/types/generatePaletteOptions';

const okhsl = loadMode(modeOkhsl),
  hsl = loadMode(modeHsl),
  rgb = loadMode(modeRgb);

const getShadesLightnessValues = ({
  lightnessCurve = DEFAULT_CURVE,
  maxLightness = DEFAULT_MAX_LIGHTNESS,
  minLightness = DEFAULT_MIN_LIGHTNESS,
}: GeneratePaletteOptions) =>
  shades.map(
    shade =>
      minLightness +
      getBezierCurvePointY(lightnessCurve, shade / 1000) *
        (maxLightness - minLightness)
  );

export const isValidHexColor = (value: string, withAlpha = false) => {
  const match = /^#?([0-9A-F]{3,8})$/i.exec(value);
  const length = match ? match[1].length : 0;

  return (
    length === 3 || // '#rgb' format
    length === 6 || // '#rrggbb' format
    (withAlpha && length === 4) || // '#rgba' format
    (withAlpha && length === 8) // '#rrggbbaa' format
  );
};

export const isHexColorLight = (hexColor: string) => {
  if (!parseHex(hexColor)) return false;
  const [r, g, b] = (formatRgb(hexColor) as string)
    .slice(4, -1)
    .split(', ')
    .map(Number);
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance >= 140;
};

export const autoAddHexHash = (value: string) =>
  !value.startsWith('#') ? `#${value}` : value;

export const randomHexColor = () => formatHex(random());

export const getPaletteColor = (
  baseColor: string,
  shade: number,
  options: GeneratePaletteOptions = {}
) => {
  const { h, s } = okhsl(
    parseHex(baseColor || '') ? baseColor : FALLBACK_COLOR
  ) as Okhsl;
  const l =
    getShadesLightnessValues(options)[shades.findIndex(sh => sh === shade)] /
    100;

  return formatHex(rgb({ mode: 'okhsl', h, s, l }));
};

export const generatePalette = (
  baseColor: string,
  options: GeneratePaletteOptions = {}
) => {
  const { h, s } = okhsl(
    parseHex(baseColor || '') ? baseColor : FALLBACK_COLOR
  ) as Okhsl;

  return getShadesLightnessValues(options).map(shade =>
    formatHex(rgb({ mode: 'okhsl', h, s, l: shade / 100 }))
  );
};

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

export const getTokenShades = (hexColor: string) => {
  const main = getClosestShade(hexColor, {
    minShade: MIN_MAIN_SHADE,
    maxShade: MAX_MAIN_SHADE,
  });

  const isMainShadeLight = isHexColorLight(getPaletteColor(hexColor, main));
  const active = Math.min(
    Math.max(main + (isMainShadeLight ? 100 : -100), MIN_ACTIVE_SHADE),
    MAX_ACTIVE_SHADE
  );
  // TODO: Use white (shade 0?) instead of shade 50
  const foreground = isMainShadeLight ? 950 : 50;

  return { main, active, foreground };
};

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

/** Get function to get a modified color with a given hue. */
export const getHueColorFn = (
  newHue: number,
  {
    addToExistingHue = false,
    limitSaturation = false,
    lightnessMode = 'hsl',
  }: {
    /**
     * If true, the new hue will be added to the original hue, otherwise it
     * will replace it.
     */
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
      Math.max(
        okhsl({ ...hslBaseColor, h: hslResultH }).l,
        Math.min(MIN_LIMITED_LIGHTNESS, l)
      ),
      Math.max(MAX_LIMITED_LIGHTNESS, l)
    );

    return {
      mode,
      h: resultH,
      s: limitSaturation ? Math.max(s, MIN_LIMITED_SATURATION) : s,
      l: resultL,
    };
  });

export const getAutoNeutralColor = getColorVariantFn(({ mode, h, s, l }) => ({
  mode,
  h,
  s: s * 0.2,
  l,
}));

export const getAutoDangerColor = getColorVariantFn(baseColor => {
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
    Math.max(
      okhsl({ ...hslBaseColor, h: hslResultH }).l,
      Math.min(MIN_LIMITED_LIGHTNESS, l)
    ),
    Math.max(MAX_LIMITED_LIGHTNESS, l)
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
