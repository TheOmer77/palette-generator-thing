import { useMediaQuery } from 'usehooks-ts';

import { screens } from '@/config/tailwind';

export const useBreakpoint = (breakpoint: keyof typeof screens) =>
  useMediaQuery(`(min-width: ${screens[breakpoint]})`);
