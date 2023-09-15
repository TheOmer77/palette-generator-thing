import type { Rgb } from 'culori/fn';

export const FALLBACK_COLOR = {
  mode: 'rgb',
  r: 0,
  g: 0,
  b: 0,
} as const satisfies Rgb;
export const DEFAULT_DANGER_HUE = 25,
  REDDISH_DANGER_HUE = 45;
export const MIN_REDDISH_HUE = 25,
  MAX_REDDISH_HUE = 32;
export const MIN_LIMITED_SATURATION = 0.75,
  MIN_LIMITED_LIGHTNESS = 0.05,
  MAX_LIMITED_LIGHTNESS = 0.95;

export { default as screens } from './breakpoints';
export * as prismThemes from './prism';
export * from './shades';
