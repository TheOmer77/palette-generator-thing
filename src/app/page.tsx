import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { parseHex } from 'culori/fn';

import { Main, Options } from '@/components/layout';
import { randomHexColor } from '@/lib/colorUtils';

const HomePage = ({ searchParams }: { searchParams: { primary?: string } }) => {
  const url = headers().get('x-url')?.split('?')[0];

  const validParams = {
    primary:
      typeof searchParams.primary === 'string' &&
      parseHex(searchParams.primary || '')
        ? searchParams.primary
        : randomHexColor().slice(1),
  };

  Object.entries(validParams).forEach(([key, value]) => {
    if (value !== searchParams[key as keyof typeof validParams])
      redirect(`${url}?${new URLSearchParams(validParams)}`);
  });

  return (
    <div className='mx-auto max-w-screen-2xl'>
      <Options />
      <Main />
    </div>
  );
};

export default HomePage;
