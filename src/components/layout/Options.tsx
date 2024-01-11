'use client';

import { useState } from 'react';
import { SlidersHorizontalIcon } from 'lucide-react';

import { Header } from './Header';
import { BaseColorsSection } from './BaseColorsSection';
import { CodeGenSection } from './CodeGenSection';
import { SheetWithFab } from './SheetWithFab';
import { Sidebar } from './Sidebar';
import { AccordionList } from '@/components/general';
import type { GlobalState } from '@/types';

export const Options = () => {
  const [openItem, setOpenItem] = useState<
    keyof GlobalState['baseColors'] | keyof GlobalState['codeGen'] | null
  >(null);

  const handleValueChange = (newValue: string | null) =>
    setOpenItem(newValue as typeof openItem);

  return (
    <>
      <Sidebar className='hidden md:flex print:hidden print:md:flex'>
        <Header className='p-2' />
        <AccordionList
          className='flex-grow overflow-y-auto pb-2 scrollbar-thin
        scrollbar-thumb-neutral-500/30 print:hidden'
          value={openItem}
          onValueChange={handleValueChange}
        >
          <BaseColorsSection />
          <CodeGenSection />
        </AccordionList>
      </Sidebar>
      <SheetWithFab
        label='Options'
        fabIcon={<SlidersHorizontalIcon />}
        onOpenChange={open => !open && setOpenItem(null)}
      >
        <AccordionList
          className='pb-2 scrollbar-thin
        scrollbar-thumb-neutral-500/30 print:hidden'
          value={openItem}
          onValueChange={handleValueChange}
        >
          <BaseColorsSection />
          <CodeGenSection />
        </AccordionList>
      </SheetWithFab>
    </>
  );
};
