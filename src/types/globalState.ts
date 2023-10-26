import { codeFormats, colorFormats } from 'constants';
import type {
  DangerColorSuggestion,
  GeneralColorSuggestion,
  NeutralColorSuggestion,
} from './colorSuggestions';
import type { AnyStringWithAutocomplete } from './utils';

export interface GlobalState {
  baseColors: {
    /** Any hex color. */
    primary: string;
    /** Any of the neutral suggested color names, or any hex color.
     * If undefined, auto choose. */
    neutral?: AnyStringWithAutocomplete<NeutralColorSuggestion>;
    /** Any of the neutral danger color names, or any hex color.
     * If undefined, auto choose. */
    danger?: AnyStringWithAutocomplete<DangerColorSuggestion>;
    /** Extra colors, each can have a name and its value can be any of the
     * general suggested color names, or any hex color. */
    extras?: {
      name?: string;
      value: AnyStringWithAutocomplete<GeneralColorSuggestion>;
    }[];
  };
  codeGen: {
    /** Format for generated theme code. */
    format: keyof typeof codeFormats;
    /** Color format for generated code.
     * If format is `none` or `custom`, has no effect. */
    colorFormat: keyof typeof colorFormats;
  };
}
