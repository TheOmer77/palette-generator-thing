'use client';

import { Suspense, useMemo } from 'react';

import { Header } from './Header';
import { H2, H3 } from '@/components/ui/Headings';
import { ColorBlock, ColorGrid } from '@/components/colors';
import { useTheme } from '@/hooks/useTheme';
import { generatePalette } from '@/lib/colorUtils';
import { toCamelCase } from '@/lib/utils';
import { shades } from '@/constants';

const MainContent = () => {
  const { primary, neutral, danger, extras } = useTheme();

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
    </main>
  );
};

export const Main = () => (
  <Suspense>
    <MainContent />
  </Suspense>
);
