import type { ComponentPropsWithoutRef } from 'react';

import { ListItem, ListItemText } from '@/components/ui/List';

export type ColorListItemProps = ComponentPropsWithoutRef<typeof ListItem> & {
  color: string;
  title: string;
};

export const ColorListItem = ({
  color,
  title,
  ...props
}: ColorListItemProps) => (
  <ListItem
    {...props}
    // Hex color has spaces so it's read correctly by screen readers
    aria-label={`${title} - ${color.split('').join(' ')}`}
  >
    <div
      className='me-4 size-[2.25em] shrink-0 rounded-lg'
      style={{ backgroundColor: color }}
    />
    <ListItemText primary={title} secondary={color} />
  </ListItem>
);
