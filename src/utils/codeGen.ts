import {
  MAX_MAIN_SHADE,
  MIN_MAIN_SHADE,
  colorFormats,
  shades,
} from 'constants';
import {
  generatePalette,
  getClosestShade,
  getContrastShade,
} from './colorUtils';

export const generateVariablesCss = (
  baseColors: {
    [colorName: string]: string;
  },
  colorFormat: keyof typeof colorFormats = 'hex'
) =>
  `:root {
  ${Object.keys(baseColors)
    .map(
      (key: keyof typeof baseColors) => `/* ${key} */
${generatePalette(baseColors[key])
  .map(
    (color, index) =>
      `  --color-${key}-${shades[index]}: ${colorFormats[
        colorFormat
      ]?.toString?.(color)};`
  )
  .join('\n')}
  
  --color-${key}-main: var(--color-${key}-${getClosestShade(baseColors[key], {
    minShade: MIN_MAIN_SHADE,
    maxShade: MAX_MAIN_SHADE,
  })});
  --color-${key}-light: var(--color-${key}-${
    getClosestShade(baseColors[key], {
      minShade: MIN_MAIN_SHADE,
      maxShade: MAX_MAIN_SHADE,
    }) - 100
  });
  --color-${key}-dark: var(--color-${key}-${
    getClosestShade(baseColors[key], {
      minShade: MIN_MAIN_SHADE,
      maxShade: MAX_MAIN_SHADE,
    }) + 100
  });
  --color-${key}-contrast: var(--color-${key}-${getContrastShade(
    baseColors[key]
  )});`
    )
    .join('\n\n  ')}
}`;
