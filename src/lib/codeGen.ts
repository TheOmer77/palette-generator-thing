import { generatePalette, getTokenShades } from './colorUtils';
import { colorFormats, shades } from '@/constants';

export const generateCssCode = (
  baseColors: Record<string, string>,
  colorFormat: keyof typeof colorFormats
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
  colorFormat: keyof typeof colorFormats
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
    .join('\n\n')}
}`;

export const generateJsonCode = (
  baseColors: Record<string, string>,
  colorFormat: keyof typeof colorFormats
) =>
  `:root {
${Object.entries(baseColors)
  .map(([baseColorKey, baseColor]) => {
    const palette = generatePalette(baseColor),
      tokenShades = getTokenShades(baseColor);

    return `  "${baseColorKey}"
${palette
  .map(
    (color, index) =>
      `    "${shades[index]}": "${colorFormats[colorFormat].formatColor(color)}",`
  )
  .join('\n')}
${Object.entries(tokenShades)
  .map(
    ([tokenShadeKey, tokenShade]) =>
      // JSON can't have vars mapped to other vars, so duplicating them
      `    "${tokenShadeKey}": "${colorFormats[colorFormat].formatColor(
        palette[shades.findIndex(shade => shade === tokenShade)]
      )}"`
  )
  .join(',\n')}
  }`;
  })
  .join(',\n')}
}`;
