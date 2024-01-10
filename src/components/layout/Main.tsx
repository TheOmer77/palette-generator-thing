'use client';

import { useMemo } from 'react';

import Header from './Header';
import { ColorBlock, ColorGrid } from '@/components/colors';
import { CodeBlock, H2, H3 } from '@/components/general';
import { useGlobalState, useTheme } from '@/hooks';
import {
  generateCssCode,
  generateJsonCode,
  generatePalette,
  generateScssCode,
  toCamelCase,
} from '@/utils';
import { codeFormats, shades } from '@/constants';

const Main = () => {
  const { primary, neutral, danger, extras } = useTheme();
  const [{ codeGen }] = useGlobalState();

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

    switch (codeGen.format) {
      case 'css':
        return generateCssCode(palettes, codeGen.colorFormat);
      case 'scss':
        return generateScssCode(palettes, codeGen.colorFormat);
      case 'json':
        return generateJsonCode(palettes, codeGen.colorFormat);
      default:
        return '';
    }
  }, [codeGen.colorFormat, codeGen.format, danger, extras, neutral, primary]);

  return (
    <main className='w-full max-w-7xl p-4 pb-24 md:pb-4 xl:mx-auto'>
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

      {codeGen.format !== 'none' && (
        <>
          <H2 className='break-before-page'>
            {codeFormats[codeGen.format].displayName} code
          </H2>
          <CodeBlock
            language={
              !['none', 'custom'].includes(codeGen.format) ? codeGen.format : ''
            }
          >
            {themeCode}
          </CodeBlock>
        </>
      )}
    </main>
  );
};

export default Main;
