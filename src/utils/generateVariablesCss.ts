import { MAX_MAIN_SHADE, MIN_MAIN_SHADE, shades } from 'constants';
import {
  generatePalette,
  getClosestShade,
  getContrastShade,
} from './colorUtils';

const generateVariablesCss = (baseColors: { [colorName: string]: string }) =>
  `:root {
  ${Object.keys(baseColors)
    .map(
      (key: keyof typeof baseColors) => `/* ${key} */
${generatePalette(baseColors[key], 'rgbArray')
  .map(
    (rgbArray, index) =>
      `  --color-${key}-${shades[index]}: ${rgbArray.join(' ')};`
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

export default generateVariablesCss;
