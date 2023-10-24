import { useMemo } from 'react';

import Header from './Header';
import { CodeBlock, H2, H3 } from 'components/general';
import { ColorBlock, ColorGrid } from 'components/colors';
import { useGlobalState, useTheme } from 'hooks';
import { generatePalette, generateVariablesCss, toCamelCase } from 'utils';
import { shades } from 'constants';

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

  const themeCss = useMemo(
    () =>
      generateVariablesCss(
        extras.reduce(
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
        ),
        codeGen.colorFormat
      ),
    [codeGen.colorFormat, danger, extras, neutral, primary]
  );

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

      <H2 className='break-before-page'>Theme CSS variables</H2>
      <CodeBlock language='css'>{themeCss}</CodeBlock>
    </main>
  );
};

export default Main;
