import React, {
  forwardRef,
  useCallback,
  useMemo,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';

import { ColorEditPage } from './ColorEditPage';
import RadioListItem from '../RadioListItem';
// TODO: Move this file
import ColorSuggestionsBox from '../BaseColorsSection/ColorSuggestionsBox';
import { Collapsible } from '@/components/ui/Collapsible';
import { List, ListItem } from '@/components/ui/List';
import { RadioGroup } from '@/components/ui/Radio';
import { ColorInput } from '@/components/colors';
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

  const themeNeutral = neutralIsSuggestion
    ? neutralColorSuggestions[neutral as NeutralColorSuggestion]?.(primary)
    : neutralIsAuto
      ? getAutoNeutralColor(primary)
      : neutral;

  const radioValue = useMemo(
    () =>
      neutralIsAuto
        ? 'auto'
        : neutralIsSuggestion
          ? 'suggestions'
          : neutralIsCustom
            ? 'custom'
            : undefined,
    [neutralIsAuto, neutralIsCustom, neutralIsSuggestion]
  );
  const handleRadioValueChange = useCallback(
    (newValue?: string) => {
      if (
        (newValue === 'auto' && !neutralIsAuto) ||
        (newValue === 'suggestions' && !neutralIsSuggestion) ||
        (newValue === 'custom' && !neutralIsCustom)
      )
        setNeutral(
          newValue === 'suggestions'
            ? neutralColorSuggestionNames[0]
            : newValue === 'custom'
              ? getAutoNeutralColor(primary)
              : null
        );
    },
    [neutralIsAuto, neutralIsCustom, neutralIsSuggestion, primary, setNeutral]
  );

  return (
    <ColorEditPage {...props} ref={ref} title='Neutral' color={themeNeutral}>
      <RadioGroup
        asChild
        value={radioValue}
        onValueChange={handleRadioValueChange}
      >
        <List className='px-0'>
          <RadioListItem value='auto'>Auto</RadioListItem>
          <RadioListItem value='suggestions'>Suggestions</RadioListItem>
          <RadioListItem value='custom'>Custom</RadioListItem>

          <Collapsible open={neutralIsSuggestion}>
            <ColorSuggestionsBox
              baseColor={primary}
              colorSuggestions={neutralColorSuggestions}
              value={neutral as NeutralColorSuggestion}
              onValueChange={setNeutral}
            />
          </Collapsible>
          <Collapsible open={neutralIsCustom}>
            <div className='p-2'>
              <ListItem asChild>
                <ColorInput
                  id='input-neutral-color'
                  value={neutral || ''}
                  onChange={setNeutral}
                  withRandomBtn
                />
              </ListItem>
            </div>
          </Collapsible>
        </List>
      </RadioGroup>
    </ColorEditPage>
  );
});
NeutralColorEditPage.displayName = 'NeutralColorEditPage';
