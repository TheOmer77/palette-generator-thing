import Header from './Header';
import OptionsSection from './OptionsSection';
import SheetWithFab from './SheetWithFab';
import Sidebar from './Sidebar';
import { useTailwindBreakpoint } from 'hooks';
import { TuneIcon } from 'assets/icons';

const Options = () => {
  const mdBreakpoint = useTailwindBreakpoint('md');

  return mdBreakpoint ? (
    <Sidebar>
      <Header />
      <OptionsSection />
    </Sidebar>
  ) : (
    <SheetWithFab label='Options' fabIcon={<TuneIcon />}>
      <OptionsSection />
    </SheetWithFab>
  );
};

export default Options;
