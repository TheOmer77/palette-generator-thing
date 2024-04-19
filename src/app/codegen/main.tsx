'use client';

import { Suspense, useMemo } from 'react';
import { camelCase } from 'change-case';

import { CodeBlock } from '@/components/ui/CodeBlock';
import { H1 } from '@/components/ui/Headings';
import { Select, SelectItem } from '@/components/ui/Select';
import { Header } from '@/components/layout/Header';
import { useTheme } from '@/hooks/useTheme';
import { useCodeGen } from '@/store/useCodeGen';
import {
  generateCssCode,
  generateJsonCode,
  generateScssCode,
} from '@/lib/codeGen';
import { codeFormats, colorFormats } from '@/constants';

const MainContent = () => {
  const { primary, neutral, danger, extras } = useTheme();
  const { format, colorFormat, setFormat, setColorFormat } = useCodeGen();

  const themeCode = useMemo(() => {
    const palettes = extras.reduce(
      (obj, { name, value }, index) => ({
        ...obj,
        [typeof name === 'string' && name.length > 0
          ? camelCase(name)
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
      className='flex max-h-[calc(100dvh-theme(spacing.16))] flex-col p-4 md:ps-[21rem] print:ps-4 [&>*]:mx-auto
[&>*]:w-full [&>*]:max-w-screen-lg'
    >
      <Header className='mb-6 hidden print:block' />

      <H1>{codeFormats[format].displayName} code</H1>
      <div
        className='mb-2 grid grid-cols-1 gap-2 sm:grid-cols-2 md:hidden
print:hidden'
      >
        <Select label='Format' value={format} onValueChange={setFormat}>
          {Object.entries(codeFormats).map(([key, { displayName }]) => (
            <SelectItem key={key} value={key}>
              {displayName}
            </SelectItem>
          ))}
        </Select>
        <Select
          label='Color format'
          value={colorFormat}
          onValueChange={setColorFormat}
        >
          {Object.entries(colorFormats).map(([key, { displayName }]) => (
            <SelectItem key={key} value={key}>
              {displayName}
            </SelectItem>
          ))}
        </Select>
      </div>
      <CodeBlock language={format} className='grow'>
        {themeCode}
      </CodeBlock>
    </main>
  );
};

export const CodeGenMain = () => (
  <Suspense>
    <MainContent />
  </Suspense>
);
