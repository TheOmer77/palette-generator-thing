import { shades } from 'constants';
import { generatePalette } from './colorUtils';

const generateVariablesCss = (baseColors: { [colorName: string]: string }) =>
  `:root {
  ${Object.keys(baseColors)
    .map(
      (key: keyof typeof baseColors) => `/* ${key} */
${generatePalette(baseColors[key], 'rgbValues')
  .map(
    (rgbValues, index) =>
      `  --color-${key}-${shades[index]}: ${rgbValues.join(' ')};`
  )
  .join('\n')}`
    )
    .join('\n\n')}
}`;

// TODO: Find main, light, dark, contrast values

export default generateVariablesCss;
