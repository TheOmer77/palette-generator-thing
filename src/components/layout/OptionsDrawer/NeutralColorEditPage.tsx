import React, {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';

import { ColorEditPage } from './ColorEditPage';
import { useBaseColors } from '@/hooks/useBaseColors';
import { useOptionsDrawer } from '@/store/useOptionsDrawer';

export const NeutralColorEditPage = forwardRef<
  ElementRef<typeof ColorEditPage>,
  ComponentPropsWithoutRef<'div'>
>((props, ref) => {
  const { neutral: initialNeutral } = useBaseColors();
  const { neutral, setNeutral } = useOptionsDrawer();

  return (
    <ColorEditPage
      {...props}
      ref={ref}
      title='Neutral'
      color={neutral || initialNeutral}
      onColorSave={setNeutral}
    >
      Neutral edit page TBD
    </ColorEditPage>
  );
});
NeutralColorEditPage.displayName = 'NeutralColorEditPage';
