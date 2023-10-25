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

export const generateCssCode = (
  baseColors: {
    [colorName: string]: string;
  },
  colorFormat: keyof typeof colorFormats = 'hex'
) =>
  `:root {
  ${Object.keys(baseColors)
    .map((key: keyof typeof baseColors) => {
      const mainShade = getClosestShade(baseColors[key], {
          minShade: MIN_MAIN_SHADE,
          maxShade: MAX_MAIN_SHADE,
        }),
        lightShade = mainShade - 100,
        darkShade = mainShade + 100,
        contrastShade = getContrastShade(baseColors[key]);
      return `/* ${key} */
${generatePalette(baseColors[key])
  .map(
    (color, index) =>
      `  --color-${key}-${shades[index]}: ${colorFormats[
        colorFormat
      ]?.toString?.(color)};`
  )
  .join('\n')}
  
  --color-${key}-main: var(--color-${key}-${mainShade});
  --color-${key}-light: var(--color-${key}-${lightShade});
  --color-${key}-dark: var(--color-${key}-${darkShade});
  --color-${key}-contrast: var(--color-${key}-${contrastShade});`;
    })
    .join('\n\n  ')}
}`;
