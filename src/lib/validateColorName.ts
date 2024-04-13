import { camelCase } from 'change-case';

import { BASE_COLOR_RESERVED_NAMES } from '@/constants/baseColors';

export const nameIsReserved = (name?: string) =>
  typeof name === 'string' &&
  BASE_COLOR_RESERVED_NAMES.includes(camelCase(name));

export const nameIsDuplicate = (
  name: string | undefined,
  extras: { name: string; value?: string }[]
) =>
  typeof name === 'string' &&
  name.length > 0 &&
  extras.filter(
    ({ name: n }) =>
      typeof n === 'string' &&
      camelCase(n).toLowerCase() === camelCase(name).toLowerCase()
  ).length > 1;
