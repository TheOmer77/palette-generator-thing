import { forwardRef, type ComponentProps } from 'react';
import { HexColorInput } from 'react-colorful';

import { IconButton, Input, type InputProps } from 'components/general';
import { RandomIcon } from 'assets/icons';
import { randomHexColor } from 'utils';

export interface ColorInputProps
  extends Omit<
    InputProps,
    | 'asChild'
    | 'onChange'
    | 'color'
    | 'ref'
    | 'value'
    | 'type'
    | 'startAdornment'
    | 'endAdornment'
  > {
  value: string;
  onChange?: ComponentProps<typeof HexColorInput>['onChange'];
  withRandomBtn?: boolean;
}

const ColorInput = forwardRef<HTMLInputElement, ColorInputProps>(
  ({ value, onChange, withRandomBtn, ...props }, ref) => (
    <Input
      asChild
      ref={ref}
      value={value}
      startAdornment={
        <div
          className='h-7 w-7 rounded-lg'
          style={{ backgroundColor: value }}
        />
      }
      {...(withRandomBtn
        ? {
            endAdornment: (
              <IconButton
                title='Generate random color'
                onClick={() => onChange?.(randomHexColor())}
              >
                <RandomIcon />
              </IconButton>
            ),
          }
        : {})}
      {...props}
    >
      <HexColorInput prefixed color={value} onChange={onChange} />
    </Input>
  )
);
ColorInput.displayName = 'ColorInput';

export default ColorInput;
