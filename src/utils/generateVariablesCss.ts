import {
  argbFromHex,
  hexFromArgb,
  TonalPalette,
} from '@material/material-color-utilities';
import { isValidHexColor } from './colorUtils';
import { tones as defaultTones } from '../constants';

const generateVariablesCss = (
  baseColors: { [colorName: string]: string },
  tones = defaultTones
) => {
  const tonalPalettes: { [color: keyof typeof baseColors]: TonalPalette } =
    Object.keys(baseColors).reduce(
      (obj, color) => ({
        ...obj,
        [color]: TonalPalette.fromInt(
          isValidHexColor(baseColors[color])
            ? argbFromHex(baseColors[color])
            : 0
        ),
      }),
      {}
    );

  return `
:root {
${Object.keys(baseColors)
  .map(
    baseColorName => `  /* ${baseColorName} */
${tones
  .map(
    tone =>
      `  --color-${baseColorName}-${tone}: ${hexFromArgb(
        tonalPalettes[baseColorName].tone(tone)
      )}`
  )
  .join('\n')}
`
  )
  .join('\n')}}
`;
};

export default generateVariablesCss;
