import React, {
  forwardRef,
  useCallback,
  useMemo,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';

import { ColorEditPage } from './ColorEditPage';
import RadioListItem from '../RadioListItem';
import { Collapsible } from '@/components/ui/Collapsible';
import { List, ListSubheader } from '@/components/ui/List';
import { RadioGroup } from '@/components/ui/Radio';
import { Separator } from '@/components/ui/Separator';
import { ColorSuggestionsBox } from '@/components/colors';
import { useBaseColors } from '@/hooks/useBaseColors';
import { useOptionsDrawer } from '@/store/useOptionsDrawer';
import { getAutoDangerColor } from '@/lib/colorUtils';
import {
  dangerColorSuggestionNames,
  dangerColorSuggestions,
} from '@/constants/colorSuggestions';
import type { DangerColorSuggestion } from '@/types/defaultSuggestions';
import { DebouncedColorPicker } from './DebouncedColorPicker';

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

  const themeDanger = dangerIsSuggestion
    ? dangerColorSuggestions[danger as DangerColorSuggestion]?.(primary)
    : dangerIsAuto
      ? getAutoDangerColor(primary)
      : danger;

  const radioValue = useMemo(
    () =>
      dangerIsAuto
        ? 'auto'
        : dangerIsSuggestion
          ? 'suggestions'
          : dangerIsCustom
            ? 'custom'
            : undefined,
    [dangerIsAuto, dangerIsCustom, dangerIsSuggestion]
  );
  const handleRadioValueChange = useCallback(
    (newValue?: string) => {
      if (
        (newValue === 'auto' && !dangerIsAuto) ||
        (newValue === 'suggestions' && !dangerIsSuggestion) ||
        (newValue === 'custom' && !dangerIsCustom)
      )
        setDanger(
          newValue === 'suggestions'
            ? dangerColorSuggestionNames[0]
            : newValue === 'custom'
              ? getAutoDangerColor(primary)
              : null
        );
    },
    [dangerIsAuto, dangerIsCustom, dangerIsSuggestion, primary, setDanger]
  );

  return (
    <ColorEditPage {...props} ref={ref} title='Danger' color={themeDanger}>
      <RadioGroup
        asChild
        value={radioValue}
        onValueChange={handleRadioValueChange}
      >
        <List className='px-0'>
          <RadioListItem value='auto'>Auto</RadioListItem>
          <RadioListItem value='suggestions'>Suggestions</RadioListItem>
          <RadioListItem value='custom'>Custom</RadioListItem>

          <Collapsible asChild open={dangerIsSuggestion || dangerIsCustom}>
            <Separator />
          </Collapsible>

          <Collapsible open={dangerIsSuggestion}>
            <ListSubheader>Suggestions</ListSubheader>
            <ColorSuggestionsBox
              baseColor={primary}
              colorSuggestions={dangerColorSuggestions}
              value={danger as DangerColorSuggestion}
              onValueChange={setDanger}
            />
          </Collapsible>
          <Collapsible open={dangerIsCustom}>
            <div className='p-2'>
              <DebouncedColorPicker
                initialValue={danger || ''}
                onChange={setDanger}
              />
            </div>
          </Collapsible>
        </List>
      </RadioGroup>
    </ColorEditPage>
  );
});
DangerColorEditPage.displayName = 'DangerColorEditPage';
