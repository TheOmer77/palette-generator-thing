import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { Main, Options } from '@/components/layout';
import { randomHexColor } from '@/lib/colorUtils';

const HomePage = ({ searchParams }: { searchParams: { primary?: string } }) => {
  const url = headers().get('x-url');
  if (!searchParams.primary)
    redirect(
      `${url}?${new URLSearchParams({ primary: randomHexColor().slice(1), ...searchParams })}`
    );

  return (
    <div className='mx-auto max-w-screen-2xl'>
      <Options />
      <Main />
    </div>
  );
};

export default HomePage;
