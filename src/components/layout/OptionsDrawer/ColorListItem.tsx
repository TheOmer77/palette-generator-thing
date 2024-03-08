import type { ComponentPropsWithoutRef } from 'react';

import { ListItem, ListItemText } from '@/components/ui/List';

type ColorListItemProps = ComponentPropsWithoutRef<typeof ListItem> & {
  color: string;
  title: string;
};

const ColorListItem = ({ color, title, ...props }: ColorListItemProps) => (
  <ListItem
    {...props}
    // Hex color has spaces so it's read correctly by screen readers
    aria-label={`${title} - ${color.split('').join(' ')}`}
  >
    <div
      className='me-3 h-8 w-8 shrink-0 rounded-lg'
      style={{ backgroundColor: color }}
    />
    <ListItemText primary={title} secondary={color} />
  </ListItem>
);

export default ColorListItem;
