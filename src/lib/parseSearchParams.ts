import { parseHex } from 'culori/fn';

export const colorToSearchParam = (hexColor: string | null) =>
  typeof hexColor === 'string'
    ? hexColor.startsWith('#')
      ? hexColor.slice(1)
      : hexColor
    : null;

export const colorFromSearchParam = (paramColor: string | null) =>
  typeof paramColor === 'string'
    ? typeof parseHex(paramColor) !== 'undefined'
      ? `#${paramColor}`
      : paramColor
    : null;
