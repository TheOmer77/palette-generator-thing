import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/utils';

export const H2 = forwardRef<
  HTMLHeadingElement,
  ComponentPropsWithoutRef<'h2'>
>(({ children, className, ...props }, ref) => (
  <h2
    {...props}
    ref={ref}
    className={cn(
      `mb-2 select-none text-3xl font-bold tracking-tight`,
      className
    )}
  >
    {children}
  </h2>
));
H2.displayName = 'H2';
