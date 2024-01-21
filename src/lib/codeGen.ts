import {
  generatePalette,
  getClosestShade,
  getForegroundShade,
} from './colorUtils';
import {
  MAX_MAIN_SHADE,
  MIN_MAIN_SHADE,
  colorFormats,
  shades,
} from '@/constants';

// TODO: Active shade, which is either light or dark
// lightShade = mainShade - 100,
// darkShade = mainShade + 100,

export const generateCssCode = (
  baseColors: { [colorName: string]: string },
  colorFormat: keyof typeof colorFormats = 'hex'
) =>
  `:root {
  ${Object.keys(baseColors)
    .map((key: keyof typeof baseColors) => {
      const mainShade = getClosestShade(baseColors[key], {
          minShade: MIN_MAIN_SHADE,
          maxShade: MAX_MAIN_SHADE,
        }),
        foregroundShade = getForegroundShade(baseColors[key], mainShade);
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
  --color-${key}-foreground: var(--color-${key}-${foregroundShade});`;
    })
    .join('\n\n  ')}
}`;

export const generateScssCode = (
  baseColors: { [colorName: string]: string },
  colorFormat: keyof typeof colorFormats = 'hex'
) =>
  `${Object.keys(baseColors)
    .map((key: keyof typeof baseColors) => {
      const mainShade = getClosestShade(baseColors[key], {
          minShade: MIN_MAIN_SHADE,
          maxShade: MAX_MAIN_SHADE,
        }),
        foregroundShade = getForegroundShade(baseColors[key], mainShade);
      return `// ${key}
${generatePalette(baseColors[key])
  .map(
    (color, index) =>
      `$color-${key}-${shades[index]}: ${colorFormats[colorFormat]?.toString?.(
        color
      )};`
  )
  .join('\n')}
  
$color-${key}-main: $color-${key}-${mainShade};
$color-${key}-foreground: $color-${key}-${foregroundShade};`;
    })
    .join('\n\n')}`;

export const generateJsonCode = (
  baseColors: { [colorName: string]: string },
  colorFormat: keyof typeof colorFormats = 'hex'
) => `{
${Object.keys(baseColors)
  .map(key => {
    const mainShade = getClosestShade(baseColors[key], {
        minShade: MIN_MAIN_SHADE,
        maxShade: MAX_MAIN_SHADE,
      }),
      foregroundShade = getForegroundShade(baseColors[key], mainShade);
    const palette = generatePalette(baseColors[key]);
    return `  "${key}": {
${palette
  .map(
    (color, index) =>
      `    "${shades[index]}": "${colorFormats[colorFormat]?.toString?.(
        color
      )}"`
  )
  .join(',\n')},
    "main": "${colorFormats[colorFormat]?.toString?.(
      palette[shades.findIndex(el => el === mainShade)]
    )}",
    "foreground": "${colorFormats[colorFormat]?.toString?.(
      palette[shades.findIndex(el => el === foregroundShade)]
    )}"
  }`;
  })
  .join(',\n')}
}`;
