import { createContext } from 'react';
import { randomHexColor } from 'utils';

export interface GlobalState {
  baseColor: string;
}

export const initialState: GlobalState = { baseColor: randomHexColor() };
const initialDispatch = () => {
  return;
};

export const GlobalStateContext = createContext<GlobalState>(initialState),
  GlobalDispatchContext =
    createContext<(options: Partial<GlobalState>) => void>(initialDispatch);
