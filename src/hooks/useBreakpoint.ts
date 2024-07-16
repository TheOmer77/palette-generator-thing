import { screens } from '@/config/tailwind';
import { useMediaQuery } from 'usehooks-ts';

export const useBreakpoint = (breakpoint: keyof typeof screens) =>
  useMediaQuery(`(min-width: ${screens[breakpoint]})`);
