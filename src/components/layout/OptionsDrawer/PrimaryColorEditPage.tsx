import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';

import { ColorEditPage } from './ColorEditPage';
import { DebouncedColorPicker } from '@/components/layout/BaseColors';
import { useBaseColors } from '@/hooks/useBaseColors';
import { useOptionsDrawer } from '@/store/useOptionsDrawer';

export const PrimaryColorEditPage = forwardRef<
  ElementRef<typeof ColorEditPage>,
  ComponentPropsWithoutRef<'div'>
>((props, ref) => {
  const { primary: initialPrimary } = useBaseColors();
  const { primary, setPrimary } = useOptionsDrawer();

  return (
    <ColorEditPage
      {...props}
      ref={ref}
      title='Primary'
      color={primary || initialPrimary}
    >
      <DebouncedColorPicker
        initialValue={initialPrimary}
        onChange={setPrimary}
      />
    </ColorEditPage>
  );
});
PrimaryColorEditPage.displayName = 'PrimaryColorEditPage';
