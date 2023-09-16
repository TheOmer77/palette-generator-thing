import Header from './Header';
import BaseColorsSection from './BaseColorsSection';
import SheetWithFab from './SheetWithFab';
import Sidebar from './Sidebar';
import { useTailwindBreakpoint } from 'hooks';
import { TuneIcon } from 'assets/icons';

const Options = () => {
  const mdBreakpoint = useTailwindBreakpoint('md');

  return mdBreakpoint ? (
    <Sidebar>
      <Header />
      <BaseColorsSection />
    </Sidebar>
  ) : (
    <SheetWithFab label='Options' fabIcon={<TuneIcon />}>
      <BaseColorsSection />
    </SheetWithFab>
  );
};

export default Options;
