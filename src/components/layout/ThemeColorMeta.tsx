'use client';

import { useEffect } from 'react';
import { useTheme } from 'next-themes';

import { useComputedBaseColors } from '@/hooks/useComputedBaseColors';
import { getPaletteColor } from '@/lib/colorUtils';

/**
 * Updates theme theme-color meta tag in the document head according to the
 * current theme and neutral color. This needs to be placed **in the body** in
 * order to utilize the ThemeProvider's resolved theme.
 */
export const ThemeColorMeta = () => {
  const { neutral } = useComputedBaseColors();
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    /** Resolved theme might be system on the initial render. On the next
     * render it should actually be resolved to light or dark. */
    if (resolvedTheme === 'system') return;

    const bgColor =
      resolvedTheme === 'light' ? '#ffffff' : getPaletteColor(neutral, 950);
    const themeColorEl = document.querySelector('meta[name="theme-color"]');

    if (!themeColorEl) return;
    themeColorEl.setAttribute('content', bgColor);
  }, [neutral, resolvedTheme]);

  return null;
};
