import { createContext } from 'react';
import { randomHexColor } from 'utils';
import type {
  DangerColorSuggestion,
  GeneralColorSuggestion,
  NeutralColorSuggestion,
} from 'constants/colorSuggestions';
import type { AnyStringWithAutocomplete } from 'types';

export interface GlobalState {
  baseColors: {
    /** Any hex color. */
    primary: string;
    /** Any of the neutral suggested color names, or any hex color.
     * If undefined, auto choose based on the algorithm below. */
    neutral?: AnyStringWithAutocomplete<NeutralColorSuggestion>;
    /** Any of the neutral danger color names, or any hex color.
     * If undefined, auto choose based on the algorithm below. */
    danger?: AnyStringWithAutocomplete<DangerColorSuggestion>;
    /** Extra colors, each can have a name and its value can be any of the
     * general suggested color names, or any hex color. */
    extras?: {
      name?: string;
      value: AnyStringWithAutocomplete<GeneralColorSuggestion>;
    }[];
  };
}

export const initialState: GlobalState = {
  baseColors: {
    primary: randomHexColor(),
    neutral: undefined,
    danger: undefined,
    extras: [{ name: 'Secondary', value: 'complementary' }],
  },
};
const initialDispatch = () => {
  return;
};

export const GlobalStateContext = createContext<GlobalState>(initialState),
  GlobalDispatchContext =
    createContext<(options: Partial<GlobalState>) => void>(initialDispatch);
