import { generatePalette, getTokenColors } from './colorUtils';
import { colorFormats } from '@/constants/codeGen';
import { DEFAULT_NEUTRAL_CURVE, SHADES } from '@/constants/shades';

const getLightnessOptions = (baseColorKey: string) =>
  baseColorKey === 'neutral' ? { lightnessCurve: DEFAULT_NEUTRAL_CURVE } : {};

export const generateCssCode = (
  baseColors: Record<string, string>,
  colorFormat: keyof typeof colorFormats = 'hex'
) =>
  `:root {
${Object.entries(baseColors)
  .map(([baseColorKey, baseColor]) => {
    const palette = generatePalette(
        baseColor,
        getLightnessOptions(baseColorKey)
      ),
      tokenColors = getTokenColors(baseColor);

    return `  /* ${baseColorKey} */
${palette
  .map(
    (color, index) =>
      `  --color-${baseColorKey}-${SHADES[index]}: ${colorFormats[
        colorFormat
      ].formatColor(color)};`
  )
  .join('\n')}
  
${Object.entries(tokenColors)
  .map(
    ([tokenKey, tokenColor]) =>
      `  --color-${baseColorKey}-${tokenKey}: ${
        typeof tokenColor === 'number'
          ? `var(--color-${baseColorKey}-${tokenColor})`
          : colorFormats[colorFormat].formatColor(tokenColor)
      };`
  )
  .join('\n')}`;
  })
  .join('\n\n')}
}`;

export const generateScssCode = (
  baseColors: Record<string, string>,
  colorFormat: keyof typeof colorFormats = 'hex'
) =>
  `${Object.entries(baseColors)
    .map(([baseColorKey, baseColor]) => {
      const palette = generatePalette(
          baseColor,
          getLightnessOptions(baseColorKey)
        ),
        tokenColor = getTokenColors(baseColor);

      return `// ${baseColorKey}
${palette
  .map(
    (color, index) =>
      `$color-${baseColorKey}-${SHADES[index]}: ${colorFormats[
        colorFormat
      ].formatColor(color)};`
  )
  .join('\n')}
  
${Object.entries(tokenColor)
  .map(
    ([tokenKey, tokenColor]) =>
      `$color-${baseColorKey}-${tokenKey}: ${
        typeof tokenColor === 'number'
          ? `$color-${baseColorKey}-${tokenColor};`
          : colorFormats[colorFormat].formatColor(tokenColor)
      }`
  )
  .join('\n')}`;
    })
    .join('\n\n')}`;

export const generateJsonCode = (
  baseColors: Record<string, string>,
  colorFormat: keyof typeof colorFormats = 'hex'
) =>
  JSON.stringify(
    Object.entries(baseColors).reduce((obj, [baseColorKey, baseColor]) => {
      const palette = generatePalette(
          baseColor,
          getLightnessOptions(baseColorKey)
        ),
        tokenColors = getTokenColors(baseColor);

      return {
        ...obj,
        [baseColorKey]: {
          ...palette.reduce(
            (paletteObj, color, index) => ({
              ...paletteObj,
              [SHADES[index]]: colorFormats[colorFormat].formatColor(color),
            }),
            {}
          ),
          // JSON can't have vars referencing other vars, so duplicating them
          ...Object.entries(tokenColors).reduce(
            (tokensObj, [tokenKey, tokenColor]) => ({
              ...tokensObj,
              [tokenKey]: colorFormats[colorFormat].formatColor(
                typeof tokenColor === 'number'
                  ? palette[SHADES.findIndex(shade => shade === tokenColor)]
                  : tokenColor
              ),
            }),
            {}
          ),
        },
      };
    }, {}),
    undefined,
    2
  );
