import { useState } from 'react';

import { BottomSheet, Button } from 'components/general';
import Header from './Header';
import OptionsSection from './OptionsSection';
import useTailwindBreakpoint from 'hooks/useTailwindBreakpoint';
import { ReactComponent as TuneIcon } from 'assets/icons/tune.svg';

const Sidebar = () => {
  const mdBreakpoint = useTailwindBreakpoint('md');
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <aside
      className='fixed bottom-2 start-1/2 z-10 flex -translate-x-1/2 flex-col
gap-4 rounded-lg bg-slate-200 p-2 dark:bg-slate-900 md:inset-x-auto
md:bottom-0 md:h-screen md:w-[25rem] md:translate-x-0 md:rounded-none'
    >
      <Header className='hidden md:block' />

      {mdBreakpoint ? (
        <OptionsSection />
      ) : (
        <Button icon={<TuneIcon />} onClick={() => setSheetOpen(true)}>
          Options
        </Button>
      )}
      <BottomSheet open={sheetOpen} onOpenChange={setSheetOpen} title='Options'>
        <OptionsSection />
      </BottomSheet>
    </aside>
  );
};

export default Sidebar;
