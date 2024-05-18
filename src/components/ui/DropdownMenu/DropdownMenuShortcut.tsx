'use client';

import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/utils';

export const DropdownMenuShortcut = ({
  className,
  ...props
}: ComponentPropsWithoutRef<'span'>) => {
  return (
    <span
      className={cn(
        'ml-auto text-sm tracking-widest text-muted-foreground md:text-xs',
        className
      )}
      {...props}
    />
  );
};
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';
