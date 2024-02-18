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
      className='flex flex-row flex-wrap gap-2'
    >
      {Object.entries(colorSuggestions).map(([suggestionName, variantFn]) => {
        const color = variantFn(baseColor);
        return (
          <ListItem asChild key={suggestionName}>
            <ToolbarToggleItem asChild value={suggestionName}>
              <IconButton
                className={isHexColorLight(color) ? 'text-black' : 'text-white'}
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
