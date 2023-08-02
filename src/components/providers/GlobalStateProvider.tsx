import { ReactNode, useCallback, useState } from 'react';
import {
  GlobalDispatchContext,
  GlobalState,
  GlobalStateContext,
  initialState,
} from 'contexts/globalState';

const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const [globalState, _setGlobalState] = useState(initialState);
  const setGlobalState = useCallback(
    (options: Partial<GlobalState>) =>
      _setGlobalState(prev => ({ ...prev, ...options })),
    []
  );

  return (
    <GlobalStateContext.Provider value={globalState}>
      <GlobalDispatchContext.Provider value={setGlobalState}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
};

export default GlobalStateProvider;
