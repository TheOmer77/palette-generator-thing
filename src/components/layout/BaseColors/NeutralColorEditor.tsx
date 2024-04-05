import React, { useCallback, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

import { DebouncedColorPicker } from '@/components/layout/BaseColors';
import { ListSubheader } from '@/components/ui/List';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import {
  ColorSuggestion,
  ColorSuggestionsBox,
} from '@/components/layout/ColorSuggestions';
import { useBaseColors } from '@/hooks/useBaseColors';
import { useOptionsDrawer } from '@/store/useOptionsDrawer';
import { getAutoNeutralColor } from '@/lib/colorUtils';
import {
  neutralColorSuggestionNames,
  neutralColorSuggestions,
} from '@/constants/colorSuggestions';
import type { NeutralColorSuggestion } from '@/types/defaultSuggestions';
import {
  MODAL_BASECOLORS_EDIT,
  MODAL_SEARCH_KEY,
} from '@/constants/modalSearchParams';

export const NeutralColorEditor = () => {
  const { primary, neutral: initialNeutral, setNeutral } = useBaseColors();
  const { neutral: drawerNeutral, setNeutral: setDrawerNeutral } =
    useOptionsDrawer();

  const searchParams = useSearchParams(),
    isDrawerEditor = searchParams
      .get(MODAL_SEARCH_KEY)
      ?.startsWith(MODAL_BASECOLORS_EDIT);

  const neutral =
    typeof drawerNeutral === 'undefined' ? initialNeutral : drawerNeutral;
  const neutralIsAuto = neutral === null,
    neutralIsSuggestion =
      typeof neutral === 'string' &&
      neutralColorSuggestionNames.includes(neutral),
    neutralIsCustom =
      typeof neutral === 'string' &&
      !neutralColorSuggestionNames.includes(neutral);

  const themeNeutral = useMemo(
    () =>
      neutralIsSuggestion
        ? neutralColorSuggestions[neutral as NeutralColorSuggestion]?.(primary)
        : neutralIsAuto
          ? getAutoNeutralColor(primary)
          : neutral,
    [neutral, neutralIsAuto, neutralIsSuggestion, primary]
  );

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
          <ColorSuggestion value='auto' color={getAutoNeutralColor(primary)} />
          <ListSubheader>Neutral suggestions</ListSubheader>
          {Object.entries(neutralColorSuggestions).map(([value, variantFn]) => (
            <ColorSuggestion
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
        />
      </TabsContent>
    </Tabs>
  );
};
