import { Children, forwardRef, type ComponentPropsWithoutRef } from 'react';
import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/lib/utils';

export const IconButton = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<'button'> & { asChild?: boolean }
>(({ asChild, children, className, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      {...props}
      ref={ref}
      className={cn(
        `flex size-12 cursor-default items-center justify-center rounded-lg
text-lg ring-0 ring-ring transition-[color,background-color,box-shadow]
duration-100 state-layer hover:state-layer-muted/30 focus-visible:outline-none
focus-visible:ring-2 focus-visible:state-layer-muted/30 active:bg-muted/30
active:duration-0 md:size-10 md:text-base [&>*]:z-10`,
        className
      )}
    >
      {children && Children.only(children)}
    </Comp>
  );
});
IconButton.displayName = 'IconButton';
