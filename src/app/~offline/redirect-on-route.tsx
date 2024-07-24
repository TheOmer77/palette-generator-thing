'use client';

import { useEffect, type PropsWithChildren } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useIsClient } from 'usehooks-ts';

import { Spinner } from '@/components/ui/Spinner';

export const RedirectOnOfflineRoute = ({ children }: PropsWithChildren) => {
  const pathname = usePathname(),
    searchParams = useSearchParams(),
    router = useRouter();
  const isClient = useIsClient();

  const isOfflineRoute = pathname.startsWith('/~offline');

  useEffect(() => {
    if (isOfflineRoute) router.replace(`/?${searchParams.toString()}`);
  }, [isOfflineRoute, router, searchParams]);

  if (!isClient || isOfflineRoute)
    return (
      <div className='absolute start-0 top-0 grid min-h-dvh w-full place-items-center'>
        <Spinner className='text-4xl' />
      </div>
    );

  return children;
};
