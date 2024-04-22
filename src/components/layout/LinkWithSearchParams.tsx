'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';

export const LinkWithSearchParams = forwardRef<
  ElementRef<typeof Link>,
  ComponentPropsWithoutRef<typeof Link>
>(({ href, children, ...props }, ref) => {
  const searchParams = useSearchParams();
  return (
    <Link {...props} ref={ref} href={`${href}?${searchParams.toString()}`}>
      {children}
    </Link>
  );
});
LinkWithSearchParams.displayName = 'LinkWithSearchParams';
