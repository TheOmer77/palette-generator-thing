import React, {
  forwardRef,
  useMemo,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';

import { ColorEditPage } from './ColorEditPage';
import { DangerColorEditor } from '@/components/layout/BaseColors';
import { useBaseColors } from '@/hooks/useBaseColors';
import { useOptionsDrawer } from '@/store/useOptionsDrawer';
import { getAutoDangerColor } from '@/lib/colorUtils';
import {
  dangerColorSuggestionNames,
  dangerColorSuggestions,
} from '@/constants/colorSuggestions';
import type { DangerColorSuggestion } from '@/types/defaultSuggestions';

export const DangerColorEditPage = forwardRef<
  ElementRef<typeof ColorEditPage>,
  ComponentPropsWithoutRef<'div'>
>((props, ref) => {
  const { primary, danger: initialDanger } = useBaseColors();
  const { danger: drawerDanger } = useOptionsDrawer();

  const danger =
    typeof drawerDanger === 'undefined' ? initialDanger : drawerDanger;
  const dangerIsAuto = danger === null,
    dangerIsSuggestion =
      typeof danger === 'string' && dangerColorSuggestionNames.includes(danger);

  const themeDanger = useMemo(
    () =>
      dangerIsSuggestion
        ? dangerColorSuggestions[danger as DangerColorSuggestion]?.(primary)
        : dangerIsAuto
          ? getAutoDangerColor(primary)
          : danger,
    [danger, dangerIsAuto, dangerIsSuggestion, primary]
  );

  return (
    <ColorEditPage {...props} ref={ref} title='Danger' color={themeDanger}>
      <DangerColorEditor />
    </ColorEditPage>
  );
});
DangerColorEditPage.displayName = 'DangerColorEditPage';
