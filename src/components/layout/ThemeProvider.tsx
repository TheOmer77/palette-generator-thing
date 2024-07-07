'use client';

import { useEffect, type PropsWithChildren } from 'react';
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';

import { useReadonlyTheme } from '@/store/useReadonlyTheme';
import { THEMES, type ResolvedTheme, type Theme } from '@/constants/themes';

const ThemeProviderContent = ({ children }: PropsWithChildren) => {
  const { theme, resolvedTheme } = useTheme();
  const { _setTheme, _setResolvedTheme } = useReadonlyTheme();

  useEffect(() => {
    if (theme && Object.keys(THEMES).includes(theme)) _setTheme(theme as Theme);
  }, [_setTheme, theme]);

  useEffect(() => {
    if (
      resolvedTheme &&
      Object.keys(THEMES)
        .filter(key => key !== 'system')
        .includes(resolvedTheme)
    )
      _setResolvedTheme(resolvedTheme as ResolvedTheme);
  }, [resolvedTheme, _setResolvedTheme]);

  return children;
};

export const ThemeProvider = ({ children }: PropsWithChildren) => (
  <NextThemesProvider>
    <ThemeProviderContent>{children}</ThemeProviderContent>
  </NextThemesProvider>
);
