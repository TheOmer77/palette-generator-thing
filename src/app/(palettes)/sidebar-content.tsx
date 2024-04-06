'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CodeIcon, PlusIcon, TrashIcon } from 'lucide-react';

import { Collapsible } from '@/components/ui/Collapsible';
import { ColorInput } from '@/components/ui/ColorInput';
import { Input } from '@/components/ui/Input';
import { List, ListItem, ListItemIcon } from '@/components/ui/List';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';
import { RadioGroup } from '@/components/ui/Radio';
import { Separator } from '@/components/ui/Separator';
import {
  ColorListItem,
  DangerColorEditor,
  NeutralColorEditor,
  PrimaryColorEditor,
} from '@/components/layout/BaseColors';
import {
  ColorSuggestionButton,
  ColorSuggestionsBox,
} from '@/components/layout/ColorSuggestions';
import RadioListItem from '@/components/layout/RadioListItem';
import { useBaseColors } from '@/hooks/useBaseColors';
import { useTheme } from '@/hooks/useTheme';
import { toCamelCase } from '@/lib/utils';
import {
  generalColorSuggestionNames,
  generalColorSuggestions,
} from '@/constants';
import type { GeneralColorSuggestion } from '@/types/defaultSuggestions';

const RESERVED_COLOR_NAMES = ['primary', 'neutral', 'danger'];
const ERROR_RESERVED_NAME = 'This name is reserved.',
  ERROR_DUPLICATE_NAME = "This name can't be used by multiple colors.";

export const PalettesSidebarContent = () => {
  const {
      primary,
      extras,
      addExtraColor,
      removeExtraColor,
      renameExtraColor,
      setExtraColor,
    } = useBaseColors(),
    themeColors = useTheme();
  const searchParams = useSearchParams();

  return (
    <List>
      <Popover modal>
        <PopoverTrigger asChild>
          <ColorListItem color={themeColors.primary} title='Primary' />
        </PopoverTrigger>
        <PopoverContent side='right' align='start'>
          <PrimaryColorEditor />
        </PopoverContent>
      </Popover>

      <Popover modal>
        <PopoverTrigger asChild>
          <ColorListItem
            value='neutral'
            color={themeColors.neutral}
            title='Neutral'
          />
        </PopoverTrigger>
        <PopoverContent side='right' align='start'>
          <NeutralColorEditor />
        </PopoverContent>
      </Popover>

      <Popover modal>
        <PopoverTrigger asChild>
          <ColorListItem
            value='danger'
            color={themeColors.danger}
            title='Danger'
          />
        </PopoverTrigger>
        <PopoverContent side='right' align='start'>
          <DangerColorEditor />
        </PopoverContent>
      </Popover>

      <Separator />
      {extras.map(({ name, value }, index) => {
        const id = `extra${index + 1}`,
          title = name || `Extra ${index + 1}`;
        const colorIsSuggestion = generalColorSuggestionNames.includes(value),
          colorIsCustom = !generalColorSuggestionNames.includes(value);
        const nameIsReserved =
            typeof name === 'string' &&
            RESERVED_COLOR_NAMES.includes(toCamelCase(name)),
          nameIsDuplicate =
            typeof name === 'string' &&
            name.length > 0 &&
            extras.filter(
              ({ name: n }) =>
                typeof n === 'string' &&
                toCamelCase(n).toLowerCase() === toCamelCase(name).toLowerCase()
            ).length > 1;

        return (
          <Popover modal key={id}>
            <PopoverTrigger asChild>
              <ColorListItem
                value={id}
                color={themeColors.extras[index].value}
                title={title}
              />
            </PopoverTrigger>
            <PopoverContent
              side='right'
              align='start'
              // TODO: Remove classname when using ExtraColorEditor
              className='[&_li]:list-none'
            >
              <Input
                label='Name'
                value={name || ''}
                onChange={e => renameExtraColor(index, e.target.value)}
                invalid={nameIsReserved || nameIsDuplicate}
              />
              {(nameIsReserved || nameIsDuplicate) && (
                <div
                  className='mt-1 w-full select-none px-1 text-xs
text-danger-600 dark:text-danger-300'
                >
                  {nameIsReserved ? ERROR_RESERVED_NAME : ERROR_DUPLICATE_NAME}
                </div>
              )}
              <RadioGroup
                className='my-2'
                value={colorIsSuggestion ? 'suggestions' : 'custom'}
                onValueChange={newValue =>
                  ((newValue === 'suggestions' && !colorIsSuggestion) ||
                    (newValue === 'custom' && !colorIsCustom)) &&
                  setExtraColor(
                    index,
                    newValue === 'suggestions'
                      ? generalColorSuggestionNames[
                          index % generalColorSuggestionNames.length
                        ]
                      : generalColorSuggestions[
                          value as GeneralColorSuggestion
                        ](primary)
                  )
                }
              >
                <RadioListItem value='suggestions'>Suggestions</RadioListItem>
                <Collapsible open={colorIsSuggestion}>
                  <ColorSuggestionsBox
                    value={value as GeneralColorSuggestion}
                    onValueChange={suggestionName =>
                      setExtraColor(index, suggestionName)
                    }
                    className='pe-4 ps-[3.25rem]'
                  >
                    {Object.entries(generalColorSuggestions).map(
                      ([value, variantFn]) => (
                        <ListItem key={value} asChild unstyled>
                          <ColorSuggestionButton
                            value={value}
                            color={variantFn(primary)}
                          />
                        </ListItem>
                      )
                    )}
                  </ColorSuggestionsBox>
                </Collapsible>
                <RadioListItem value='custom'>Custom</RadioListItem>
                <Collapsible open={colorIsCustom}>
                  <ColorInput
                    id={`input-extra-color-${index}`}
                    value={value || ''}
                    onChange={newColor => setExtraColor(index, newColor)}
                    withRandomBtn
                  />
                </Collapsible>
              </RadioGroup>
              <ListItem onClick={() => removeExtraColor(index)}>
                <ListItemIcon>
                  <TrashIcon />
                </ListItemIcon>
                Remove
              </ListItem>
            </PopoverContent>
          </Popover>
        );
      })}
      <ListItem onClick={addExtraColor} className='mb-2'>
        <ListItemIcon>
          <PlusIcon />
        </ListItemIcon>
        <span>Add extra color</span>
      </ListItem>

      {/* Temporary until site nav is implemented */}
      <div
        className='absolute inset-x-0 bottom-0 z-10 flex h-14 flex-col
        justify-center bg-card px-2'
      >
        <ListItem asChild>
          <Link href={`/codegen?${searchParams.toString()}`} scroll={false}>
            <ListItemIcon>
              <CodeIcon />
            </ListItemIcon>
            <span>Export as code</span>
          </Link>
        </ListItem>
      </div>
    </List>
  );
};
