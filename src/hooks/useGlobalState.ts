import { useContext } from 'react';
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from 'contexts/globalState';

const useGlobalState = () => {
  const globalState = useContext(GlobalStateContext);
  const setGlobalState = useContext(GlobalDispatchContext);

  return [globalState, setGlobalState] as [
    typeof globalState,
    typeof setGlobalState,
  ];
};

export default useGlobalState;
