import { useCallback, useMemo } from 'react';
import {
  argbFromHex,
  argbFromRgb,
  hexFromArgb,
  TonalPalette,
  redFromArgb,
  greenFromArgb,
  blueFromArgb,
} from '@material/material-color-utilities';
import { isValidHexColor, Rgb } from '../utils/colorUtils';

const useTonalPalette = (
  color: string | [red: number, green: number, blue: number]
) => {
  const tonalPalette = useMemo(
    () =>
      TonalPalette.fromInt(
        typeof color === 'string' && isValidHexColor(color)
          ? argbFromHex(color)
          : Array.isArray(color) &&
            color.length === 3 &&
            !color.some(value => typeof value !== 'number')
          ? argbFromRgb(...color)
          : 0
      ),
    [color]
  );

  const getTone = useCallback(
    (
      tone: number,
      { format = 'hex' }: { format?: 'hex' | 'rgb' | 'argb' } = {}
    ) => {
      const result = tonalPalette.tone(tone);
      return format === 'hex'
        ? hexFromArgb(result)
        : format === 'rgb'
        ? ([
            redFromArgb(result),
            greenFromArgb(result),
            blueFromArgb(result),
          ] as Rgb)
        : result;
    },
    [tonalPalette]
  );

  return [getTone, tonalPalette] as [typeof getTone, TonalPalette];
};

export default useTonalPalette;
