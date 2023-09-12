import { createContext } from 'react';
import { randomHexColor } from 'utils';

export interface GlobalState {
  baseColors: { primary: string; neutral?: string; danger?: string };
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
