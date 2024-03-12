import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';

export const H2 = forwardRef<
  HTMLHeadingElement,
  ComponentPropsWithoutRef<'h2'>
>(({ children, className, ...props }, ref) => (
  <h2
    {...props}
    ref={ref}
    className={cn(
      'mb-2 select-none text-xl font-medium text-muted-foreground',
      className
    )}
  >
    {children}
  </h2>
));
H2.displayName = 'H2';
