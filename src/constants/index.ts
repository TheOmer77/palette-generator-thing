export const shades = [
  50,
  ...[...Array(9).keys()].map(key => (key + 1) * 100),
  950,
];
export const tones = shades.map(shade => shade / 10);
export const defaultErrorHue = 25;
export * as prismThemes from './prism';
export { default as screens } from './breakpoints';
