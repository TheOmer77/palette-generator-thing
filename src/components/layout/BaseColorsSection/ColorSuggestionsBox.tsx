import { IconButton } from 'components/general';
import { DoneIcon } from 'assets/icons';
import { isHexColorLight } from 'utils';
import type { ColorSuggestions } from 'constants/colorSuggestions';

const ColorSuggestionsBox = <T extends ColorSuggestions>({
  baseColor,
  colorSuggestions,
  selectedSuggestion,
  onSuggestionSelect,
}: {
  baseColor: string;
  colorSuggestions: T;
  selectedSuggestion?: keyof T;
  onSuggestionSelect?: (suggestionName: keyof T) => void;
}) => (
  <div className='flex flex-row flex-wrap gap-2 py-2 pe-4 ps-[3.25rem]'>
    {Object.keys(colorSuggestions).map(suggestionName => {
      const color = colorSuggestions[suggestionName as keyof T]?.(baseColor);
      return (
        <IconButton
          key={suggestionName}
          className={isHexColorLight(color) ? 'text-black' : 'text-white'}
          style={{ backgroundColor: color }}
          onClick={() => onSuggestionSelect?.(suggestionName)}
        >
          {selectedSuggestion === suggestionName && <DoneIcon />}
        </IconButton>
      );
    })}
  </div>
);

export default ColorSuggestionsBox;
