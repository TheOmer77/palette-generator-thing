/* eslint-disable @typescript-eslint/no-unused-vars */
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
    primary: _0,
    setPrimary: _1,
    neutral: _2,
    setNeutral: _3,
    danger: _4,
    setDanger: _5,
    extras: _6,
    ...rest
  } = OLD_useBaseColors();

  const primary = colorFromSearchParam(searchParams.get('primary')) as string,
    neutral = colorFromSearchParam(searchParams.get('neutral')),
    danger = colorFromSearchParam(searchParams.get('danger'));

  // Format in URL: name-value,
  const extras = searchParams.getAll('extra').map(value => ({
    name: value.split('-')[0],
    value: colorFromSearchParam(value.split('-')[1]),
  }));

  const updateSearchParams = useCallback(
      (cb: (params: URLSearchParams) => void) => {
        const params = new URLSearchParams(searchParams.toString());
        cb(params);
        window.history.replaceState(null, '', `?${params.toString()}`);
      },
      [searchParams]
    ),
    setSearchParam = useCallback(
      (key: string, value: string | null) =>
        updateSearchParams(params =>
          value === null ? params.delete(key) : params.set(key, value)
        ),
      [updateSearchParams]
    );

  const setPrimary = useCallback(
      (primary: BaseColorsState['primary']) =>
        setSearchParam('primary', colorToSearchParam(primary)),
      [setSearchParam]
    ),
    setNeutral = useCallback(
      (neutral: BaseColorsState['neutral']) =>
        setSearchParam('neutral', colorToSearchParam(neutral)),
      [setSearchParam]
    ),
    setDanger = useCallback(
      (danger: BaseColorsState['danger']) =>
        setSearchParam('danger', colorToSearchParam(danger)),
      [setSearchParam]
    );

  return {
    primary,
    neutral,
    danger,
    extras,

    setPrimary,
    setNeutral,
    setDanger,

    ...rest,
  };
};
