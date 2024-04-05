import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';

import { ListItem, ListItemText } from '@/components/ui/List';

export type ColorListItemProps = ComponentPropsWithoutRef<typeof ListItem> & {
  color: string;
  title: string;
};

export const ColorListItem = forwardRef<
  ElementRef<typeof ListItem>,
  ColorListItemProps
>(({ color, title, ...props }, ref) => (
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
    <ListItemText primary={title} secondary={color} />
  </ListItem>
));
ColorListItem.displayName = 'ColorListItem';
