import { type ComponentProps, forwardRef } from 'react';

import { IconButton } from 'components/general';
import { ColorInput } from 'components/colors';
import { useGlobalState } from 'hooks';
import { randomHexColor } from 'utils';
import { RandomIcon } from 'assets/icons';

const OptionsSection = forwardRef<HTMLElement, ComponentProps<'section'>>(
  (props, ref) => {
    const [globalState, setGlobalState] = useGlobalState();

    return (
      <section {...props} ref={ref}>
        <ColorInput
          id='input-base-color'
          label='Base color'
          value={globalState.baseColor}
          onChange={newColor => {
            setGlobalState({ baseColor: newColor });
          }}
          endAdornment={
            <IconButton
              title='Generate random color'
              onClick={() => setGlobalState({ baseColor: randomHexColor() })}
            >
              <RandomIcon />
            </IconButton>
          }
        />
      </section>
    );
  }
);
OptionsSection.displayName = 'OptionsSection';

export default OptionsSection;
