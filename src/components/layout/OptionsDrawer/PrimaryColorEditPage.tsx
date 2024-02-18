import {
  forwardRef,
  useCallback,
  useState,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import { useDebounceCallback } from 'usehooks-ts';

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

  const debounceValue = useDebounceCallback(setPrimary, 200);

  const handlePickerChange = useCallback(
    (value: string) => {
      setPickerValue(value);
      if (pickerValue !== primary) debounceValue(pickerValue);
    },
    [debounceValue, pickerValue, primary]
  );

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
    >
      <ColorPicker value={pickerValue} onChange={handlePickerChange} />
      <ColorInput
        value={pickerValue}
        onChange={handleInputChange}
        withRandomBtn
      />
    </ColorEditPage>
  );
});
PrimaryColorEditPage.displayName = 'PrimaryColorEditPage';
