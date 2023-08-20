import { type ComponentProps, forwardRef } from 'react';

import { IconButton, Input } from 'components/general';
import { useGlobalState } from 'hooks';
import { randomHexColor } from 'utils';
import { RandomIcon } from 'assets/icons';

const OptionsSection = forwardRef<HTMLElement, ComponentProps<'section'>>(
  (props, ref) => {
    const [globalState, setGlobalState] = useGlobalState();

    return (
      <section {...props} ref={ref}>
        <Input
          id='input-base-color'
          label='Base color'
          value={globalState.baseColor}
          onChange={e => setGlobalState({ baseColor: e.target.value })}
          startAdornment={
            <div
              className='h-7 w-7 rounded-lg'
              style={{ backgroundColor: globalState.baseColor }}
            />
          }
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
