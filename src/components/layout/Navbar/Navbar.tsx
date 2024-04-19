'use client';

import { usePathname } from 'next/navigation';

import { NavbarActions } from './NavbarActions';
import { NavbarHeader } from './NavbarHeader';
import { Header } from '@/components/layout/Header';

export const Navbar = () => {
  const pathname = usePathname(),
    pathnameIsRoot = pathname === '/';

  return (
    <>
      <nav
        className='sticky top-0 z-10 mx-auto grid h-16 w-full max-w-screen-2xl
grid-cols-[auto,1fr] items-center bg-background
md:grid-cols-[theme(spacing.80),1fr] md:bg-transparent [&>:first-child]:ps-4
[&>:last-child]:pe-4'
      >
        <NavbarHeader />
        <NavbarActions />
      </nav>

      {pathnameIsRoot && <Header className='mb-2 block p-4 md:hidden' />}
    </>
  );
};
