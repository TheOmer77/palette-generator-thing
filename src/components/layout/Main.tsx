import { useMemo } from 'react';

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

  const [getTone] = useTonalPalette(baseColor),
    [getNeutralTone] = useTonalPalette(neutralVariantColor),
    [getSecondaryTone] = useTonalPalette(secondaryColor),
    [getErrorTone] = useTonalPalette(errorColor);

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
      className='max-h-screen flex-grow overflow-y-auto p-4
      pb-24 md:pb-0'
    >
      <Header className='mb-6 block md:hidden' />
      <H2>Tones</H2>
      <H3>Primary (base color)</H3>
      <ColorGrid>
        {tones.map(tone => (
          <ColorBlock key={tone} value={getTone(tone) as string} />
        ))}
      </ColorGrid>
      <H3>Primary neutral</H3>
      <ColorGrid>
        {tones.map(tone => (
          <ColorBlock key={tone} value={getNeutralTone(tone) as string} />
        ))}
      </ColorGrid>
      <H3>Secondary</H3>
      <ColorGrid>
        {tones.map(tone => (
          <ColorBlock key={tone} value={getSecondaryTone(tone) as string} />
        ))}
      </ColorGrid>
      <H3>Error</H3>
      <ColorGrid>
        {tones.map(tone => (
          <ColorBlock key={tone} value={getErrorTone(tone) as string} />
        ))}
      </ColorGrid>

      <H2>Theme CSS variables</H2>
      <CodeBlock>{themeCss}</CodeBlock>
    </main>
  );
};

export default Main;
