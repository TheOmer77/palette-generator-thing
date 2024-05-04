'use client';

import { useEffect, useRef, type ElementRef } from 'react';
import { usePathname } from 'next/navigation';

import { Header } from '@/components/layout/Header';

type NavbarLargeHeaderProps = {
  onIntersectingChange?: (isIntersecting: boolean) => void;
};

export const NavbarLargeHeader = ({
  onIntersectingChange,
}: NavbarLargeHeaderProps) => {
  const pathname = usePathname(),
    pathnameIsRoot = pathname === '/';

  const ref = useRef<ElementRef<typeof Header>>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !ref.current || !pathnameIsRoot)
      return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry) return;
      onIntersectingChange?.(entry.isIntersecting);
    });
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [onIntersectingChange, pathnameIsRoot]);

  return pathnameIsRoot ? (
    <Header ref={ref} className='relative mb-6 block p-4 pb-0 md:hidden' />
  ) : null;
};
