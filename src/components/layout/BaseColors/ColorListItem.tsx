'use client';

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import { AlertCircleIcon } from 'lucide-react';
import { camelCase } from 'change-case';

import { ListItem, ListItemText } from '@/components/ui/List';
import { useBaseColors } from '@/hooks/useBaseColors';
import { BASE_COLOR_RESERVED_NAMES } from '@/constants/baseColors';

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

  // TODO: Dedupe this logic
  const nameIsReserved =
      typeof title === 'string' &&
      BASE_COLOR_RESERVED_NAMES.includes(camelCase(title)),
    nameIsDuplicate =
      typeof title === 'string' &&
      title.length > 0 &&
      extras.filter(
        ({ name }) =>
          typeof name === 'string' &&
          camelCase(name).toLowerCase() === camelCase(title).toLowerCase()
      ).length > 1;

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
            {extraColor && (nameIsReserved || nameIsDuplicate) && (
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
