import { createContext } from 'react';
import { randomHexColor } from 'utils';
import type { NeutralColorSuggestion } from 'constants/colorSuggestions';
import type { AnyStringWithAutocomplete } from 'types';

export interface GlobalState {
  baseColors: {
    primary: string;
    neutral?: AnyStringWithAutocomplete<NeutralColorSuggestion>;
    danger?: string;
  };
}

export const initialState: GlobalState = {
  baseColors: { primary: randomHexColor() },
};
const initialDispatch = () => {
  return;
};

export const GlobalStateContext = createContext<GlobalState>(initialState),
  GlobalDispatchContext =
    createContext<(options: Partial<GlobalState>) => void>(initialDispatch);
