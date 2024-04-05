import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import { ToggleGroupItem } from '@radix-ui/react-toggle-group';
import { CheckIcon } from 'lucide-react';

import { IconButton } from '@/components/ui/IconButton';
import { isHexColorLight } from '@/lib/colorUtils';
import { cn } from '@/lib/utils';

export type ColorSuggestionButtonProps = Omit<
  ComponentPropsWithoutRef<typeof IconButton>,
  'value'
> & { value: string; color: string };

export const ColorSuggestionButton = forwardRef<
  ElementRef<typeof IconButton>,
  ColorSuggestionButtonProps
>(({ value, color, className, ...props }, ref) => {
  return (
    <ToggleGroupItem asChild ref={ref} value={value}>
      <IconButton
        {...props}
        className={cn(
          'group aspect-square h-auto w-full text-lg md:h-auto md:w-full',
          isHexColorLight(color) ? 'text-black' : 'text-white',
          className
        )}
        style={{ backgroundColor: color }}
      >
        <CheckIcon
          className='opacity-0 transition-opacity duration-100
group-aria-checked:opacity-100'
        />
      </IconButton>
    </ToggleGroupItem>
  );
});
ColorSuggestionButton.displayName = 'ColorSuggestionButton';
