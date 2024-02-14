'use client';

import { SlidersHorizontalIcon } from 'lucide-react';

import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/Drawer';
import { Fab } from '@/components/ui/Fab';
import { ColorListPage } from './ColorListPage';

export const OptionsDrawer = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Fab
          icon={<SlidersHorizontalIcon />}
          className='flex md:hidden print:hidden'
        >
          Options
        </Fab>
      </DrawerTrigger>
      <DrawerContent className='print:hidden'>
        <ColorListPage />
      </DrawerContent>
    </Drawer>
  );
};
