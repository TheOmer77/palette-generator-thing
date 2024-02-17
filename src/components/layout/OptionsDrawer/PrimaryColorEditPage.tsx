import {
  forwardRef,
  useCallback,
  useState,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';

import { ColorEditPage } from './ColorEditPage';
import { ColorPicker } from '@/components/ui/ColorPicker';
import { ColorInput } from '@/components/colors';
import { useBaseColors } from '@/hooks/useBaseColors';

export const PrimaryColorEditPage = forwardRef<
  ElementRef<typeof ColorEditPage>,
  ComponentPropsWithoutRef<'div'>
>((props, ref) => {
  const { primary } = useBaseColors();
  const [value, setValue] = useState(primary),
    [pickerValue, setPickerValue] = useState(value);

  const handlePickerEnd = useCallback(() => {
    if (pickerValue !== value) setValue(pickerValue);
  }, [pickerValue, value]);

  const handleInputChange = useCallback((value: string) => {
    setValue(value);
    setPickerValue(value);
  }, []);

  return (
    <ColorEditPage {...props} ref={ref} title='Primary' color={value}>
      <ColorPicker
        value={pickerValue}
        onChange={setPickerValue}
        onMouseUp={handlePickerEnd}
        onTouchEnd={handlePickerEnd}
        onKeyUp={handlePickerEnd}
      />
      <ColorInput
        value={pickerValue}
        onChange={handleInputChange}
        withRandomBtn
      />
    </ColorEditPage>
  );
});
PrimaryColorEditPage.displayName = 'PrimaryColorEditPage';
