import type { Rgb } from 'culori/fn';

export const fallbackColor: Rgb = { mode: 'rgb', r: 0, g: 0, b: 0 };
export const defaultErrorHue = 25;
export { default as screens } from './breakpoints';
export * as prismThemes from './prism';
export * from './shades';
