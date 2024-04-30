'use client';

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import { useIsClient } from 'usehooks-ts';
import { AlertCircleIcon } from 'lucide-react';

import { ListItem, ListItemText } from '@/components/ui/List';
import { useBaseColors } from '@/hooks/useBaseColors';
import { nameIsDuplicate, nameIsReserved } from '@/lib/validateColorName';
import { cn } from '@/lib/utils';

export type ColorListItemProps = ComponentPropsWithoutRef<typeof ListItem> & {
  color: string;
  title: string;
  extraColor?: boolean;
};

export const ColorListItem = forwardRef<
  ElementRef<typeof ListItem>,
  ColorListItemProps
>(({ color, title, extraColor, className, ...props }, ref) => {
  const { extras } = useBaseColors();
  const isClient = useIsClient();

  return (
    <ListItem
      {...props}
      ref={ref}
      // Hex color has spaces so it's read correctly by screen readers
      aria-label={`${title} - ${color.split('').join(' ')}`}
      className={cn(!isClient && 'pointer-events-none', className)}
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
