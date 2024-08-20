'use client';

import { useEffect, type PropsWithChildren } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useIsClient } from 'usehooks-ts';

import LoadingPage from '../loading';

export const RedirectOnOfflineRoute = ({ children }: PropsWithChildren) => {
  const pathname = usePathname(),
    searchParams = useSearchParams(),
    router = useRouter();
  const isClient = useIsClient();

  const isOfflineRoute = pathname.startsWith('/~offline');

  useEffect(() => {
    if (isOfflineRoute) router.replace(`/?${searchParams.toString()}`);
  }, [isOfflineRoute, router, searchParams]);

  if (!isClient || isOfflineRoute) return <LoadingPage />;

  return children;
};
