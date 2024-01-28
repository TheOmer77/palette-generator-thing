'use client';

import { useMemo } from 'react';

import { useTheme } from '@/hooks/useTheme';
import { generateCssCode } from '@/lib/codeGen';

export const ThemeStyle = () => {
  const { primary, neutral, danger } = useTheme();

  const themeCss = useMemo(
    () => generateCssCode({ primary, neutral, danger }, 'rgbRaw'),
    [danger, neutral, primary]
  );

  return <style>{themeCss}</style>;
};
