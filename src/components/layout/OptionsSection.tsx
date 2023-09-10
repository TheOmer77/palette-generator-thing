import { type ComponentProps, forwardRef } from 'react';

import { IconButton } from 'components/general';
import { ColorInput } from 'components/colors';
import { useGlobalState } from 'hooks';
import { randomHexColor } from 'utils';
import { RandomIcon } from 'assets/icons';

const OptionsSection = forwardRef<HTMLElement, ComponentProps<'section'>>(
  (props, ref) => {
    const [{ baseColors }, setGlobalState] = useGlobalState();

    return (
      <section {...props} ref={ref}>
        <ColorInput
          id='input-base-color'
          label='Base color'
          value={baseColors.primary}
          onChange={newColor => {
            setGlobalState({
              baseColors: { ...baseColors, primary: newColor },
            });
          }}
          endAdornment={
            <IconButton
              title='Generate random color'
              onClick={() =>
                setGlobalState({
                  baseColors: { ...baseColors, primary: randomHexColor() },
                })
              }
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
