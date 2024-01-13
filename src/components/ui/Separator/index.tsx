'use client';

import { forwardRef } from 'react';
import { Root, type SeparatorProps } from '@radix-ui/react-separator';

import { cn } from '@/lib/utils';

export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, ...props }, ref) => (
    <Root
      {...props}
      ref={ref}
      className={cn(
        `bg-neutral-300 data-[orientation=horizontal]:my-1
data-[orientation=vertical]:mx-1 data-[orientation=horizontal]:h-px
data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full
data-[orientation=vertical]:w-px dark:bg-neutral-700`,
        className
      )}
    />
  )
);
Separator.displayName = 'Separator';
