import { useState } from 'react';

import BottomSheet from 'components/general/BottomSheet';
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

      <button
        onClick={() => setSheetOpen(true)}
        className='flex cursor-default items-center justify-center self-center
rounded-lg px-3 py-1.5 text-base text-slate-700 hover:bg-slate-500/20
focus-visible:bg-slate-500/20 focus-visible:outline-none active:bg-slate-500/30
dark:text-slate-300 md:hidden'
      >
        Options
      </button>
      <BottomSheet open={sheetOpen} onOpenChange={setSheetOpen} title='Options'>
        <OptionsSection />
      </BottomSheet>
    </aside>
  );
};

export default Sidebar;
