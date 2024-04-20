'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';

import { NavbarActions } from './NavbarActions';
import { NavbarHeader } from './NavbarHeader';
import { NavbarLargeHeader } from './NavbarLargeHeader';
import { cn } from '@/lib/utils';

export const Navbar = () => {
  const pathname = usePathname(),
    pathnameIsRoot = pathname === '/';

  const [hideNavHeader, setHideNavHeader] = useState(true);

  return (
    <>
      <nav
        className={cn(
          `sticky top-0 z-10 mx-auto grid h-16 w-full max-w-screen-2xl
grid-cols-[auto,1fr] items-center bg-background transition-[background-color]
md:grid-cols-[theme(spacing.80),1fr] md:bg-transparent 
[&>:first-child]:ps-4 [&>:last-child]:pe-4`,
          pathnameIsRoot &&
            `before:absolute before:-z-10 before:size-full
before:bg-gradient-to-b before:from-background before:via-background/90
before:via-35% before:to-transparent before:opacity-0 before:transition-opacity
md:before:hidden`,
          hideNavHeader && 'bg-transparent before:opacity-100'
        )}
      >
        <NavbarHeader
          className={cn(pathnameIsRoot && hideNavHeader && 'opacity-0')}
        />
        <NavbarActions />
      </nav>
      <NavbarLargeHeader onIntersectingChange={setHideNavHeader} />
    </>
  );
};
