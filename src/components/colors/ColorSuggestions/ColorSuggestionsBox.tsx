import {
  ToggleGroup,
  type ToggleGroupSingleProps,
} from '@radix-ui/react-toggle-group';

import { cn } from '@/lib/utils';

export type ColorSuggestionsBoxProps = Omit<ToggleGroupSingleProps, 'type'> & {
  value?: string;
  onValueChange?: (suggestionName: string) => void;
};

export const ColorSuggestionsBox = ({
  value,
  onValueChange,
  className,
  children,
  ...props
}: ColorSuggestionsBoxProps) => (
  <ToggleGroup
    {...props}
    type='single'
    value={value as string}
    onValueChange={suggestionName =>
      typeof suggestionName === 'string' &&
      suggestionName.length > 0 &&
      onValueChange?.(suggestionName)
    }
    className={cn(
      `grid grid-cols-[repeat(auto-fill,minmax(3rem,1fr))] gap-2 p-2
md:grid-cols-[repeat(auto-fill,minmax(2.5rem,1fr))]`,
      className
    )}
  >
    {children}
  </ToggleGroup>
);
