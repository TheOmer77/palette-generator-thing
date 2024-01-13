import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';

export const ListSubheader = forwardRef<
  HTMLSpanElement,
  ComponentPropsWithoutRef<'span'>
>(({ className, ...props }, ref) => (
  <span
    {...props}
    ref={ref}
    className={cn(
      `sticky top-0 z-20 inline-block w-full select-none p-2 text-xs
font-medium text-muted-foreground`,
      className
    )}
  />
));
ListSubheader.displayName = 'ListSubheader';
