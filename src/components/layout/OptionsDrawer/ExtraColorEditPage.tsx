import {
  forwardRef,
  useCallback,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';

import { ColorEditPage } from './ColorEditPage';
import { DebouncedColorPicker } from './DebouncedColorPicker';
import RadioListItem from '../RadioListItem';
import { Collapsible } from '@/components/ui/Collapsible';
import { Input } from '@/components/ui/Input';
import { List, ListItem } from '@/components/ui/List';
import { RadioGroup } from '@/components/ui/Radio';
import { Separator } from '@/components/ui/Separator';
import { ColorSuggestionsBox } from '@/components/colors';
import { useBaseColors } from '@/hooks/useBaseColors';
import { useOptionsDrawer } from '@/store/useOptionsDrawer';
import {
  generalColorSuggestionNames,
  generalColorSuggestions,
} from '@/constants';
import type { GeneralColorSuggestion } from '@/types/defaultSuggestions';

type ExtraColorEditPageProps = ComponentPropsWithoutRef<'div'> & {
  index: number;
};

export const ExtraColorEditPage = forwardRef<
  ElementRef<typeof ColorEditPage>,
  ExtraColorEditPageProps
>(({ index, ...props }, ref) => {
  const { primary, extras: baseExtras } = useBaseColors(),
    {
      extras: editedExtras,
      renameExtraColor,
      setExtraColor,
    } = useOptionsDrawer();

  const { name, value } = editedExtras?.[index] || baseExtras[index];
  const title = name || `Extra ${index + 1}`;

  const colorIsSuggestion = generalColorSuggestionNames.includes(value),
    colorIsCustom = !generalColorSuggestionNames.includes(value);

  const radioValue = colorIsSuggestion ? 'suggestions' : 'custom';
  const themeValue = colorIsSuggestion
    ? generalColorSuggestions[value as GeneralColorSuggestion]?.(primary)
    : value;

  const handleValueChange = useCallback(
    (newValue?: string) =>
      ((newValue === 'suggestions' && !colorIsSuggestion) ||
        (newValue === 'custom' && !colorIsCustom)) &&
      setExtraColor(
        index,
        newValue === 'suggestions'
          ? generalColorSuggestionNames[
              index % generalColorSuggestionNames.length
            ]
          : generalColorSuggestions[value as GeneralColorSuggestion](primary)
      ),
    [colorIsCustom, colorIsSuggestion, index, primary, setExtraColor, value]
  );

  return (
    <ColorEditPage {...props} ref={ref} title={title} color={themeValue}>
      <List
        className='px-0 [&>li:first-of-type]:mb-2
[&>li:first-of-type]:mt-[2px]'
      >
        <ListItem asChild>
          <Input
            label='Name'
            value={name || ''}
            onChange={e => renameExtraColor(index, e.target.value)}
          />
        </ListItem>
        <RadioGroup value={radioValue} onValueChange={handleValueChange}>
          <RadioListItem value='suggestions'>Suggestions</RadioListItem>
          <RadioListItem value='custom'>Custom</RadioListItem>
        </RadioGroup>
        <Separator />
        <Collapsible open={colorIsSuggestion}>
          <ColorSuggestionsBox
            baseColor={primary}
            colorSuggestions={generalColorSuggestions}
            value={value as GeneralColorSuggestion}
            onValueChange={suggestionName =>
              setExtraColor(index, suggestionName)
            }
            className='pe-4 ps-[3.25rem]'
          />
        </Collapsible>
        <Collapsible open={colorIsCustom}>
          <div className='mt-2'>
            <DebouncedColorPicker
              initialValue={value || ''}
              onChange={newColor => setExtraColor(index, newColor)}
            />
          </div>
        </Collapsible>
      </List>
    </ColorEditPage>
  );
});
ExtraColorEditPage.displayName = 'ExtraColorEditPage';
