import React, { useCallback, useMemo } from 'react';

import { DebouncedColorPicker } from './DebouncedColorPicker';
import { ListSubheader } from '@/components/ui/List';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import {
  ColorSuggestionButton,
  ColorSuggestionsBox,
} from '@/components/layout/ColorSuggestions';
import { useBaseColors } from '@/hooks/useBaseColors';
import { useModal } from '@/hooks/useModal';
import { useOptionsDrawer } from '@/store/useOptionsDrawer';
import { getAutoNeutralColor } from '@/lib/colorUtils';
import {
  neutralColorSuggestionNames,
  neutralColorSuggestions,
} from '@/constants/colorSuggestions';
import {
  MODAL_BASECOLORS_EDIT,
  MODAL_BASECOLORS_LIST,
} from '@/constants/modalSearchParams';
import type { NeutralColorSuggestion } from '@/types/defaultSuggestions';

export const NeutralColorEditor = () => {
  const { primary, neutral: initialNeutral, setNeutral } = useBaseColors();
  const { neutral: drawerNeutral, setNeutral: setDrawerNeutral } =
    useOptionsDrawer();

  const { currentModal } = useModal(),
    isDrawerEditor =
      currentModal === MODAL_BASECOLORS_LIST ||
      currentModal?.startsWith(MODAL_BASECOLORS_EDIT);

  const neutral =
    typeof drawerNeutral === 'undefined' ? initialNeutral : drawerNeutral;
  const neutralIsAuto = neutral === null,
    neutralIsSuggestion =
      typeof neutral === 'string' &&
      neutralColorSuggestionNames.includes(neutral),
    neutralIsCustom =
      typeof neutral === 'string' &&
      !neutralColorSuggestionNames.includes(neutral);

  const themeNeutral = useMemo(() => {
    if (neutralIsSuggestion)
      return neutralColorSuggestions[neutral as NeutralColorSuggestion]?.(
        primary
      );
    if (neutralIsAuto) return getAutoNeutralColor(primary);
    return neutral;
  }, [neutral, neutralIsAuto, neutralIsSuggestion, primary]);

  const handleValueChange = useCallback(
    (newValue: string) => {
      if (neutral === newValue) return;
      const setValue = isDrawerEditor ? setDrawerNeutral : setNeutral;
      setValue(newValue === 'auto' ? null : newValue);
    },
    [isDrawerEditor, neutral, setDrawerNeutral, setNeutral]
  );

  return (
    <Tabs defaultValue={neutralIsCustom ? 'custom' : 'suggestions'}>
      <TabsList className='grid w-full grid-cols-2'>
        <TabsTrigger value='suggestions'>Suggestions</TabsTrigger>
        <TabsTrigger value='custom'>Custom</TabsTrigger>
      </TabsList>
      <TabsContent value='suggestions'>
        <ColorSuggestionsBox
          value={neutral || 'auto'}
          onValueChange={handleValueChange}
          className='p-0 [&>span]:col-span-full [&>span]:px-1'
        >
          <ListSubheader>Auto</ListSubheader>
          <ColorSuggestionButton
            value='auto'
            color={getAutoNeutralColor(primary)}
          />
          <ListSubheader>Neutral suggestions</ListSubheader>
          {Object.entries(neutralColorSuggestions).map(([value, variantFn]) => (
            <ColorSuggestionButton
              key={value}
              value={value}
              color={variantFn(primary)}
            />
          ))}
        </ColorSuggestionsBox>
      </TabsContent>
      <TabsContent value='custom'>
        <DebouncedColorPicker
          initialValue={themeNeutral}
          onChange={handleValueChange}
          autoFocusInput={!isDrawerEditor}
        />
      </TabsContent>
    </Tabs>
  );
};
