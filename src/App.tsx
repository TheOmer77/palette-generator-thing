import { useMemo, useState } from 'react';

import ColorGrid from './components/ColorGrid';
import Color from './components/Color';
import useTonalPalette from './hooks/useTonalPalette';
import {
  getErrorColorHex,
  getNeutralVariantHex,
  getSecondaryColorHex,
  randomHexColor,
} from './utils/colorUtils';
import generateVariablesCss from './utils/generateVariablesCss';
import { initialBaseColor, tones } from './constants';

const App = () => {
  const [baseColor, setBaseColor] = useState(initialBaseColor);
  const [sliderTone, setSliderTone] = useState(40);

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
    <>
      <h1>Material tonal palette test</h1>

      <h2>Base color</h2>
      <ColorGrid>
        <Color
          input
          value={baseColor}
          onChange={event => setBaseColor(event.target.value)}
        />
        <div>
          <button onClick={() => setBaseColor(randomHexColor())}>
            Generate random color
          </button>
        </div>
      </ColorGrid>

      <h2>Tones</h2>
      <h3>Primary (base color)</h3>
      <ColorGrid>
        {tones.map(tone => (
          <Color key={tone} value={getTone(tone) as string} />
        ))}
      </ColorGrid>
      <h3>Primary neutral</h3>
      <ColorGrid>
        {tones.map(tone => (
          <Color key={tone} value={getNeutralTone(tone) as string} />
        ))}
      </ColorGrid>
      <h3>Secondary</h3>
      <ColorGrid>
        {tones.map(tone => (
          <Color key={tone} value={getSecondaryTone(tone) as string} />
        ))}
      </ColorGrid>
      <h3>Error</h3>
      <ColorGrid>
        {tones.map(tone => (
          <Color key={tone} value={getErrorTone(tone) as string} />
        ))}
      </ColorGrid>

      <h2>Can I have any custom tone?</h2>
      <ColorGrid>
        <Color value={getTone(sliderTone) as string} />
        <Color value={getNeutralTone(sliderTone) as string} />
        <Color value={getSecondaryTone(sliderTone) as string} />
        <Color value={getErrorTone(sliderTone) as string} />
        <div>
          <label htmlFor='tone-slider'>Tone: {sliderTone}</label>
          <input
            id='tone-slider'
            type='range'
            min={0}
            max={100}
            value={sliderTone}
            onChange={event => setSliderTone(parseInt(event.target.value))}
            style={{ accentColor: getTone(50) as string }}
          />
        </div>
      </ColorGrid>

      <h2>Theme CSS variables</h2>
      <pre className='generated-css'>{themeCss}</pre>
    </>
  );
};

export default App;
