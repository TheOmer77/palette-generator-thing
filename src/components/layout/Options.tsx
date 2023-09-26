import Header from './Header';
import BaseColorsSection from './BaseColorsSection';
import SheetWithFab from './SheetWithFab';
import Sidebar from './Sidebar';
import { useTailwindBreakpoint } from 'hooks';
import { TuneIcon } from 'assets/icons';

const Options = () => {
  const mdBreakpoint = useTailwindBreakpoint('md');

  return mdBreakpoint ? (
    <Sidebar className='print:hidden print:md:flex'>
      <Header className='p-2' />
      <div
        className='overflow-y-auto scrollbar-thin
scrollbar-thumb-neutral-500/30 print:hidden'
      >
        <BaseColorsSection />
      </div>
    </Sidebar>
  ) : (
    <SheetWithFab label='Options' fabIcon={<TuneIcon />}>
      <BaseColorsSection />
    </SheetWithFab>
  );
};

export default Options;
