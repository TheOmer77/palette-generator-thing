import type { ComponentPropsWithoutRef } from 'react';

import { Header } from '../Header';
import { cn } from '@/lib/utils';

export const NavbarHeader = ({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof Header>) => (
  <Header
    {...props}
    className={cn(
      'text-2xl leading-none transition-opacity duration-300 md:invisible',
      className
    )}
  />
);
