import { useDebugValue } from 'react';

import { screens } from 'constants';
import useMediaQuery from './useMediaQuery';

const useTailwindBreakpoint = (breakpoint: keyof typeof screens) => {
  const value = useMediaQuery(`(min-width: ${screens[breakpoint]})`);
  useDebugValue(value);
  return value;
};

export default useTailwindBreakpoint;
