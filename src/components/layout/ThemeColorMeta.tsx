'use client';

import { Suspense, useMemo } from 'react';

import { useComputedBaseColors } from '@/hooks/useComputedBaseColors';
import { useReadonlyTheme } from '@/store/useReadonlyTheme';
import { getPaletteColor } from '@/lib/colorUtils';

const ThemeColorMetaContent = () => {
  const { neutral } = useComputedBaseColors();
  const { resolvedTheme } = useReadonlyTheme();

  const themeColorMetaValue = useMemo(() => {
    if (!resolvedTheme) return;
    return resolvedTheme === 'light'
      ? '#ffffff'
      : getPaletteColor(neutral, 950);
  }, [neutral, resolvedTheme]);

  return <meta name='theme-color' content={themeColorMetaValue || '#000000'} />;
};

export const ThemeColorMeta = () => (
  <Suspense>
    <ThemeColorMetaContent />
  </Suspense>
);
