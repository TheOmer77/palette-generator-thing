import { createContext } from 'react';
import { initialBaseColor } from 'constants';

export interface GlobalState {
  baseColor: string;
}

export const initialState: GlobalState = {
  baseColor: initialBaseColor,
};
const initialDispatch = () => {
  return;
};

export const GlobalStateContext = createContext<GlobalState>(initialState),
  GlobalDispatchContext =
    createContext<(options: Partial<GlobalState>) => void>(initialDispatch);
