import { useState } from 'react';

import Header from './Header';
import BaseColorsSection from './BaseColorsSection';
import CodeGenSection from './CodeGenSection';
import SheetWithFab from './SheetWithFab';
import Sidebar from './Sidebar';
import { AccordionList } from '@/components/general';
import { useTailwindBreakpoint } from '@/hooks';
import { TuneIcon } from '@/assets/icons';
import type { GlobalState } from '@/types';

const Options = () => {
  const [openItem, setOpenItem] = useState<
    keyof GlobalState['baseColors'] | keyof GlobalState['codeGen'] | null
  >(null);
  const mdBreakpoint = useTailwindBreakpoint('md');

  const handleValueChange = (newValue: string | null) =>
    setOpenItem(newValue as typeof openItem);

  return mdBreakpoint ? (
    <Sidebar className='print:hidden print:md:flex'>
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
  ) : (
    <SheetWithFab
      label='Options'
      fabIcon={<TuneIcon />}
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
  );
};

export default Options;
