'use client';

import { useState } from 'react';
import { SlidersHorizontalIcon } from 'lucide-react';

import { AccordionList } from '@/components/ui/AccordionList';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/Drawer';
import { Fab } from '@/components/ui/Fab';
import { ScrollArea } from '@/components/ui/ScrollArea';
import type { BaseColorsState } from '@/hooks/useBaseColors';
import type { CodeGenState } from '@/store/useCodeGen';
import { BaseColorsSection } from './BaseColorsSection';
import { CodeGenSection } from './CodeGenSection';

export const OptionsDrawer = () => {
  const [openItem, setOpenItem] = useState<
    keyof BaseColorsState | keyof CodeGenState | null
  >(null);

  const handleValueChange = (newValue: string | null) =>
    setOpenItem(newValue as typeof openItem);

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
        <DrawerHeader className='py-2.5'>
          <DrawerTitle className='text-xl'>Options</DrawerTitle>
        </DrawerHeader>
        <ScrollArea className='[&>[data-radix-scroll-area-viewport]]:max-h-[calc(100dvh-7.75rem)]'>
          <AccordionList
            className='pb-2'
            value={openItem}
            onValueChange={handleValueChange}
          >
            <BaseColorsSection />
            <CodeGenSection />
          </AccordionList>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};
