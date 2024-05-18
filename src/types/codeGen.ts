import type { Color } from 'culori/fn';

export type ColorFormat = {
  displayName: string;
  formatColor: (color: string | Color) => string;
};
