import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';

export const H1 = forwardRef<
  HTMLHeadingElement,
  ComponentPropsWithoutRef<'h2'>
>(({ children, className, ...props }, ref) => (
  <h1
    {...props}
    ref={ref}
    className={cn(
      `mb-2 select-none text-4xl font-bold tracking-tight md:text-3xl`,
      className
    )}
  >
    {children}
  </h1>
));
H1.displayName = 'H1';
