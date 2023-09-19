import type { Rgb } from 'culori/fn';

export const FALLBACK_COLOR = {
  mode: 'rgb',
  r: 0,
  g: 0,
  b: 0,
} as const satisfies Rgb;
export const DEFAULT_DANGER_HUE = 25,
  MIN_DANGER_HUE = 25,
  MAX_DANGER_HUE = 35,
  REDDISH_DEFAULT_DANGER_HUE = 45,
  REDDISH_MIN_DANGER_HUE = 35,
  REDDISH_MAX_DANGER_HUE = 45;
export const MIN_REDDISH_HUE = 25,
  MAX_REDDISH_HUE = 32;
export const MIN_LIMITED_SATURATION = 0.75,
  MIN_LIMITED_LIGHTNESS = 0.05,
  MAX_LIMITED_LIGHTNESS = 0.95;

export * from './breakpoints';
export * as prismThemes from './prism';
export * from './shades';
