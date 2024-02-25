import {
  Toolbar,
  ToolbarToggleGroup,
  ToolbarToggleItem,
  type ToolbarProps,
} from '@radix-ui/react-toolbar';
import { CheckIcon } from 'lucide-react';

import { IconButton } from '@/components/ui/IconButton';
import { ListItem } from '@/components/ui/List';
import { isHexColorLight } from '@/lib/colorUtils';
import type { ColorSuggestions } from '@/types/colorSuggestions';
import { cn } from '@/lib/utils';

export type ColorSuggestionsBoxProps<T extends ColorSuggestions> =
  ToolbarProps & {
    baseColor: string;
    colorSuggestions: T;
    value?: keyof T;
    onValueChange?: (suggestionName: keyof T) => void;
  };

export const ColorSuggestionsBox = <T extends ColorSuggestions>({
  baseColor,
  colorSuggestions,
  value,
  onValueChange,
  className,
  ...props
}: ColorSuggestionsBoxProps<T>) => (
  <Toolbar {...props} className={cn('p-2', className)}>
    <ToolbarToggleGroup
      type='single'
      value={value as string}
      onValueChange={suggestionName =>
        typeof suggestionName === 'string' &&
        suggestionName.length > 0 &&
        onValueChange?.(suggestionName)
      }
      className='grid grid-cols-[repeat(auto-fill,minmax(3rem,1fr))] gap-2
md:grid-cols-[repeat(auto-fill,minmax(2.5rem,1fr))]'
    >
      {Object.entries(colorSuggestions).map(([suggestionName, variantFn]) => {
        const color = variantFn(baseColor);
        return (
          <ListItem asChild key={suggestionName}>
            <ToolbarToggleItem asChild value={suggestionName}>
              <IconButton
                className={cn(
                  'aspect-square h-auto w-full text-lg',
                  isHexColorLight(color) ? 'text-black' : 'text-white'
                )}
                style={{ backgroundColor: color }}
              >
                {value === suggestionName && <CheckIcon />}
              </IconButton>
            </ToolbarToggleItem>
          </ListItem>
        );
      })}
    </ToolbarToggleGroup>
  </Toolbar>
);
