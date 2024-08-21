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
import { getAutoDangerColor } from '@/lib/colorUtils';
import {
  dangerColorSuggestionNames,
  dangerColorSuggestions,
} from '@/constants/colorSuggestions';
import {
  MODAL_BASECOLORS_EDIT,
  MODAL_BASECOLORS_LIST,
} from '@/constants/modalSearchParams';
import type { DangerColorSuggestion } from '@/types/defaultSuggestions';

export const DangerColorEditor = () => {
  const { primary, danger: initialDanger, setDanger } = useBaseColors();
  const { danger: drawerDanger, setDanger: setDrawerDanger } =
    useOptionsDrawer();

  const { currentModal } = useModal(),
    isDrawerEditor =
      currentModal === MODAL_BASECOLORS_LIST ||
      currentModal?.startsWith(MODAL_BASECOLORS_EDIT);

  const danger =
    typeof drawerDanger === 'undefined' ? initialDanger : drawerDanger;
  const dangerIsAuto = danger === null,
    dangerIsSuggestion =
      typeof danger === 'string' && dangerColorSuggestionNames.includes(danger),
    dangerIsCustom =
      typeof danger === 'string' &&
      !dangerColorSuggestionNames.includes(danger);

  const themeDanger = useMemo(() => {
    if (dangerIsSuggestion)
      return dangerColorSuggestions[danger as DangerColorSuggestion]?.(primary);
    if (dangerIsAuto) return getAutoDangerColor(primary);
    return danger;
  }, [danger, dangerIsAuto, dangerIsSuggestion, primary]);

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
          autoFocusInput={!isDrawerEditor}
        />
      </TabsContent>
    </Tabs>
  );
};
