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
      `flex h-9 w-9 cursor-default items-center justify-center rounded-lg
text-neutral-500 duration-100 state-layer hover:state-layer-neutral-500/20
focus-visible:outline-none focus-visible:state-layer-neutral-500/20
active:bg-neutral-500/20 active:duration-0`,
      className
    )}
  >
    {children && Children.only(children)}
  </button>
));
IconButton.displayName = 'IconButton';
