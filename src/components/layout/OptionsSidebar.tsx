'use client';

import { useState } from 'react';

import { AccordionList } from '@/components/ui/AccordionList';
import { ScrollArea } from '@/components/ui/ScrollArea';
import type { BaseColorsState } from '@/hooks/useBaseColors';
import type { CodeGenState } from '@/store/useCodeGen';
import { Header } from './Header';
import { BaseColorsSection } from './BaseColorsSection';
import { CodeGenSection } from './CodeGenSection';
import { Sidebar } from './Sidebar';

export const OptionsSidebar = () => {
  const [openItem, setOpenItem] = useState<
    keyof BaseColorsState | keyof CodeGenState | null
  >(null);

  const handleValueChange = (newValue: string | null) =>
    setOpenItem(newValue as typeof openItem);

  return (
    <Sidebar className='hidden md:flex print:hidden print:md:flex'>
      <Header className='px-4 py-2' />
      <ScrollArea className='flex-grow pb-2 print:hidden'>
        <AccordionList value={openItem} onValueChange={handleValueChange}>
          <BaseColorsSection />
          <CodeGenSection />
        </AccordionList>
      </ScrollArea>
    </Sidebar>
  );
};
