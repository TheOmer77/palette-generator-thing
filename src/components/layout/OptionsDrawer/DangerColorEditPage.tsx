import React, {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';

import { ColorEditPage } from './ColorEditPage';
import { useBaseColors } from '@/hooks/useBaseColors';
import { useOptionsDrawer } from '@/store/useOptionsDrawer';

export const DangerColorEditPage = forwardRef<
  ElementRef<typeof ColorEditPage>,
  ComponentPropsWithoutRef<'div'>
>((props, ref) => {
  const { danger: initialDanger } = useBaseColors();
  const { danger, setDanger } = useOptionsDrawer();

  return (
    <ColorEditPage
      {...props}
      ref={ref}
      title='Danger'
      color={danger || initialDanger}
    >
      Danger edit page TBD
    </ColorEditPage>
  );
});
DangerColorEditPage.displayName = 'DangerColorEditPage';
