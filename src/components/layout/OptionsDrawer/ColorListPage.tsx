'use client';

import {
  forwardRef,
  useCallback,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import { useSearchParams } from 'next/navigation';
import { PlusIcon } from 'lucide-react';

import ColorListItem from './ColorListItem';
import { DrawerHeader, DrawerTitle } from '@/components/ui/Drawer';
import { List, ListItem, ListItemIcon } from '@/components/ui/List';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Separator } from '@/components/ui/Separator';
import { useTheme } from '@/hooks/useTheme';
import {
  MODAL_BASECOLORS_EDIT,
  MODAL_SEARCH_KEY,
} from '@/constants/modalSearchParams';

export const ColorListPage = forwardRef<
  ElementRef<'div'>,
  ComponentPropsWithoutRef<'div'>
>((props, ref) => {
  const searchParams = useSearchParams();
  const { primary, neutral, danger, extras } = useTheme();

  const handleItemClick = useCallback(
    (itemId: 'primary' | 'neutral' | 'danger' | `extra${number}`) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(MODAL_SEARCH_KEY, `${MODAL_BASECOLORS_EDIT}${itemId}`);
      window.history.pushState(null, '', `?${params.toString()}`);
    },
    [searchParams]
  );

  return (
    <div {...props} ref={ref}>
      <DrawerHeader className='py-2.5'>
        <DrawerTitle className='text-xl'>Options</DrawerTitle>
      </DrawerHeader>
      <ScrollArea className='[&>[data-radix-scroll-area-viewport]]:max-h-[calc(100dvh-7.75rem)]'>
        <List className='pb-2'>
          <ColorListItem
            title='Primary'
            color={primary}
            onClick={() => handleItemClick('primary')}
          />
          <ColorListItem
            title='Neutral'
            color={neutral}
            onClick={() => handleItemClick('neutral')}
          />
          <ColorListItem
            title='Danger'
            color={danger}
            onClick={() => handleItemClick('danger')}
          />
          <Separator />
          {extras.map(({ name, value }, index) => {
            const id = `extra${index}` satisfies `extra${number}`,
              title = name || `Extra ${index + 1}`;
            return (
              <ColorListItem
                key={id}
                title={title}
                color={value}
                onClick={() => handleItemClick(id)}
              />
            );
          })}
          <ListItem>
            <ListItemIcon>
              <PlusIcon />
            </ListItemIcon>
            Add extra color
          </ListItem>
        </List>
      </ScrollArea>
    </div>
  );
});
ColorListPage.displayName = 'ColorList';
