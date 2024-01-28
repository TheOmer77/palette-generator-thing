import { useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { parseHex } from 'culori/fn';

import {
  useBaseColors as OLD_useBaseColors,
  type BaseColorsState,
} from '@/store/useBaseColors';

const colorToSearchParam = (hexColor?: string) =>
  typeof hexColor === 'string'
    ? hexColor.startsWith('#')
      ? hexColor.slice(1)
      : hexColor
    : null;

// TODO: Add param for allowed values other than hex colors
const colorFromSearchParam = (paramColor: string | null) =>
  typeof paramColor === 'string'
    ? typeof parseHex(paramColor) !== 'undefined'
      ? `#${paramColor}`
      : paramColor
    : undefined;

export const useBaseColors = () => {
  const searchParams = useSearchParams();

  // TODO: Get rid of this, once I don't need it anymore
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    primary: _0,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setPrimary: _1,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    neutral: _2,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setNeutral: _3,
    ...rest
  } = OLD_useBaseColors();

  const setSearchParam = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === null) params.delete(key);
      else params.set(key, value);

      window.history.replaceState(null, '', `?${params.toString()}`);
    },
    [searchParams]
  );

  const primary = colorFromSearchParam(searchParams.get('primary')) as string,
    neutral = colorFromSearchParam(searchParams.get('neutral'));

  const setPrimary = useCallback(
      (primary: BaseColorsState['primary']) =>
        setSearchParam('primary', colorToSearchParam(primary)),
      [setSearchParam]
    ),
    setNeutral = useCallback(
      (neutral: BaseColorsState['neutral']) =>
        setSearchParam('neutral', colorToSearchParam(neutral)),
      [setSearchParam]
    );

  return { primary, neutral, setPrimary, setNeutral, ...rest };
};
