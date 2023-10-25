import { createContext } from 'react';
import { randomHexColor } from 'utils';
import type {
  DangerColorSuggestion,
  GeneralColorSuggestion,
  NeutralColorSuggestion,
} from 'constants/colorSuggestions';
import { codeFormats, colorFormats } from 'constants';
import type { AnyStringWithAutocomplete } from 'types';

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
    /** Color format for generated code, if format is `css` or `json`.
     * If format is `none` or `custom`, has no effect. */
    colorFormat: keyof typeof colorFormats;
  };
}

export const initialState: GlobalState = {
  baseColors: {
    primary: randomHexColor(),
    neutral: undefined,
    danger: undefined,
    extras: [],
  },
  codeGen: {
    format: 'none',
    colorFormat: 'hex',
  },
};
const initialDispatch = () => {
  return;
};

export const GlobalStateContext = createContext<GlobalState>(initialState),
  GlobalDispatchContext =
    createContext<(options: Partial<GlobalState>) => void>(initialDispatch);
