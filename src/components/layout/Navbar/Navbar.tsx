'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';

import { NavbarActions } from './NavbarActions';
import { NavbarHeader } from './NavbarHeader';
import { NavbarLargeHeader } from './NavbarLargeHeader';
import { NavbarLinks } from './NavbarLinks';
import { cn } from '@/lib/utils';

export const Navbar = () => {
  const pathname = usePathname(),
    pathnameIsRoot = pathname === '/';

  const [hideNavHeader, setHideNavHeader] = useState(true);

  return (
    <>
      <nav
        className={cn(
          `sticky top-0 z-20 mx-auto grid h-16 w-full max-w-screen-2xl
grid-cols-[auto,1fr] items-center bg-background transition-[background-color]
before:absolute before:top-0 before:-z-10 before:size-full
before:bg-gradient-to-b before:from-background before:via-background/90
before:via-35% before:to-background/0 before:opacity-0
before:transition-opacity md:grid-cols-[theme(spacing.80),1fr] md:bg-transparent md:before:end-0
md:before:h-24 md:before:w-[calc(100%-theme(spacing.80))] md:before:opacity-100
print:hidden [&>:first-child]:ps-4 [&>:last-child]:pe-4`,
          pathnameIsRoot && hideNavHeader && 'bg-transparent before:opacity-100'
        )}
      >
        <NavbarHeader
          className={cn(pathnameIsRoot && hideNavHeader && 'opacity-0')}
        />
        <div className='flex size-full flex-row items-center justify-end ps-4'>
          <NavbarLinks />
          <NavbarActions />
        </div>
      </nav>
      <NavbarLargeHeader onIntersectingChange={setHideNavHeader} />
    </>
  );
};
