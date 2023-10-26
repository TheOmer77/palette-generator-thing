import type { Color } from 'culori/fn';

export type ColorFormat = {
  displayName: string;
  toString: (color: string | Color) => string;
};
