import { useState } from 'react';

import { BottomSheet, Button } from 'components/general';
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
      <Button
        icon={<TuneIcon />}
        onClick={() => setSheetOpen(true)}
        className='fixed bottom-4 end-4 z-10 h-12
bg-slate-200 px-4 shadow shadow-slate-900/50 hover:bg-slate-300
focus-visible:bg-slate-300 focus-visible:outline-none active:bg-slate-400
dark:bg-slate-900 dark:shadow-slate-700/50 dark:hover:bg-slate-800
dark:focus-visible:bg-slate-800 dark:active:bg-slate-700'
      >
        Options
      </Button>
      <BottomSheet open={sheetOpen} onOpenChange={setSheetOpen} title='Options'>
        <OptionsSection />
      </BottomSheet>
    </>
  );
};

export default Sidebar;
