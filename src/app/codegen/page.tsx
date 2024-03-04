import { validateSearchParams } from '@/lib/validateSearchParams';
import type { PropsWithSearchParams } from '@/types/searchParams';

const CodeGenPage = ({ searchParams }: PropsWithSearchParams) => {
  validateSearchParams(searchParams);
  return <div>codegen page TBD</div>;
};

export default CodeGenPage;
