import { useState } from 'react';

import { BottomSheet, Fab } from 'components/general';
import Header from './Header';
import OptionsSection from './OptionsSection';
import useTailwindBreakpoint from 'hooks/useTailwindBreakpoint';
import { TuneIcon } from 'assets/icons';

const Sidebar = () => {
  const mdBreakpoint = useTailwindBreakpoint('md');
  const [sheetOpen, setSheetOpen] = useState(false);

  return mdBreakpoint ? (
    <aside
      className='fixed flex h-screen
w-[25rem] flex-col gap-4 rounded-lg
bg-slate-200 p-2 dark:bg-slate-900 md:rounded-none'
    >
      <Header className='hidden md:block' />
      <OptionsSection />
    </aside>
  ) : (
    <>
      <Fab icon={<TuneIcon />} onClick={() => setSheetOpen(true)}>
        Options
      </Fab>
      <BottomSheet open={sheetOpen} onOpenChange={setSheetOpen} title='Options'>
        <OptionsSection />
      </BottomSheet>
    </>
  );
};

export default Sidebar;
