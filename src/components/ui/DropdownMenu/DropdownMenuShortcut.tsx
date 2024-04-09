'use client';

import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/utils';

export const DropdownMenuShortcut = ({
  className,
  ...props
}: ComponentPropsWithoutRef<'span'>) => {
  return (
    <span
      className={cn('ml-auto text-xs tracking-widest opacity-60', className)}
      {...props}
    />
  );
};
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';
