import Header from './Header';
import OptionsSection from './OptionsSection';
import SheetWithFab from './SheetWithFab';
import Sidebar from './Sidebar';
import useTailwindBreakpoint from 'hooks/useTailwindBreakpoint';
import { TuneIcon } from 'assets/icons';

const Options = () => {
  const mdBreakpoint = useTailwindBreakpoint('md');

  return mdBreakpoint ? (
    <Sidebar>
      <Header className='hidden md:block' />
      <OptionsSection />
    </Sidebar>
  ) : (
    <SheetWithFab label='Options' fabIcon={<TuneIcon />}>
      <OptionsSection />
    </SheetWithFab>
  );
};

export default Options;
