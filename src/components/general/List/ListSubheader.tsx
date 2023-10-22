import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { cn } from 'utils';

export const ListSubheader = forwardRef<
  HTMLSpanElement,
  ComponentPropsWithoutRef<'span'>
>(({ className, ...props }, ref) => {
  return (
    <span
      {...props}
      ref={ref}
      className={cn(
        `sticky top-0 z-20 inline-block w-full select-none p-2 text-sm
font-medium text-neutral-600 dark:text-neutral-400`,
        className
      )}
    />
  );
});
ListSubheader.displayName = 'ListSubheader';
