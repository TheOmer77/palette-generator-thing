import { Fragment, useMemo } from 'react';

import Header from './Header';
import { CodeBlock, H2, H3 } from 'components/general';
import { ColorBlock, ColorGrid } from 'components/colors';
import useTonalPalette from 'hooks/useTonalPalette';
import useGlobalState from 'hooks/useGlobalState';
import {
  getErrorColorHex,
  getNeutralVariantHex,
  getSecondaryColorHex,
} from 'utils/colorUtils';
import { tones } from 'constants';
import generateVariablesCss from 'utils/generateVariablesCss';

const Main = () => {
  const [{ baseColor }] = useGlobalState();

  const neutralVariantColor = useMemo(
      () => getNeutralVariantHex(baseColor),
      [baseColor]
    ),
    secondaryColor = useMemo(
      () => getSecondaryColorHex(baseColor),
      [baseColor]
    ),
    errorColor = useMemo(() => getErrorColorHex(baseColor), [baseColor]);

  const [getPrimaryTone] = useTonalPalette(baseColor),
    [getNeutralTone] = useTonalPalette(neutralVariantColor),
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
          'primary-neutral': neutralVariantColor,
          secondary: secondaryColor,
          error: errorColor,
        },
        { format: 'rgbValues' }
      ),

    [baseColor, errorColor, neutralVariantColor, secondaryColor]
  );

  return (
    <main
      className='w-[calc(100vw-2rem)] flex-grow p-4 pb-24 md:pb-4
      md:ps-[26rem]'
    >
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
