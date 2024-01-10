import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/utils';

export const H3 = forwardRef<
  HTMLHeadingElement,
  ComponentPropsWithoutRef<'h3'>
>(({ children, className, ...props }, ref) => (
  <h3
    {...props}
    ref={ref}
    className={cn(
      `mb-2 select-none text-xl font-medium text-neutral-600
dark:text-neutral-400`,
      className
    )}
  >
    {children}
  </h3>
));
H3.displayName = 'H3';
