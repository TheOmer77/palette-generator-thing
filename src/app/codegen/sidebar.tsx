'use client';

import { useState } from 'react';

import { CodeGenSidebarContent } from './sidebar-content';
import { AccordionList } from '@/components/ui/AccordionList';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Sidebar } from '@/components/ui/Sidebar';
import { Header } from '@/components/layout/Header';
import type { CodeGenState } from '@/store/useCodeGen';

export const CodeGenSidebar = () => {
  const [openItem, setOpenItem] = useState<keyof CodeGenState | null>(null);

  const handleValueChange = (newValue: string | null) =>
    setOpenItem(newValue as typeof openItem);

  return (
    <Sidebar className='hidden md:flex print:hidden'>
      <Header className='px-4 py-2' />
      <ScrollArea className='flex-grow pb-2 print:hidden'>
        <AccordionList value={openItem} onValueChange={handleValueChange}>
          <CodeGenSidebarContent />
        </AccordionList>
      </ScrollArea>
    </Sidebar>
  );
};
