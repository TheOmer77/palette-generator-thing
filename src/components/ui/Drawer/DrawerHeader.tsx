import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';

import { cn } from '@/lib/utils';

export const DrawerHeader = forwardRef<
  ElementRef<'div'>,
  ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => (
  <div
    {...props}
    ref={ref}
    className={cn('grid gap-1.5 p-4 text-start', className)}
  />
));
DrawerHeader.displayName = 'DrawerHeader';
