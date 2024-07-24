const OfflineFallbackPage = () => {
  return (
    <div className='absolute start-0 top-0 flex min-h-dvh w-full select-none flex-col items-center justify-center p-4'>
      <h1 className='m-0 text-7xl font-extrabold leading-none tracking-tight text-danger-800 sm:text-9xl dark:text-danger-200'>
        Offline
      </h1>
      <p className='m-0 text-center text-xl text-neutral-700 dark:text-neutral-300'>
        Connect to the internet to access this page.
      </p>
    </div>
  );
};

export default OfflineFallbackPage;
