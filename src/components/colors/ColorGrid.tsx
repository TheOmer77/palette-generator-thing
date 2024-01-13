import { forwardRef, type ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/utils';

export const ColorGrid = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<'div'>
>(({ children, className, ...props }, ref) => (
  <div
    {...props}
    ref={ref}
    className={cn(
      `mb-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-2
lg:grid-cols-4 xl:grid-cols-5`,
      className
    )}
  >
    {children}
  </div>
));
ColorGrid.displayName = 'ColorGrid';
