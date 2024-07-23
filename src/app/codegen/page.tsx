import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { validateSearchParams } from '@/lib/validateSearchParams';
import type { PropsWithSearchParams } from '@/types/searchParams';

import { CodeGenSidebar } from './sidebar';
import { CodeGenMain } from './main';

const CodeGenPage = ({ searchParams }: PropsWithSearchParams) => {
  const pathname = headers().get('x-pathname') || '/';
  const { isValid, validSearch } = validateSearchParams(searchParams);
  if (!isValid) redirect(`${pathname}?${validSearch}`);

  return (
    <>
      <CodeGenSidebar />
      <CodeGenMain />
    </>
  );
};

export default CodeGenPage;
