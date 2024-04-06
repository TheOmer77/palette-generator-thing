import { useCallback } from 'react';
import { TrashIcon } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

import { DebouncedColorPicker } from '@/components/layout/BaseColors';
import { Input } from '@/components/ui/Input';
import {
  List,
  ListItem,
  ListItemIcon,
  ListSubheader,
} from '@/components/ui/List';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import {
  ColorSuggestionButton,
  ColorSuggestionsBox,
} from '@/components/layout/ColorSuggestions';
import { useBaseColors } from '@/hooks/useBaseColors';
import { useOptionsDrawer } from '@/store/useOptionsDrawer';
import { toCamelCase } from '@/lib/utils';
import {
  generalColorSuggestionNames,
  generalColorSuggestions,
} from '@/constants';
import {
  ERROR_DUPLICATE_NAME,
  ERROR_RESERVED_NAME,
  BASE_COLOR_RESERVED_NAMES,
} from '@/constants/baseColors';
import {
  MODAL_BASECOLORS_EDIT,
  MODAL_BASECOLORS_LIST,
  MODAL_SEARCH_KEY,
} from '@/constants/modalSearchParams';
import type { GeneralColorSuggestion } from '@/types/defaultSuggestions';

export type ExtraColorEditorProps = {
  index: number;
};

export const ExtraColorEditor = ({ index }: ExtraColorEditorProps) => {
  const { primary, extras, removeExtraColor, renameExtraColor, setExtraColor } =
      useBaseColors(),
    {
      extras: drawerExtras,
      removeExtraColor: removeDrawerExtraColor,
      renameExtraColor: renameDrawerExtraColor,
      setExtraColor: setDrawerExtraColor,
    } = useOptionsDrawer();

  const { name, value } = drawerExtras?.[index] || extras[index];

  const searchParams = useSearchParams(),
    isDrawerEditor =
      searchParams.get(MODAL_SEARCH_KEY) === MODAL_BASECOLORS_LIST ||
      searchParams.get(MODAL_SEARCH_KEY)?.startsWith(MODAL_BASECOLORS_EDIT);

  const colorIsSuggestion = generalColorSuggestionNames.includes(value),
    colorIsCustom = !generalColorSuggestionNames.includes(value);
  const nameIsReserved =
      typeof name === 'string' &&
      BASE_COLOR_RESERVED_NAMES.includes(toCamelCase(name)),
    nameIsDuplicate =
      typeof name === 'string' &&
      name.length > 0 &&
      extras.filter(
        ({ name: n }) =>
          typeof n === 'string' &&
          toCamelCase(n).toLowerCase() === toCamelCase(name).toLowerCase()
      ).length > 1;

  const themeValue = colorIsSuggestion
    ? generalColorSuggestions[value as GeneralColorSuggestion]?.(primary)
    : value;

  const handleValueChange = useCallback(
    (newValue: string) => {
      if (value === newValue) return;
      const setValue = isDrawerEditor ? setDrawerExtraColor : setExtraColor;
      setValue(index, newValue);
    },
    [index, isDrawerEditor, setDrawerExtraColor, setExtraColor, value]
  );

  const handleRename = useCallback(
    (value: string) => {
      const renameColor = isDrawerEditor
        ? renameDrawerExtraColor
        : renameExtraColor;
      renameColor(index, value);
    },
    [index, isDrawerEditor, renameDrawerExtraColor, renameExtraColor]
  );

  const handleRemove = useCallback(() => {
    const removeColor = isDrawerEditor
      ? removeDrawerExtraColor
      : removeExtraColor;
    setTimeout(() => removeColor(index), 90);
    window.history.back();
  }, [index, isDrawerEditor, removeDrawerExtraColor, removeExtraColor]);

  return (
    <>
      <Input
        label='Name'
        value={name || ''}
        onChange={e => handleRename(e.target.value)}
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
      <Tabs
        defaultValue={colorIsCustom ? 'custom' : 'suggestions'}
        className='mt-2'
      >
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='suggestions'>Suggestions</TabsTrigger>
          <TabsTrigger value='custom'>Custom</TabsTrigger>
        </TabsList>
        <TabsContent value='suggestions'>
          <ColorSuggestionsBox
            value={value || 'auto'}
            onValueChange={handleValueChange}
            className='p-0 [&>span]:col-span-full [&>span]:px-1'
          >
            <ListSubheader>Extra color suggestions</ListSubheader>
            {Object.entries(generalColorSuggestions).map(
              ([value, variantFn]) => (
                <ColorSuggestionButton
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
            initialValue={themeValue}
            onChange={handleValueChange}
          />
        </TabsContent>
      </Tabs>
      <List
        className='absolute inset-x-0 bottom-0 z-10 justify-center
bg-background p-2 dark:bg-card'
      >
        <ListItem onClick={handleRemove}>
          <ListItemIcon>
            <TrashIcon />
          </ListItemIcon>
          Remove
        </ListItem>
      </List>
    </>
  );
};
