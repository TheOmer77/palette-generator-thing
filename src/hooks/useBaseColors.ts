/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { parseHex } from 'culori/fn';

import {
  useBaseColors as OLD_useBaseColors,
  type BaseColorsState,
} from '@/store/useBaseColors';
import { generalColorSuggestionNames } from '@/constants';

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

  const primary = colorFromSearchParam(searchParams.get('primary')) as string,
    neutral = colorFromSearchParam(searchParams.get('neutral')),
    danger = colorFromSearchParam(searchParams.get('danger'));

  // Format in URL: name-value,
  const extras = searchParams.getAll('extra').map(value => ({
    name: value.split('-')[0],
    value: colorFromSearchParam(value.split('-')[1]) || '',
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

  const addExtraColor = useCallback(
      () =>
        updateSearchParams(params =>
          params.append(
            'extra',
            `-${colorToSearchParam(
              generalColorSuggestionNames[
                extras.length % generalColorSuggestionNames.length
              ]
            )}`
          )
        ),
      [extras.length, updateSearchParams]
    ),
    removeExtraColor = useCallback(
      (index: number) =>
        updateSearchParams(params => {
          const prevExtras = params.getAll('extra');
          params.delete('extra');
          prevExtras
            .filter((_, i) => i !== index)
            .forEach(value => params.append('extra', value));
        }),
      [updateSearchParams]
    ),
    renameExtraColor = useCallback(
      (index: number, newName: string) => {
        if (newName.includes('-') || newName.length > 20) return;
        updateSearchParams(params => {
          const prevExtras = params.getAll('extra');
          params.delete('extra');
          prevExtras
            .map((value, i) =>
              i === index ? `${newName}-${value.split('-')[1]}` : value
            )
            .forEach(value => params.append('extra', value));
        });
      },
      [updateSearchParams]
    ),
    setExtraColor = useCallback(
      (index: number, newValue: string) => {
        if (newValue.includes('-')) return;
        updateSearchParams(params => {
          const prevExtras = params.getAll('extra');
          params.delete('extra');
          prevExtras
            .map((value, i) =>
              i === index
                ? `${value.split('-')[0]}-${colorToSearchParam(newValue)}`
                : value
            )
            .forEach(value => params.append('extra', value));
        });
      },
      [updateSearchParams]
    );

  return {
    primary,
    neutral,
    danger,
    extras,

    setPrimary,
    setNeutral,
    setDanger,
    addExtraColor,
    removeExtraColor,
    renameExtraColor,
    setExtraColor,
  };
};
