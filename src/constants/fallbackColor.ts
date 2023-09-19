import type { Rgb } from 'culori/fn';

export const FALLBACK_COLOR = {
  mode: 'rgb',
  r: 0,
  g: 0,
  b: 0,
} as const satisfies Rgb;
