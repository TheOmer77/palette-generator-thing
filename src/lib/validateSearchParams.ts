import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { isValidHexColor, randomHexColor } from './colorUtils';
import {
  dangerColorSuggestionNames,
  generalColorSuggestionNames,
  neutralColorSuggestionNames,
} from '@/constants';
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
    name.length > 20 ||
    !validateColorParam(colorValue, { extraAllowedValues })
  )
    return;

  return value;
};

/**
 * Check validity of base colors URL search params. If some are invalid,
 * redirect to the same pathname but with any invalid params removed.
 *
 * **This function should be used in server components.**
 *
 * @param searchParams Search params to validate.
 */
export const validateSearchParams = (searchParams: BaseColorsSearchParams) => {
  const url = headers().get('x-url')?.split('?')[0];
  const paramsTuples = Object.entries(searchParams).reduce(
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
      validateColorParam(searchParams.primary, {
        fallback: randomHexColor().slice(1),
      }),
    ],
    [
      'neutral',
      validateColorParam(searchParams.neutral, {
        extraAllowedValues: neutralColorSuggestionNames,
      }),
    ],
    [
      'danger',
      validateColorParam(searchParams.danger, {
        extraAllowedValues: dangerColorSuggestionNames,
      }),
    ],
    ...(Array.isArray(searchParams.extra)
      ? searchParams.extra
      : [searchParams.extra]
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

  if (sortedParamsStr !== sortedValidParamsStr)
    redirect(`${url}?${validParamsStr}`);
};
