import { forwardRef, type ComponentProps } from 'react';
import { HexColorInput } from 'react-colorful';
import { Input, type InputProps } from 'components/general';

export interface ColorInputProps
  extends Omit<
    InputProps,
    'asChild' | 'onChange' | 'color' | 'ref' | 'value' | 'type'
  > {
  value: string;
  onChange?: ComponentProps<typeof HexColorInput>['onChange'];
}

const ColorInput = forwardRef<HTMLInputElement, ColorInputProps>(
  ({ value, onChange, ...props }, ref) => (
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
      {...props}
    >
      <HexColorInput prefixed color={value} onChange={onChange} />
    </Input>
  )
);
ColorInput.displayName = 'ColorInput';

export default ColorInput;
