'use client';

import { useState } from 'react';

import { PalettesSidebarContent } from './sidebar-content';
import { AccordionList } from '@/components/ui/AccordionList';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Sidebar } from '@/components/ui/Sidebar';
import { Header } from '@/components/layout/Header';
import type { BaseColorsState } from '@/hooks/useBaseColors';

export const PalettesSidebar = () => {
  const [openItem, setOpenItem] = useState<keyof BaseColorsState | null>(null);

  const handleValueChange = (newValue: string | null) =>
    setOpenItem(newValue as typeof openItem);

  return (
    <Sidebar className='hidden md:flex print:hidden print:md:flex'>
      <Header className='px-4 py-2' />
      <ScrollArea
        // TODO: Remove second row of classnames when removing the code gen bottom item
        className='flex-grow pb-2 print:hidden
[&_[data-radix-scroll-area-viewport]]:pb-[3rem] [&_[data-scroll-bar]]:z-10'
      >
        <AccordionList value={openItem} onValueChange={handleValueChange}>
          <PalettesSidebarContent />
        </AccordionList>
      </ScrollArea>
    </Sidebar>
  );
};
