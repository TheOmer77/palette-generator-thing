import { useCallback, useDebugValue } from 'react';
import { useSearchParams } from 'next/navigation';

import { generalColorSuggestionNames } from '@/constants/colorSuggestions';
import { BASE_COLOR_NAME_LIMIT } from '@/constants/baseColors';
import type { AnyStringWithAutocomplete } from '@/types/utils';
import type {
  DangerColorSuggestion,
  GeneralColorSuggestion,
  NeutralColorSuggestion,
} from '@/types/defaultSuggestions';
import {
  colorFromSearchParam,
  colorToSearchParam,
} from '@/lib/parseSearchParams';

export type BaseColorsState = {
  /** Any hex color. */
  primary: string;
  /** Any of the neutral suggested color names, or any hex color.
   * If undefined, auto choose. */
  neutral: AnyStringWithAutocomplete<NeutralColorSuggestion> | null;
  /** Any of the neutral danger color names, or any hex color.
   * If undefined, auto choose. */
  danger: AnyStringWithAutocomplete<DangerColorSuggestion> | null;
  /** Extra colors, each can have a name and its value can be any of the
   * general suggested color names, or any hex color. */
  extras: {
    name?: string;
    value: AnyStringWithAutocomplete<GeneralColorSuggestion>;
  }[];
};

export type BaseColorsActions = {
  setPrimary: (primary: BaseColorsState['primary']) => void;
  setNeutral: (neutral: BaseColorsState['neutral']) => void;
  setDanger: (danger: BaseColorsState['danger']) => void;
  addExtraColor: () => void;
  removeExtraColor: (index: number) => void;
  renameExtraColor: (
    index: number,
    newName: NonNullable<BaseColorsState['extras'][number]['name']>
  ) => void;
  setExtraColor: (
    index: number,
    newValue: BaseColorsState['extras'][number]['value']
  ) => void;
};

export const useBaseColors = () => {
  const searchParams = useSearchParams();

  const primary = colorFromSearchParam(searchParams.get('primary')) as string,
    neutral = colorFromSearchParam(
      searchParams.get('neutral')
    ) satisfies BaseColorsState['neutral'],
    danger = colorFromSearchParam(
      searchParams.get('danger')
    ) satisfies BaseColorsState['danger'];

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
      (index: number, newName: BaseColorsState['extras'][number]['name']) => {
        if (
          typeof newName !== 'string' ||
          newName.includes('-') ||
          newName.length > BASE_COLOR_NAME_LIMIT
        )
          return;
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
      (index: number, newValue: BaseColorsState['extras'][number]['value']) => {
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

  useDebugValue({ primary, neutral, danger, extras });

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
  } satisfies BaseColorsState & BaseColorsActions;
};
