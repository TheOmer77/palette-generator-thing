import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { Main, Options } from '@/components/layout';
import { isValidHexColor, randomHexColor } from '@/lib/colorUtils';
import {
  dangerColorSuggestionNames,
  neutralColorSuggestionNames,
} from '@/constants';

type PropsWithBaseColorsParams = {
  searchParams: { primary?: string; neutral?: string; danger?: string };
};

const HomePage = ({ searchParams }: PropsWithBaseColorsParams) => {
  const url = headers().get('x-url')?.split('?')[0];

  const validParams = {
    primary:
      typeof searchParams.primary === 'string' &&
      isValidHexColor(searchParams.primary)
        ? searchParams.primary
        : randomHexColor().slice(1),
    neutral:
      typeof searchParams.neutral === 'string' &&
      (isValidHexColor(searchParams.neutral) ||
        neutralColorSuggestionNames.includes(searchParams.neutral))
        ? searchParams.neutral
        : undefined,
    danger:
      typeof searchParams.danger === 'string' &&
      (isValidHexColor(searchParams.danger) ||
        dangerColorSuggestionNames.includes(searchParams.danger))
        ? searchParams.danger
        : undefined,
  };

  Object.entries(validParams).forEach(([key, value]) => {
    if (value !== searchParams[key as keyof typeof validParams])
      redirect(
        `${url}?${new URLSearchParams(
          Object.entries(validParams)
            .filter(entry => typeof entry[1] === 'string')
            .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {})
        ).toString()}`
      );
  });

  return (
    <div className='mx-auto max-w-screen-2xl'>
      <Options />
      <Main />
    </div>
  );
};

export default HomePage;
