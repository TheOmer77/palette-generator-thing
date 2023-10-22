import { useState } from 'react';

import Header from './Header';
import BaseColorsSection from './BaseColorsSection';
import GeneratedCodeSection from './GeneratedCodeSection';
import SheetWithFab from './SheetWithFab';
import Sidebar from './Sidebar';
import { AccordionList } from 'components/general';
import { useTailwindBreakpoint } from 'hooks';
import { TuneIcon } from 'assets/icons';
import type { GlobalState } from 'contexts/globalState';

const Options = () => {
  const [openItem, setOpenItem] = useState<
    keyof GlobalState['baseColors'] | null
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
        <GeneratedCodeSection />
      </AccordionList>
    </Sidebar>
  ) : (
    <SheetWithFab label='Options' fabIcon={<TuneIcon />}>
      <AccordionList
        className='overflow-y-auto scrollbar-thin
scrollbar-thumb-neutral-500/30 print:hidden'
        value={openItem}
        onValueChange={handleValueChange}
      >
        <BaseColorsSection />
        <GeneratedCodeSection />
      </AccordionList>
    </SheetWithFab>
  );
};

export default Options;
