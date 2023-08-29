import { Fragment, useMemo } from 'react';

import Header from './Header';
import { CodeBlock, H2, H3 } from 'components/general';
import { ColorBlock, ColorGrid } from 'components/colors';
import { useTheme } from 'hooks';
import { generatePalette, generateVariablesCss } from 'utils';

const Main = () => {
  const [primary, neutral] = useTheme();

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
    ],
    [neutral, primary]
  );

  const themeCss = useMemo(
    () => generateVariablesCss({ primary, neutral }),
    [neutral, primary]
  );

  return (
    <main className='p-4 pb-24 md:pb-4'>
      <Header className='mb-6 block md:hidden' />

      <H2>Palettes</H2>
      {colorGrids.map(({ id, title, palette }) => (
        <Fragment key={id}>
          <H3>{title}</H3>
          <ColorGrid>
            {palette.map(color => (
              <ColorBlock key={color} value={color} />
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
