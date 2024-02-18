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
import { useOptionsDrawer } from '@/store/useOptionsDrawer';

export const PrimaryColorEditPage = forwardRef<
  ElementRef<typeof ColorEditPage>,
  ComponentPropsWithoutRef<'div'>
>((props, ref) => {
  const { primary: initialPrimary } = useBaseColors();
  const { primary, setPrimary } = useOptionsDrawer();

  const [pickerValue, setPickerValue] = useState(initialPrimary);

  const handlePickerEnd = useCallback(() => {
    if (pickerValue !== primary) setPrimary(pickerValue);
  }, [pickerValue, primary, setPrimary]);

  const handleInputChange = useCallback(
    (value: string) => {
      setPrimary(value);
      setPickerValue(value);
    },
    [setPrimary]
  );

  return (
    <ColorEditPage
      {...props}
      ref={ref}
      title='Primary'
      color={primary || initialPrimary}
      onColorSave={setPrimary}
    >
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
