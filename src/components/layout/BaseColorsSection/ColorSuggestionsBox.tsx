import {
  Toolbar,
  ToolbarToggleGroup,
  ToolbarToggleItem,
} from '@radix-ui/react-toolbar';

import { IconButton, ListItem } from 'components/general';
import { DoneIcon } from 'assets/icons';
import { isHexColorLight } from 'utils';
import type { ColorSuggestions } from 'constants/colorSuggestions';

const ColorSuggestionsBox = <T extends ColorSuggestions>({
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
      onValueChange={onValueChange}
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
                {value === suggestionName && <DoneIcon />}
              </IconButton>
            </ToolbarToggleItem>
          </ListItem>
        );
      })}
    </ToolbarToggleGroup>
  </Toolbar>
);

export default ColorSuggestionsBox;
