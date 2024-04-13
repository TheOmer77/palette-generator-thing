import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ElementRef,
} from 'react';

import { ColorInput, type ColorInputProps } from '@/components/ui/ColorInput';
import { ColorPicker } from '@/components/ui/ColorPicker';
import { cn } from '@/lib/utils';

type DebouncedColorPickerProps = Omit<ColorInputProps, 'value'> & {
  initialValue: ColorInputProps['value'];
  autoFocusInput?: boolean;
};

export const DebouncedColorPicker = ({
  initialValue,
  onChange,
  autoFocusInput,
  className,
  ...props
}: DebouncedColorPickerProps) => {
  const [pickerValue, setPickerValue] = useState(initialValue),
    [debouncedValue, setDebouncedValue] = useState(initialValue);

  const ref = useRef<ElementRef<typeof ColorInput>>(null);

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
    if (autoFocusInput) ref.current?.focus();
  }, [autoFocusInput]);

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
};
