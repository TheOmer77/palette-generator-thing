import { PalettesMain } from './main';
import { PalettesSidebar } from './sidebar';
import { OptionsDrawer } from '@/components/layout/OptionsDrawer';
import { validateSearchParams } from '@/lib/validateSearchParams';
import type { PropsWithSearchParams } from '@/types/searchParams';

const HomePage = ({ searchParams }: PropsWithSearchParams) => {
  validateSearchParams(searchParams);
  return (
    <>
      <PalettesSidebar />
      <OptionsDrawer />
      <PalettesMain />
    </>
  );
};

export default HomePage;
