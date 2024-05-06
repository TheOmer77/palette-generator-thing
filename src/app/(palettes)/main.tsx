'use client';

import { Suspense, useMemo } from 'react';
import { camelCase } from 'change-case';

import { H1, H2 } from '@/components/ui/Headings';
import { ColorGridItem, ColorGrid } from '@/components/layout/ColorGrid';
import { useTheme } from '@/hooks/useTheme';
import { generatePalette } from '@/lib/colorUtils';
import { DEFAULT_NEUTRAL_CURVE, shades } from '@/constants';

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
        palette: generatePalette(neutral, {
          lightnessCurve: DEFAULT_NEUTRAL_CURVE,
        }),
      },
      {
        id: 'danger',
        title: 'Danger',
        palette: generatePalette(danger),
      },
      ...extras.map(({ name, value }, index) => ({
        id:
          typeof name === 'string' && name.length > 0
            ? camelCase(name)
            : `extra${index + 1}`,
        title: name || `Extra ${index + 1}`,
        palette: generatePalette(value),
      })),
    ];
    // Return only grids with unique ids
    return [...new Set(grids.map(({ id }) => id.toLowerCase()))].map(
      lowercaseId => grids.find(({ id }) => id.toLowerCase() === lowercaseId)
    ) as typeof grids;
  }, [danger, extras, neutral, primary]);

  return (
    <main
      className='p-4 pb-20 md:pb-4 md:ps-[21rem] [&>*]:mx-auto [&>*]:w-full
[&>*]:max-w-screen-lg'
    >
      <H1>Palettes</H1>
      {colorGrids.map(({ id, title, palette }) => (
        <div key={id} className='break-inside-avoid'>
          <H2>{title}</H2>
          <ColorGrid>
            {palette.map((color, index) => (
              <ColorGridItem
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

export const PalettesMain = () => (
  <Suspense>
    <MainContent />
  </Suspense>
);
