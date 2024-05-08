'use client';

import { Suspense, useMemo } from 'react';

import { useTheme } from '@/hooks/useTheme';
import { generateCssCode } from '@/lib/codeGen';

const ThemeStyleContent = () => {
  const { primary, neutral, danger } = useTheme();

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
