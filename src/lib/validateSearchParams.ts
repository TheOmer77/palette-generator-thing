import { isValidHexColor, randomHexColor } from './colorUtils';
import {
  dangerColorSuggestionNames,
  generalColorSuggestionNames,
  neutralColorSuggestionNames,
} from '@/constants/colorSuggestions';
import { BASE_COLOR_NAME_LIMIT } from '@/constants/baseColors';
import type { BaseColorsSearchParams } from '@/types/searchParams';

const validateColorParam = (
  value: string | undefined,
  {
    fallback,
    extraAllowedValues,
  }: { fallback?: string; extraAllowedValues?: string[] } = {}
) =>
  typeof value === 'string' &&
  (isValidHexColor(value) || extraAllowedValues?.includes(value))
    ? value
    : fallback;
const validateExtraColorParam = (
  value: string | undefined,
  { extraAllowedValues }: { extraAllowedValues?: string[] } = {}
) => {
  if (
    typeof value !== 'string' ||
    !value.includes('-') ||
    value.split('-').length !== 2
  )
    return;

  const [name, colorValue] = value.split('-');
  if (
    name.length > BASE_COLOR_NAME_LIMIT ||
    !validateColorParam(colorValue, { extraAllowedValues })
  )
    return;

  return value;
};

/**
 * Check validity of base colors URL search params. If some are invalid,
 * redirect to the same pathname but with any invalid params removed.
 *
 * @param searchParams Search params to validate.
 * @returns Whether or not the given searchParams are valid, and the valid
 * search string.
 */
export const validateSearchParams = (
  searchParams: BaseColorsSearchParams | URLSearchParams
) => {
  const searchParamsObj =
    searchParams instanceof URLSearchParams
      ? [...searchParams.entries()].reduce(
          (obj, [key, value]) => ({ ...obj, [key]: value }),
          {} as BaseColorsSearchParams
        )
      : searchParams;

  const paramsTuples = Object.entries(searchParamsObj).reduce(
    (acc: [string, string][], [key, value]) => {
      if (typeof value === 'undefined') return acc;
      return [
        ...acc,
        ...((Array.isArray(value)
          ? value.map(v => [key, v])
          : [[key, value]]) as [string, string][]),
      ];
    },
    []
  );

  const validParamsTuples = [
    [
      'primary',
      validateColorParam(searchParamsObj.primary, {
        fallback: randomHexColor().slice(1),
      }),
    ],
    [
      'neutral',
      validateColorParam(searchParamsObj.neutral, {
        extraAllowedValues: neutralColorSuggestionNames,
      }),
    ],
    [
      'danger',
      validateColorParam(searchParamsObj.danger, {
        extraAllowedValues: dangerColorSuggestionNames,
      }),
    ],
    ...(Array.isArray(searchParamsObj.extra)
      ? searchParamsObj.extra
      : [searchParamsObj.extra]
    ).map(value => [
      'extra',
      validateExtraColorParam(value, {
        extraAllowedValues: generalColorSuggestionNames,
      }),
    ]),
  ].filter(([, value]) => typeof value === 'string') as [string, string][];

  const sortedParamsTuples = [...paramsTuples].sort(([keyA], [keyB]) =>
      keyA > keyB ? 1 : keyA < keyB ? -1 : 0
    ),
    sortedValidParamsTuples = [...validParamsTuples].sort(([keyA], [keyB]) =>
      keyA > keyB ? 1 : keyA < keyB ? -1 : 0
    );

  const sortedParamsStr = new URLSearchParams(sortedParamsTuples).toString(),
    validParamsStr = new URLSearchParams(validParamsTuples).toString(),
    sortedValidParamsStr = new URLSearchParams(
      sortedValidParamsTuples
    ).toString();

  return {
    isValid: sortedParamsStr === sortedValidParamsStr,
    validSearch: validParamsStr,
  };
};
