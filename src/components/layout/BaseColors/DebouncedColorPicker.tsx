import {
  forwardRef,
  useCallback,
  useEffect,
  useState,
  type ElementRef,
} from 'react';

import { ColorInput, type ColorInputProps } from '@/components/ui/ColorInput';
import { ColorPicker } from '@/components/ui/ColorPicker';
import { cn } from '@/lib/utils';

type DebouncedColorPickerProps = Omit<ColorInputProps, 'value'> & {
  initialValue: ColorInputProps['value'];
};

export const DebouncedColorPicker = forwardRef<
  ElementRef<typeof ColorInput>,
  DebouncedColorPickerProps
>(({ initialValue, onChange, className, ...props }, ref) => {
  const [pickerValue, setPickerValue] = useState(initialValue),
    [debouncedValue, setDebouncedValue] = useState(initialValue);

  const handlePickerChange = useCallback(
    (newValue: string) => {
      setPickerValue(newValue);
      if (pickerValue !== newValue) setDebouncedValue(newValue);
    },
    [setDebouncedValue, pickerValue]
  );

  const handleInputChange = useCallback(
    (newValue: string) => {
      onChange?.(newValue);
      setDebouncedValue(newValue);
      setPickerValue(newValue);
    },
    [onChange]
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (debouncedValue && debouncedValue !== initialValue)
        onChange?.(debouncedValue);
    }, 200);
    return () => clearTimeout(timeout);
  }, [debouncedValue, initialValue, onChange]);

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
