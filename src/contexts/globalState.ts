import { createContext } from 'react';

// import { randomHexColor } from '@/utils';
import type { GlobalState } from '@/types';

export const initialState: GlobalState = {
  baseColors: {
    // TEMPORARY HARDCODED VALUE
    primary: '#1740ea',
    // TODO: Uncomment the line below when it doesn't cause a hydration error
    // primary: randomHexColor(),
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
