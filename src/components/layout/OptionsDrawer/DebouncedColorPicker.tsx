import { forwardRef, useCallback, useState, type ElementRef } from 'react';
import { useDebounceCallback } from 'usehooks-ts';

import { ColorPicker } from '@/components/ui/ColorPicker';
import { ColorInput, type ColorInputProps } from '@/components/colors';
import { cn } from '@/lib/utils';

type DebouncedColorPickerProps = Omit<ColorInputProps, 'value'> & {
  initialValue: ColorInputProps['value'];
};

export const DebouncedColorPicker = forwardRef<
  ElementRef<typeof ColorInput>,
  DebouncedColorPickerProps
>(({ initialValue, onChange, className, ...props }, ref) => {
  const [pickerValue, setPickerValue] = useState(initialValue);

  const debounceValue = useDebounceCallback(
    (value: string) => onChange?.(value),
    200
  );

  const handlePickerChange = useCallback(
    (newValue: string) => {
      setPickerValue(newValue);
      if (pickerValue !== newValue) debounceValue(newValue);
    },
    [debounceValue, pickerValue]
  );

  const handleInputChange = useCallback(
    (newValue: string) => {
      onChange?.(newValue);
      setPickerValue(newValue);
    },
    [onChange]
  );

  return (
    <>
      <ColorPicker value={pickerValue} onChange={handlePickerChange} />
      <ColorInput
        {...props}
        ref={ref}
        value={pickerValue}
        onChange={handleInputChange}
        withRandomBtn
        className={cn('mt-4', className)}
      />
    </>
  );
});
DebouncedColorPicker.displayName = 'DebouncedColorPicker';
