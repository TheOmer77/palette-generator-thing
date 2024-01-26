import { generatePalette, getTokenShades } from './colorUtils';
import { colorFormats, shades } from '@/constants';

export const generateCssCode = (
  baseColors: Record<string, string>,
  colorFormat: keyof typeof colorFormats = 'hex'
) =>
  `:root {
${Object.entries(baseColors)
  .map(([baseColorKey, baseColor]) => {
    const palette = generatePalette(baseColor),
      tokenShades = getTokenShades(baseColor);

    return `  /* ${baseColorKey} */
${palette
  .map(
    (color, index) =>
      `  --color-${baseColorKey}-${shades[index]}: ${colorFormats[
        colorFormat
      ].formatColor(color)};`
  )
  .join('\n')}
  
${Object.entries(tokenShades)
  .map(
    ([tokenShadeKey, tokenShade]) =>
      `  --color-${baseColorKey}-${tokenShadeKey}: var(--color-${baseColorKey}-${tokenShade});`
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
      const palette = generatePalette(baseColor),
        tokenShades = getTokenShades(baseColor);

      return `// ${baseColorKey}
${palette
  .map(
    (color, index) =>
      `$color-${baseColorKey}-${shades[index]}: ${colorFormats[
        colorFormat
      ].formatColor(color)};`
  )
  .join('\n')}
  
${Object.entries(tokenShades)
  .map(
    ([tokenShadeKey, tokenShade]) =>
      `$color-${baseColorKey}-${tokenShadeKey}: $color-${baseColorKey}-${tokenShade};`
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
      const palette = generatePalette(baseColor),
        tokenShades = getTokenShades(baseColor);

      return {
        ...obj,
        [baseColorKey]: {
          ...palette.reduce(
            (paletteObj, color, index) => ({
              ...paletteObj,
              [shades[index]]: colorFormats[colorFormat].formatColor(color),
            }),
            {}
          ),
          // JSON can't have vars referencing other vars, so duplicating them
          ...Object.entries(tokenShades).reduce(
            (tokensObj, [tokenShadeKey, tokenShade]) => ({
              ...tokensObj,
              [tokenShadeKey]: colorFormats[colorFormat].formatColor(
                palette[shades.findIndex(shade => shade === tokenShade)]
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
