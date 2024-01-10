import { getColorVariantFn } from '@/utils';
import {
  dangerColorSuggestions,
  generalColorSuggestions,
  neutralColorSuggestions,
} from '@/constants';

export type ColorSuggestions = Record<
  string,
  ReturnType<typeof getColorVariantFn>
>;

export type GeneralColorSuggestion = keyof typeof generalColorSuggestions;
export type NeutralColorSuggestion = keyof typeof neutralColorSuggestions;
export type DangerColorSuggestion = keyof typeof dangerColorSuggestions;
