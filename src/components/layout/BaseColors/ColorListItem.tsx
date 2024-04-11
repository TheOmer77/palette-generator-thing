'use client';

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import { AlertCircleIcon } from 'lucide-react';

import { ListItem, ListItemText } from '@/components/ui/List';
import { useBaseColors } from '@/hooks/useBaseColors';
import { nameIsDuplicate, nameIsReserved } from '@/lib/validateColorName';

export type ColorListItemProps = ComponentPropsWithoutRef<typeof ListItem> & {
  color: string;
  title: string;
  extraColor?: boolean;
};

export const ColorListItem = forwardRef<
  ElementRef<typeof ListItem>,
  ColorListItemProps
>(({ color, title, extraColor, ...props }, ref) => {
  const { extras } = useBaseColors();

  return (
    <ListItem
      {...props}
      ref={ref}
      // Hex color has spaces so it's read correctly by screen readers
      aria-label={`${title} - ${color.split('').join(' ')}`}
    >
      <div
        className='me-4 size-[2.25em] shrink-0 rounded-lg'
        style={{ backgroundColor: color }}
      />
      <ListItemText
        primary={
          <>
            {title}
            {extraColor &&
              (nameIsReserved(title) || nameIsDuplicate(title, extras)) && (
                <AlertCircleIcon className='text-input-invalid' />
              )}
          </>
        }
        secondary={color}
      />
    </ListItem>
  );
});
ColorListItem.displayName = 'ColorListItem';
