'use client';

import { Suspense, useMemo } from 'react';

import { CodeBlock } from '@/components/ui/CodeBlock';
import { H2 } from '@/components/ui/Headings';
import { useTheme } from '@/hooks/useTheme';
import { useCodeGen } from '@/store/useCodeGen';
import {
  generateCssCode,
  generateJsonCode,
  generateScssCode,
} from '@/lib/codeGen';
import { toCamelCase } from '@/lib/utils';
import { codeFormats } from '@/constants';

const MainContent = () => {
  const { primary, neutral, danger, extras } = useTheme();
  const { format, colorFormat } = useCodeGen();

  const themeCode = useMemo(() => {
    const palettes = extras.reduce(
      (obj, { name, value }, index) => ({
        ...obj,
        [typeof name === 'string' && name.length > 0
          ? toCamelCase(name)
          : `extra${index + 1}`]: value,
      }),
      { primary, neutral, danger }
    );

    switch (format) {
      case 'css':
        return generateCssCode(palettes, colorFormat);
      case 'scss':
        return generateScssCode(palettes, colorFormat);
      case 'json':
        return generateJsonCode(palettes, colorFormat);
      default:
        return '';
    }
  }, [colorFormat, format, danger, extras, neutral, primary]);

  return (
    <main
      className='p-4 md:ps-[21rem] [&>*]:mx-auto [&>*]:w-full
[&>*]:max-w-screen-lg'
    >
      <H2 className='break-before-page'>
        {codeFormats[format].displayName} code
      </H2>
      <CodeBlock language={format}>{themeCode}</CodeBlock>
    </main>
  );
};

export const CodeGenMain = () => (
  <Suspense>
    <MainContent />
  </Suspense>
);
