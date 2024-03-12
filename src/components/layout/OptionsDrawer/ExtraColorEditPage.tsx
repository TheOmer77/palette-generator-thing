import {
  forwardRef,
  useCallback,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import { TrashIcon } from 'lucide-react';

import { ColorEditPage } from './ColorEditPage';
import { DebouncedColorPicker } from './DebouncedColorPicker';
import { Input } from '@/components/ui/Input';
import {
  List,
  ListItem,
  ListItemIcon,
  ListSubheader,
} from '@/components/ui/List';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import {
  ColorSuggestion,
  ColorSuggestionsBox,
} from '@/components/layout/ColorSuggestions';
import { useBaseColors } from '@/hooks/useBaseColors';
import { useOptionsDrawer } from '@/store/useOptionsDrawer';
import { cn } from '@/lib/utils';
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
>(({ index, className, ...props }, ref) => {
  const { primary, extras: baseExtras } = useBaseColors(),
    {
      extras: editedExtras,
      removeExtraColor,
      renameExtraColor,
      setExtraColor,
    } = useOptionsDrawer();

  const { name, value } = editedExtras?.[index] || baseExtras[index];
  const title = name || `Extra ${index + 1}`;

  const colorIsSuggestion = generalColorSuggestionNames.includes(value),
    colorIsCustom = !generalColorSuggestionNames.includes(value);

  const themeValue = colorIsSuggestion
    ? generalColorSuggestions[value as GeneralColorSuggestion]?.(primary)
    : value;

  const handleValueChange = useCallback(
    (newValue: string) => {
      if (value === newValue) return;
      setExtraColor(index, newValue);
    },
    [index, setExtraColor, value]
  );

  const handleRemove = useCallback(() => {
    setTimeout(() => removeExtraColor(index), 90);
    window.history.back();
  }, [index, removeExtraColor]);

  return (
    <ColorEditPage
      {...props}
      ref={ref}
      title={title}
      color={themeValue}
      className={cn(
        `[&_[data-radix-scroll-area-viewport]]:pb-[4.5rem]
[&_[data-radix-scroll-area-viewport]]:pt-[1px] [&_[data-scroll-bar]]:z-10`,
        className
      )}
    >
      <Input
        label='Name'
        value={name || ''}
        onChange={e => renameExtraColor(index, e.target.value)}
      />
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
    </ColorEditPage>
  );
});
ExtraColorEditPage.displayName = 'ExtraColorEditPage';
