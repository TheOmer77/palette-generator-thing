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
          `aspect-square h-auto w-full text-lg md:h-auto md:w-full
[&>svg]:pointer-events-none [&>svg]:text-lg [&>svg]:opacity-0
[&>svg]:transition-opacity [&>svg]:[--animation-duration:300ms]
[&>svg]:[stroke-dasharray:22.627416610717773px] [&>svg]:[stroke-dashoffset:0]
[&>svg]:aria-checked:animate-checkbox-check [&>svg]:aria-checked:opacity-100`,
          isHexColorLight(color) ? 'text-black' : 'text-white',
          className
        )}
        style={{ backgroundColor: color }}
      >
        <CheckIcon />
      </IconButton>
    </ToggleGroupItem>
  );
});
ColorSuggestionButton.displayName = 'ColorSuggestionButton';
