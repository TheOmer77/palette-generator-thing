import { createContext } from 'react';

import type { GlobalState } from '@/types/globalState';

export const initialState: GlobalState = {
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
