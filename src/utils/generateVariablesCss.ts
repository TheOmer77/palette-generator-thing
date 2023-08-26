import {
  argbFromHex,
  Hct,
  hexFromArgb,
  TonalPalette,
} from '@material/material-color-utilities';
import {
  rgbFromArgb,
  getContrastTone,
  getRoundedTone,
  isValidHexColor,
} from './colorUtils';
import { tones } from '../constants';

const getColorValue = (
  argb: number,
  format: 'hex' | 'rgb' | 'rgbValues' = 'hex'
) =>
  format === 'rgb'
    ? `rgb(${rgbFromArgb(argb).join(' ')})`
    : format === 'rgbValues'
    ? rgbFromArgb(argb).join(' ')
    : hexFromArgb(argb);

const generateVariablesCss = (
  baseColors: { [colorName: string]: string },
  { format = 'hex' }: { format?: 'hex' | 'rgb' | 'rgbValues' } = {}
) => {
  const baseColorArgbs: { [color: keyof typeof baseColors]: number } =
    Object.keys(baseColors).reduce(
      (obj, color) => ({
        ...obj,
        [color]: isValidHexColor(baseColors[color])
          ? argbFromHex(baseColors[color])
          : 0,
      }),
      {}
    );

  const tonalPalettes: { [color: keyof typeof baseColors]: TonalPalette } =
    Object.keys(baseColors).reduce(
      (obj, color) => ({
        ...obj,
        [color]: TonalPalette.fromInt(baseColorArgbs[color]),
      }),
      {}
    );
  const baseColorMainTones: { [color: keyof typeof baseColors]: number } =
    Object.keys(baseColors).reduce(
      (obj, color) => ({
        ...obj,
        [color]: getRoundedTone(Hct.fromInt(baseColorArgbs[color]).tone),
      }),
      {}
    );
  const baseColorContrastTones: { [color: keyof typeof baseColors]: number } =
    Object.keys(baseColors).reduce(
      (obj, color) => ({
        ...obj,
        [color]: getContrastTone(
          tonalPalettes[color].tone(baseColorMainTones[color])
        ),
      }),
      {}
    );

  return `:root {
${Object.keys(baseColors)
  .map(
    baseColorName => `  /* ${baseColorName} */
${tones
  .map(
    tone =>
      `  --color-${baseColorName}-${tone}: ${getColorValue(
        tonalPalettes[baseColorName].tone(tone),
        format
      )};`
  )
  .join('\n')}

  --color-${baseColorName}-main: var(--color-${baseColorName}-${
    baseColorMainTones[baseColorName]
  });
  --color-${baseColorName}-light: var(--color-${baseColorName}-${
    baseColorMainTones[baseColorName] + 15
  });
  --color-${baseColorName}-dark: var(--color-${baseColorName}-${
    baseColorMainTones[baseColorName] - 15
  });
  --color-${baseColorName}-contrast: var(--color-${baseColorName}-${
    baseColorContrastTones[baseColorName]
  });
`
  )
  .join('\n')}}
`;
};

export default generateVariablesCss;
