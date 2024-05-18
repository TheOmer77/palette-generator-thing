import { getColorVariantFn } from '@/lib/colorUtils';

export type ColorSuggestions = Record<
  string,
  ReturnType<typeof getColorVariantFn>
>;
