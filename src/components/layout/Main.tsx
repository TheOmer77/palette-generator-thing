import { Fragment, useMemo } from 'react';

import Header from './Header';
import { CodeBlock, H2, H3 } from 'components/general';
import { ColorBlock, ColorGrid } from 'components/colors';
import { useTheme, useTonalPalette } from 'hooks';
import { generateVariablesCss } from 'utils';
import { tones } from 'constants';

const Main = () => {
  const [baseColor, neutralColor, secondaryColor, errorColor] = useTheme();

  const [getPrimaryTone] = useTonalPalette(baseColor),
    [getNeutralTone] = useTonalPalette(neutralColor),
    [getSecondaryTone] = useTonalPalette(secondaryColor),
    [getErrorTone] = useTonalPalette(errorColor);

  const colorGrids = useMemo(
    () => [
      {
        id: 'primary',
        title: 'Primary (base color)',
        tones: tones.map(tone => getPrimaryTone(tone)),
      },
      {
        id: 'neutral',
        title: 'Neutral',
        tones: tones.map(tone => getNeutralTone(tone)),
      },
      {
        id: 'secondary',
        title: 'Secondary',
        tones: tones.map(tone => getSecondaryTone(tone)),
      },
      {
        id: 'error',
        title: 'Error',
        tones: tones.map(tone => getErrorTone(tone)),
      },
    ],
    [getErrorTone, getNeutralTone, getPrimaryTone, getSecondaryTone]
  );

  const themeCss = useMemo(
    () =>
      generateVariablesCss(
        {
          primary: baseColor,
          neutral: neutralColor,
          secondary: secondaryColor,
          error: errorColor,
        },
        { format: 'rgbValues' }
      ),

    [baseColor, errorColor, neutralColor, secondaryColor]
  );

  return (
    <main className='p-4 pb-24 md:pb-4'>
      <Header className='mb-6 block md:hidden' />
      <H2>Tones</H2>
      {colorGrids.map(({ id, title, tones }) => (
        <Fragment key={id}>
          <H3>{title}</H3>
          <ColorGrid>
            {tones.map(tone => (
              <ColorBlock key={tone as string} value={tone as string} />
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
