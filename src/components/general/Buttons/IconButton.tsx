import { Children, ComponentProps, forwardRef } from 'react';
import { cn } from 'utils';

export const IconButton = forwardRef<
  HTMLButtonElement,
  ComponentProps<'button'>
>(({ children, className, ...props }, ref) => (
  <button
    {...props}
    ref={ref}
    className={cn(
      `flex h-8 w-8 cursor-default items-center justify-center rounded-lg
text-xl text-neutral-500 state-layer hover:state-layer-neutral-500/20
focus-visible:outline-none focus-visible:state-layer-neutral-500/20
active:state-layer-neutral-500/30`,
      className
    )}
  >
    {Children.only(children)}
  </button>
));
IconButton.displayName = 'IconButton';
