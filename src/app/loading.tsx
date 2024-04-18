import { Spinner } from '@/components/ui/Spinner';

const LoadingPage = () => (
  <div className='grid min-h-dvh w-full place-items-center'>
    <Spinner className='text-4xl' />
  </div>
);

export default LoadingPage;
