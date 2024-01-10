'use client';

import { useMemo } from 'react';

import { useTheme } from '@/hooks';
import { generateCssCode } from '@/utils';

const ThemeStyle = () => {
  const { primary, neutral, danger } = useTheme();

  const themeCss = useMemo(
    () => generateCssCode({ primary, neutral, danger }, 'rgbRaw'),
    [danger, neutral, primary]
  );

  return <style>{themeCss}</style>;
};

export default ThemeStyle;
