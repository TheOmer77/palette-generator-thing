import { Main, OptionsDrawer, OptionsSidebar } from '@/components/layout';
import { validateSearchParams } from '@/lib/validateSearchParams';
import type { PropsWithSearchParams } from '@/types/searchParams';

const HomePage = ({ searchParams }: PropsWithSearchParams) => {
  validateSearchParams(searchParams);
  return (
    <>
      <OptionsSidebar />
      <OptionsDrawer />
      <Main />
    </>
  );
};

export default HomePage;
