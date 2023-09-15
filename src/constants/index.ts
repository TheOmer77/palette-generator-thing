import type { Rgb } from 'culori/fn';

export const FALLBACK_COLOR = {
  mode: 'rgb',
  r: 0,
  g: 0,
  b: 0,
} as const satisfies Rgb;
export const DEFAULT_DANGER_HUE = 25;

export { default as screens } from './breakpoints';
export * as prismThemes from './prism';
export * from './shades';
