import React, {
  forwardRef,
  useCallback,
  useMemo,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';

import { ColorEditPage } from './ColorEditPage';
import { DebouncedColorPicker } from '@/components/layout/BaseColors';
import { ListSubheader } from '@/components/ui/List';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import {
  ColorSuggestion,
  ColorSuggestionsBox,
} from '@/components/layout/ColorSuggestions';
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
  const { danger: editedDanger, setDanger } = useOptionsDrawer();

  const danger =
    typeof editedDanger === 'undefined' ? initialDanger : editedDanger;
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
      setDanger(newValue === 'auto' ? null : newValue);
    },
    [danger, setDanger]
  );

  return (
    <ColorEditPage {...props} ref={ref} title='Danger' color={themeDanger}>
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
            <ColorSuggestion value='auto' color={getAutoDangerColor(primary)} />
            <ListSubheader>Danger suggestions</ListSubheader>
            {Object.entries(dangerColorSuggestions).map(
              ([value, variantFn]) => (
                <ColorSuggestion
                  key={value}
                  value={value}
                  color={variantFn(primary)}
                />
              )
            )}
          </ColorSuggestionsBox>
        </TabsContent>
        <TabsContent value='custom'>
          <DebouncedColorPicker
            initialValue={themeDanger}
            onChange={handleValueChange}
          />
        </TabsContent>
      </Tabs>
    </ColorEditPage>
  );
});
DangerColorEditPage.displayName = 'DangerColorEditPage';
