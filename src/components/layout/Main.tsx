import { useMemo } from 'react';

import { H2, H3 } from 'components/general';
import { ColorBlock, ColorGrid } from 'components/colors';
import useTonalPalette from 'hooks/useTonalPalette';
import useGlobalState from 'hooks/useGlobalState';
import {
  getErrorColorHex,
  getNeutralVariantHex,
  getSecondaryColorHex,
} from 'utils/colorUtils';
import { tones } from 'constants';

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

  return (
    <main className='max-h-screen flex-grow overflow-y-auto p-4'>
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
    </main>
  );
};

export default Main;
