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
  const { neutral: editedNeutral, setNeutral } = useOptionsDrawer();

  const neutral =
    typeof editedNeutral === 'undefined' ? initialNeutral : editedNeutral;
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
      setNeutral(newValue === 'auto' ? null : newValue);
    },
    [neutral, setNeutral]
  );

  return (
    <ColorEditPage {...props} ref={ref} title='Neutral' color={themeNeutral}>
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
            <ColorSuggestion
              value='auto'
              color={getAutoNeutralColor(primary)}
            />
            <ListSubheader>Neutral suggestions</ListSubheader>
            {Object.entries(neutralColorSuggestions).map(
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
            initialValue={themeNeutral}
            onChange={handleValueChange}
          />
        </TabsContent>
      </Tabs>
    </ColorEditPage>
  );
});
NeutralColorEditPage.displayName = 'NeutralColorEditPage';
