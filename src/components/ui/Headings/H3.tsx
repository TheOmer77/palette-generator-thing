import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';

export const H3 = forwardRef<
  HTMLHeadingElement,
  ComponentPropsWithoutRef<'h3'>
>(({ children, className, ...props }, ref) => (
  <h3
    {...props}
    ref={ref}
    className={cn(
      'mb-2 select-none text-lg font-medium text-muted-foreground',
      className
    )}
  >
    {children}
  </h3>
));
H3.displayName = 'H3';
