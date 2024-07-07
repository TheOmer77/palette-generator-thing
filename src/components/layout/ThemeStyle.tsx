'use client';

import { Suspense, useMemo } from 'react';

import { useComputedBaseColors } from '@/hooks/useComputedBaseColors';
import { useReadonlyTheme } from '@/store/useReadonlyTheme';
import { generateCssCode } from '@/lib/codeGen';
import { getPaletteColor } from '@/lib/colorUtils';

const ThemeStyleContent = () => {
  const { primary, neutral, danger } = useComputedBaseColors();
  const { resolvedTheme } = useReadonlyTheme();

  const themeCss = useMemo(() => {
    if (!primary) return null;
    return generateCssCode({ primary, neutral, danger }, 'rgbRaw', [
      'main',
      'active',
      'foreground',
    ]);
  }, [danger, neutral, primary]);

  const themeColorMetaValue = useMemo(() => {
    if (!resolvedTheme) return;
    return resolvedTheme === 'light'
      ? '#ffffff'
      : getPaletteColor(neutral, 950);
  }, [neutral, resolvedTheme]);

  return (
    <>
      {themeCss && <style>{themeCss}</style>}
      <meta name='theme-color' content={themeColorMetaValue || '#000000'} />
    </>
  );
};

export const ThemeStyle = () => (
  <Suspense>
    <ThemeStyleContent />
  </Suspense>
);
