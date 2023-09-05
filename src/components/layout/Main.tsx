import { Fragment, useMemo } from 'react';

import Header from './Header';
import { CodeBlock, H2, H3 } from 'components/general';
import { ColorBlock, ColorGrid } from 'components/colors';
import { useTheme } from 'hooks';
import { generatePalette, generateVariablesCss } from 'utils';
import { shades } from 'constants';

const Main = () => {
  const [primary, neutral, secondary, danger] = useTheme();

  const colorGrids = useMemo(
    () => [
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
        id: 'secondary',
        title: 'Secondary',
        palette: generatePalette(secondary),
      },
      {
        id: 'danger',
        title: 'Danger',
        palette: generatePalette(danger),
      },
    ],
    [danger, neutral, primary, secondary]
  );

  const themeCss = useMemo(
    () => generateVariablesCss({ primary, neutral, secondary, danger }),
    [danger, neutral, primary, secondary]
  );

  return (
    <main className='w-full max-w-7xl p-4 pb-24 md:pb-4 xl:mx-auto'>
      <Header className='mb-6 block md:hidden' />

      <H2>Palettes</H2>
      {colorGrids.map(({ id, title, palette }) => (
        <Fragment key={id}>
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
        </Fragment>
      ))}

      <H2>Theme CSS variables</H2>
      <CodeBlock language='css'>{themeCss}</CodeBlock>
    </main>
  );
};

export default Main;
