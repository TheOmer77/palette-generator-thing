import React, { useCallback, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

import { DebouncedColorPicker } from '@/components/layout/BaseColors';
import { ListSubheader } from '@/components/ui/List';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import {
  ColorSuggestionButton,
  ColorSuggestionsBox,
} from '@/components/layout/ColorSuggestions';
import { useBaseColors } from '@/hooks/useBaseColors';
import { useOptionsDrawer } from '@/store/useOptionsDrawer';
import { getAutoDangerColor } from '@/lib/colorUtils';
import {
  dangerColorSuggestionNames,
  dangerColorSuggestions,
} from '@/constants/colorSuggestions';
import {
  MODAL_BASECOLORS_EDIT,
  MODAL_BASECOLORS_LIST,
  MODAL_SEARCH_KEY,
} from '@/constants/modalSearchParams';
import type { DangerColorSuggestion } from '@/types/defaultSuggestions';

export const DangerColorEditor = () => {
  const { primary, danger: initialDanger, setDanger } = useBaseColors();
  const { danger: drawerDanger, setDanger: setDrawerDanger } =
    useOptionsDrawer();

  const searchParams = useSearchParams(),
    isDrawerEditor =
      searchParams.get(MODAL_SEARCH_KEY) === MODAL_BASECOLORS_LIST ||
      searchParams.get(MODAL_SEARCH_KEY)?.startsWith(MODAL_BASECOLORS_EDIT);

  const danger =
    typeof drawerDanger === 'undefined' ? initialDanger : drawerDanger;
  const dangerIsAuto = danger === null,
    dangerIsSuggestion =
      typeof danger === 'string' && dangerColorSuggestionNames.includes(danger),
    dangerIsCustom =
      typeof danger === 'string' &&
      !dangerColorSuggestionNames.includes(danger);

  const themeDanger = useMemo(
    () =>
      dangerIsSuggestion
        ? dangerColorSuggestions[danger as DangerColorSuggestion]?.(primary)
        : dangerIsAuto
          ? getAutoDangerColor(primary)
          : danger,
    [danger, dangerIsAuto, dangerIsSuggestion, primary]
  );

  const handleValueChange = useCallback(
    (newValue: string) => {
      if (danger === newValue) return;
      const setValue = isDrawerEditor ? setDrawerDanger : setDanger;
      setValue(newValue === 'auto' ? null : newValue);
    },
    [danger, isDrawerEditor, setDanger, setDrawerDanger]
  );

  return (
    <Tabs defaultValue={dangerIsCustom ? 'custom' : 'suggestions'}>
      <TabsList className='grid w-full grid-cols-2'>
        <TabsTrigger value='suggestions'>Suggestions</TabsTrigger>
        <TabsTrigger value='custom'>Custom</TabsTrigger>
      </TabsList>
      <TabsContent value='suggestions'>
        <ColorSuggestionsBox
          value={danger || 'auto'}
          onValueChange={handleValueChange}
          className='p-0 [&>span]:col-span-full [&>span]:px-1'
        >
          <ListSubheader>Auto</ListSubheader>
          <ColorSuggestionButton
            value='auto'
            color={getAutoDangerColor(primary)}
          />
          <ListSubheader>Danger suggestions</ListSubheader>
          {Object.entries(dangerColorSuggestions).map(([value, variantFn]) => (
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
          initialValue={themeDanger}
          onChange={handleValueChange}
          focusInput={isDrawerEditor}
        />
      </TabsContent>
    </Tabs>
  );
};
