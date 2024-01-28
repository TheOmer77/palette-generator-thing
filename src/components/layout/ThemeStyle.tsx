'use client';

import { Suspense, useMemo } from 'react';

import { useTheme } from '@/hooks/useTheme';
import { generateCssCode } from '@/lib/codeGen';

const ThemeStyleContent = () => {
  const { primary, neutral, danger } = useTheme();

  const themeCss = useMemo(
    () => generateCssCode({ primary, neutral, danger }, 'rgbRaw'),
    [danger, neutral, primary]
  );

  return <style>{themeCss}</style>;
};

export const ThemeStyle = () => (
  <Suspense>
    <ThemeStyleContent />
  </Suspense>
);
