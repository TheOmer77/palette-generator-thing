import {
  dangerColorSuggestions,
  generalColorSuggestions,
  neutralColorSuggestions,
} from '@/constants/colorSuggestions';

export type GeneralColorSuggestion = keyof typeof generalColorSuggestions;
export type NeutralColorSuggestion = keyof typeof neutralColorSuggestions;
export type DangerColorSuggestion = keyof typeof dangerColorSuggestions;
