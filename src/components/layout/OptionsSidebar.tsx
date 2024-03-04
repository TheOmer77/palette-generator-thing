'use client';

import { useState } from 'react';

import { Header } from './Header';
import { BaseColorsSection } from './BaseColorsSection';
import { AccordionList } from '@/components/ui/AccordionList';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Sidebar } from '@/components/ui/Sidebar';
import type { BaseColorsState } from '@/hooks/useBaseColors';

export const OptionsSidebar = () => {
  const [openItem, setOpenItem] = useState<keyof BaseColorsState | null>(null);

  const handleValueChange = (newValue: string | null) =>
    setOpenItem(newValue as typeof openItem);

  return (
    <Sidebar className='hidden md:flex print:hidden print:md:flex'>
      <Header className='px-4 py-2' />
      <ScrollArea className='flex-grow pb-2 print:hidden'>
        <AccordionList value={openItem} onValueChange={handleValueChange}>
          <BaseColorsSection />
        </AccordionList>
      </ScrollArea>
    </Sidebar>
  );
};
