import { Main, Options } from '@/components/layout';
import { validateSearchParams } from '@/lib/validateSearchParams';
import type { PropsWithSearchParams } from '@/types/searchParams';

const HomePage = ({ searchParams }: PropsWithSearchParams) => {
  validateSearchParams(searchParams);
  return (
    <div className='mx-auto max-w-screen-2xl'>
      <Options />
      <Main />
    </div>
  );
};

export default HomePage;
