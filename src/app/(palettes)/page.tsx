import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { OptionsDrawer } from '@/components/layout/OptionsDrawer';
import { validateSearchParams } from '@/lib/validateSearchParams';
import type { PropsWithSearchParams } from '@/types/searchParams';

import { PalettesMain } from './main';
import { PalettesSidebar } from './sidebar';

const HomePage = ({ searchParams }: PropsWithSearchParams) => {
  const pathname = headers().get('x-pathname') || '/';
  const { isValid, validSearch } = validateSearchParams(searchParams);
  if (!isValid) redirect(`${pathname}?${validSearch}`);

  return (
    <>
      <PalettesSidebar />
      <OptionsDrawer />
      <PalettesMain />
    </>
  );
};

export default HomePage;
