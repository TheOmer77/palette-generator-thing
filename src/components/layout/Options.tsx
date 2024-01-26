'use client';

import { useState } from 'react';
import { SlidersHorizontalIcon } from 'lucide-react';

import { Header } from './Header';
import { BaseColorsSection } from './BaseColorsSection';
import { CodeGenSection } from './CodeGenSection';
import { SheetWithFab } from './SheetWithFab';
import { Sidebar } from './Sidebar';
import { AccordionList } from '@/components/ui/AccordionList';
import { ScrollArea } from '@/components//ui/ScrollArea';
import type { BaseColorsState } from '@/store/useBaseColors';
import type { CodeGenState } from '@/store/useCodeGen';

export const Options = () => {
  const [openItem, setOpenItem] = useState<
    keyof BaseColorsState | keyof CodeGenState | null
  >(null);

  const handleValueChange = (newValue: string | null) =>
    setOpenItem(newValue as typeof openItem);

  return (
    <>
      <Sidebar className='hidden md:flex print:hidden print:md:flex'>
        <Header className='px-4 py-2' />
        <ScrollArea className='flex-grow pb-2 print:hidden'>
          <AccordionList value={openItem} onValueChange={handleValueChange}>
            <BaseColorsSection />
            <CodeGenSection />
          </AccordionList>
        </ScrollArea>
      </Sidebar>
      <SheetWithFab
        label='Options'
        fabIcon={<SlidersHorizontalIcon />}
        onOpenChange={open => !open && setOpenItem(null)}
      >
        <AccordionList
          className='pb-2'
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
