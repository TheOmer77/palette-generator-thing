import { createContext } from 'react';

import { randomHexColor } from '@/utils';
import type { GlobalState } from '@/types';

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
