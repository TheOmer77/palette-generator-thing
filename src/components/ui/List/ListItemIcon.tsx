import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { Primitive } from '@radix-ui/react-primitive';
import { cn } from '@/utils';

export const ListItemIcon = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(({ children, className, ...props }, ref) => (
  <Primitive.svg
    {...props}
    ref={ref}
    asChild
    className={cn(`me-4 text-lg`, className)}
  >
    {children}
  </Primitive.svg>
));
ListItemIcon.displayName = 'ListItemIcon';
