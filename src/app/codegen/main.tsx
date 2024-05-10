'use client';

import { Suspense, useMemo } from 'react';
import { useIsClient } from 'usehooks-ts';
import { camelCase } from 'change-case';

import { CodeBlock } from '@/components/ui/CodeBlock';
import { H1 } from '@/components/ui/Headings';
import { Select, SelectItem } from '@/components/ui/Select';
import { Header } from '@/components/layout/Header';
import { useCodeGen } from '@/store/useCodeGen';
import { useComputedBaseColors } from '@/hooks/useComputedBaseColors';
import {
  generateCssCode,
  generateJsonCode,
  generateScssCode,
} from '@/lib/codeGen';
import { codeFormats, colorFormats } from '@/constants';

const MainContent = () => {
  const { primary, neutral, danger, extras } = useComputedBaseColors();
  const { format, colorFormat, setFormat, setColorFormat } = useCodeGen();
  const isClient = useIsClient();

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
      className='flex flex-col p-4 pb-20 md:pb-4 md:ps-[21rem] print:ps-4
[&>*]:mx-auto [&>*]:w-full [&>*]:max-w-screen-lg'
    >
      <Header className='mb-6 hidden print:block' />

      <H1>{codeFormats[format].displayName} code</H1>
      <div
        className='sticky top-16 z-20 grid grid-cols-1 gap-2 bg-background pb-2
sm:grid-cols-2 md:hidden print:hidden'
      >
        <Select
          label='Format'
          value={format}
          onValueChange={setFormat}
          disabled={!isClient}
        >
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
          disabled={!isClient}
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
