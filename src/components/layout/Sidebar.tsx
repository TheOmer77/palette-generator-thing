import { useState } from 'react';

import { BottomSheet, Button } from 'components/general';
import Header from './Header';
import OptionsSection from './OptionsSection';

const Sidebar = () => {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <aside
      className='fixed inset-x-0 bottom-0 z-10 flex flex-col gap-4 bg-slate-200
    p-2 dark:bg-slate-900 md:inset-x-auto md:h-screen md:w-[25rem]'
    >
      <Header className='hidden md:block' />
      <OptionsSection className='hidden md:block' />

      <Button onClick={() => setSheetOpen(true)} className='md:hidden'>
        Options
      </Button>
      <BottomSheet open={sheetOpen} onOpenChange={setSheetOpen} title='Options'>
        <OptionsSection />
      </BottomSheet>
    </aside>
  );
};

export default Sidebar;
