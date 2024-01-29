'use client';

import { Suspense, useMemo } from 'react';

import { Header } from './Header';
import { ColorBlock, ColorGrid } from '@/components/colors';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { H2, H3 } from '@/components/ui/Headings';
import { useTheme } from '@/hooks/useTheme';
import { useCodeGen } from '@/store/useCodeGen';
import {
  generateCssCode,
  generateJsonCode,
  generateScssCode,
} from '@/lib/codeGen';
import { generatePalette } from '@/lib/colorUtils';
import { toCamelCase } from '@/lib/utils';
import { codeFormats, shades } from '@/constants';

const MainContent = () => {
  const { primary, neutral, danger, extras } = useTheme();
  const { format, colorFormat } = useCodeGen();

  const colorGrids = useMemo(() => {
    const grids = [
      {
        id: 'primary',
        title: 'Primary',
        palette: generatePalette(primary),
      },
      {
        id: 'neutral',
        title: 'Neutral',
        palette: generatePalette(neutral),
      },
      {
        id: 'danger',
        title: 'Danger',
        palette: generatePalette(danger),
      },
      ...extras.map(({ name, value }, index) => ({
        id:
          typeof name === 'string' && name.length > 0
            ? toCamelCase(name)
            : `extra${index + 1}`,
        title: name || `Extra ${index + 1}`,
        palette: generatePalette(value),
      })),
    ];
    // Return only grids with unique ids
    return [...new Set(grids.map(({ id }) => id))].map(uid =>
      grids.find(({ id }) => id === uid)
    ) as typeof grids;
  }, [danger, extras, neutral, primary]);

  const themeCode = useMemo(() => {
    const palettes = extras.reduce(
      (obj, { name, value }, index) => ({
        ...obj,
        [typeof name === 'string' && name.length > 0
          ? toCamelCase(name)
          : `extra${index + 1}`]: value,
      }),
      {
        primary,
        neutral,
        danger,
      }
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
      <Header className='mb-6 block md:hidden' />

      <H2>Palettes</H2>
      {colorGrids.map(({ id, title, palette }) => (
        <div key={id} className='break-inside-avoid'>
          <H3>{title}</H3>
          <ColorGrid>
            {palette.map((color, index) => (
              <ColorBlock
                key={color}
                value={color}
                label={shades[index].toString()}
              />
            ))}
          </ColorGrid>
        </div>
      ))}

      {format !== 'none' && (
        <>
          <H2 className='break-before-page'>
            {codeFormats[format].displayName} code
          </H2>
          <CodeBlock
            language={!['none', 'custom'].includes(format) ? format : ''}
          >
            {themeCode}
          </CodeBlock>
        </>
      )}
    </main>
  );
};

export const Main = () => (
  <Suspense>
    <MainContent />
  </Suspense>
);
