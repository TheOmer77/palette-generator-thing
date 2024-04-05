import React, {
  forwardRef,
  useMemo,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';

import { ColorEditPage } from './ColorEditPage';
import { NeutralColorEditor } from '@/components/layout/BaseColors';
import { useBaseColors } from '@/hooks/useBaseColors';
import { useOptionsDrawer } from '@/store/useOptionsDrawer';
import { getAutoNeutralColor } from '@/lib/colorUtils';
import {
  neutralColorSuggestionNames,
  neutralColorSuggestions,
} from '@/constants/colorSuggestions';
import type { NeutralColorSuggestion } from '@/types/defaultSuggestions';

export const NeutralColorEditPage = forwardRef<
  ElementRef<typeof ColorEditPage>,
  ComponentPropsWithoutRef<'div'>
>((props, ref) => {
  const { primary, neutral: initialNeutral } = useBaseColors();
  const { neutral: editedNeutral } = useOptionsDrawer();

  const neutral =
    typeof editedNeutral === 'undefined' ? initialNeutral : editedNeutral;
  const neutralIsAuto = neutral === null,
    neutralIsSuggestion =
      typeof neutral === 'string' &&
      neutralColorSuggestionNames.includes(neutral);

  const themeNeutral = useMemo(
    () =>
      neutralIsSuggestion
        ? neutralColorSuggestions[neutral as NeutralColorSuggestion]?.(primary)
        : neutralIsAuto
          ? getAutoNeutralColor(primary)
          : neutral,
    [neutral, neutralIsAuto, neutralIsSuggestion, primary]
  );

  return (
    <ColorEditPage {...props} ref={ref} title='Neutral' color={themeNeutral}>
      <NeutralColorEditor />
    </ColorEditPage>
  );
});
NeutralColorEditPage.displayName = 'NeutralColorEditPage';
