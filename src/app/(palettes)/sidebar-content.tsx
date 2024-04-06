'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CodeIcon, PlusIcon } from 'lucide-react';

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
  const searchParams = useSearchParams();

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
              />
            </PopoverTrigger>
            <PopoverContent side='right' align='start' className='pb-[3.75rem]'>
              <ExtraColorEditor index={index} />
            </PopoverContent>
          </Popover>
        );
      })}
      <ListItem onClick={addExtraColor} className='mb-2'>
        <ListItemIcon>
          <PlusIcon />
        </ListItemIcon>
        <span>Add extra color</span>
      </ListItem>

      {/* Temporary until site nav is implemented */}
      <div
        className='absolute inset-x-0 bottom-0 z-10 flex h-14 flex-col
        justify-center bg-card px-2'
      >
        <ListItem asChild>
          <Link href={`/codegen?${searchParams.toString()}`} scroll={false}>
            <ListItemIcon>
              <CodeIcon />
            </ListItemIcon>
            <span>Export as code</span>
          </Link>
        </ListItem>
      </div>
    </List>
  );
};
