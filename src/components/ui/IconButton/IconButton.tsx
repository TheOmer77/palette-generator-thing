import { Children, forwardRef, type ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/utils';

export const IconButton = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<'button'>
>(({ children, className, ...props }, ref) => (
  <button
    {...props}
    ref={ref}
    className={cn(
      `flex size-12 cursor-default items-center justify-center rounded-lg
text-lg transition-[color,background-color] duration-100 state-layer
hover:state-layer-muted/30 focus-visible:outline-none
focus-visible:state-layer-muted/30 active:bg-muted/30 active:duration-0
md:size-10 md:text-base [&>*]:z-10`,
      className
    )}
  >
    {children && Children.only(children)}
  </button>
));
IconButton.displayName = 'IconButton';
