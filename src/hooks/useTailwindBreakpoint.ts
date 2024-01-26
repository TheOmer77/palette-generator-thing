import { useDebugValue } from 'react';
import { useMediaQuery } from 'usehooks-ts';

import { screens } from '@/constants';

export const useTailwindBreakpoint = (breakpoint: keyof typeof screens) => {
  const value = useMediaQuery(`(min-width: ${screens[breakpoint]})`);
  useDebugValue(value);
  return value;
};
