import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';

export const H1 = forwardRef<
  HTMLHeadingElement,
  ComponentPropsWithoutRef<'h1'>
>(({ children, className, ...props }, ref) => (
  <h1
    {...props}
    ref={ref}
    className={cn(
      `mb-2 select-none text-3xl font-bold tracking-tight`,
      className
    )}
  >
    {children}
  </h1>
));
H1.displayName = 'H1';
