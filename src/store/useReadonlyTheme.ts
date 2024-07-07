import { create } from 'zustand';

import type { ResolvedTheme, Theme } from '@/constants/themes';

export type UseThemeState = {
  /** Currently active theme name. */
  theme?: Theme;
  /**
   * If the active theme is "system", whether the system preference resolved
   * to "dark" or "light". Otherwise, identical to `theme`.
   */
  resolvedTheme?: ResolvedTheme;
};

export type UseThemeActions = {
  /** Only used within ThemeProvider - do not use elsewhere. */
  _setTheme: (theme: Theme) => void;
  /** Only used within ThemeProvider - do not use elsewhere. */
  _setResolvedTheme: (theme: ResolvedTheme) => void;
};

export type UseThemeStore = UseThemeState & UseThemeActions;

/**
 * Read-only version of `useTheme` from `next-themes`, which can be used
 * outside of `<body>`. Whenever possible, use the original `useTheme` from
 * `next-themes` instead of this one.
 */
export const useReadonlyTheme = create<UseThemeStore>(set => ({
  _setTheme: theme => set({ theme }),
  _setResolvedTheme: resolvedTheme => set({ resolvedTheme }),
}));
