import { Spinner } from '@/components/ui/Spinner';

const LoadingPage = () => (
  <div className='absolute start-0 top-0 grid min-h-dvh w-full place-items-center'>
    <Spinner className='text-4xl' />
  </div>
);

export default LoadingPage;
