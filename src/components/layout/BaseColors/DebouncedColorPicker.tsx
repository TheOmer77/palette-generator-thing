import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type ElementRef,
} from 'react';

import { ColorInput, type ColorInputProps } from '@/components/ui/ColorInput';
import { ColorPicker } from '@/components/ui/ColorPicker';
import { cn } from '@/lib/utils';

type DebouncedColorPickerProps = Omit<ColorInputProps, 'value'> & {
  initialValue: ColorInputProps['value'];
  focusInput?: boolean;
};

export const DebouncedColorPicker = forwardRef<
  ElementRef<typeof ColorInput>,
  DebouncedColorPickerProps
>(({ initialValue, onChange, focusInput, className, ...props }, ref) => {
  const [pickerValue, setPickerValue] = useState(initialValue),
    [debouncedValue, setDebouncedValue] = useState(initialValue);

  const innerRef = useRef<ElementRef<typeof ColorInput>>(null);
  useImperativeHandle(ref, () => innerRef.current!, []);

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

  useEffect(() => {
    if (focusInput) innerRef.current?.focus();
  }, [focusInput]);

  return (
    <>
      <ColorPicker value={pickerValue} onChange={handlePickerChange} />
      <ColorInput
        {...props}
        ref={innerRef}
        value={pickerValue}
        onChange={handleInputChange}
        withRandomBtn
        className={cn('mt-4', className)}
      />
    </>
  );
});
DebouncedColorPicker.displayName = 'DebouncedColorPicker';
