'use client';

import { Suspense, useMemo } from 'react';

import { useComputedBaseColors } from '@/hooks/useComputedBaseColors';
import { generateCssCode } from '@/lib/codeGen';

const ThemeStyleContent = () => {
  const { primary, neutral, danger } = useComputedBaseColors();

  const themeCss = useMemo(() => {
    if (!primary) return null;
    return generateCssCode({ primary, neutral, danger }, 'rgbRaw', [
      'main',
      'active',
      'foreground',
    ]);
  }, [danger, neutral, primary]);

  return themeCss ? <style>{themeCss}</style> : null;
};

export const ThemeStyle = () => (
  <Suspense>
    <ThemeStyleContent />
  </Suspense>
);
