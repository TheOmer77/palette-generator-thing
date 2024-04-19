'use client';

import { useEffect, useRef, useState, type ElementRef } from 'react';
import { usePathname } from 'next/navigation';

import { NavbarActions } from './NavbarActions';
import { NavbarHeader } from './NavbarHeader';
import { Header } from '@/components/layout/Header';
import { cn } from '@/lib/utils';

export const Navbar = () => {
  const pathname = usePathname(),
    pathnameIsRoot = pathname === '/';

  const [hideNavHeader, setHideNavHeader] = useState(true);
  const ref = useRef<ElementRef<typeof Header>>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !ref.current || !pathnameIsRoot)
      return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry) return;
      setHideNavHeader(entry.isIntersecting);
    });
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [pathnameIsRoot]);

  return (
    <>
      <nav
        className='sticky top-0 z-10 mx-auto grid h-16 w-full max-w-screen-2xl
grid-cols-[auto,1fr] items-center bg-background
md:grid-cols-[theme(spacing.80),1fr] md:bg-transparent [&>:first-child]:ps-4
[&>:last-child]:pe-4'
      >
        <NavbarHeader
          className={cn(pathnameIsRoot && hideNavHeader && 'opacity-0')}
        />
        <NavbarActions />
      </nav>

      {pathnameIsRoot && (
        <Header ref={ref} className='mb-2 block p-4 md:hidden' />
      )}
    </>
  );
};
