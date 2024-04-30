'use client';

import { useIsClient } from 'usehooks-ts';
import { PlusIcon } from 'lucide-react';

import { Collapsible } from '@/components/ui/Collapsible';
import { List, ListItem, ListItemIcon } from '@/components/ui/List';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';
import { Separator } from '@/components/ui/Separator';
import {
  ColorListItem,
  DangerColorEditor,
  ExtraColorEditor,
  NeutralColorEditor,
  PrimaryColorEditor,
} from '@/components/layout/BaseColors';
import { useBaseColors } from '@/hooks/useBaseColors';
import { useTheme } from '@/hooks/useTheme';

export const PalettesSidebarContent = () => {
  const { extras, addExtraColor } = useBaseColors(),
    themeColors = useTheme();
  const isClient = useIsClient();

  return (
    <List>
      <Popover modal>
        <PopoverTrigger asChild>
          <ColorListItem color={themeColors.primary} title='Primary' />
        </PopoverTrigger>
        <PopoverContent side='right' align='start'>
          <PrimaryColorEditor />
        </PopoverContent>
      </Popover>

      <Popover modal>
        <PopoverTrigger asChild>
          <ColorListItem
            value='neutral'
            color={themeColors.neutral}
            title='Neutral'
          />
        </PopoverTrigger>
        <PopoverContent side='right' align='start'>
          <NeutralColorEditor />
        </PopoverContent>
      </Popover>

      <Popover modal>
        <PopoverTrigger asChild>
          <ColorListItem
            value='danger'
            color={themeColors.danger}
            title='Danger'
          />
        </PopoverTrigger>
        <PopoverContent side='right' align='start'>
          <DangerColorEditor />
        </PopoverContent>
      </Popover>

      <Separator />
      {extras.map(({ name }, index) => {
        const id = `extra${index + 1}`,
          title = name || `Extra ${index + 1}`;

        return (
          <Popover modal key={id}>
            <PopoverTrigger asChild>
              <ColorListItem
                value={id}
                color={themeColors.extras[index].value}
                title={title}
                extraColor
              />
            </PopoverTrigger>
            <PopoverContent side='right' align='start' className='pb-[3.75rem]'>
              <ExtraColorEditor index={index} />
            </PopoverContent>
          </Popover>
        );
      })}
      <Collapsible open={isClient}>
        <ListItem onClick={addExtraColor} className='mb-2'>
          <ListItemIcon>
            <PlusIcon />
          </ListItemIcon>
          <span>Add extra color</span>
        </ListItem>
      </Collapsible>
    </List>
  );
};
