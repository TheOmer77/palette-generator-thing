import { CodeGenSidebar } from './sidebar';
import { CodeGenMain } from './main';
import { validateSearchParams } from '@/lib/validateSearchParams';
import type { PropsWithSearchParams } from '@/types/searchParams';

const CodeGenPage = ({ searchParams }: PropsWithSearchParams) => {
  validateSearchParams(searchParams);
  return (
    <>
      <CodeGenSidebar />
      <CodeGenMain />
    </>
  );
};

export default CodeGenPage;
