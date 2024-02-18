import {
  Toolbar,
  ToolbarToggleGroup,
  ToolbarToggleItem,
} from '@radix-ui/react-toolbar';
import { CheckIcon } from 'lucide-react';

import { IconButton } from '@/components/ui/IconButton';
import { ListItem } from '@/components/ui/List';
import { isHexColorLight } from '@/lib/colorUtils';
import type { ColorSuggestions } from '@/types/colorSuggestions';

export const ColorSuggestionsBox = <T extends ColorSuggestions>({
  baseColor,
  colorSuggestions,
  value,
  onValueChange,
}: {
  baseColor: string;
  colorSuggestions: T;
  value?: keyof T;
  onValueChange?: (suggestionName: keyof T) => void;
}) => (
  <Toolbar className='py-2 pe-4 ps-[3.25rem]'>
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
      {Object.keys(colorSuggestions).map(suggestionName => {
        const color = colorSuggestions[suggestionName as keyof T]?.(baseColor);
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
