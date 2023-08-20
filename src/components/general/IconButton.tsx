import { Children, ComponentProps, forwardRef } from 'react';
import { cn } from 'utils';

const IconButton = forwardRef<HTMLButtonElement, ComponentProps<'button'>>(
  ({ children, className, ...props }, ref) => (
    <button
      {...props}
      ref={ref}
      className={cn(
        `flex h-8 w-8 cursor-default items-center justify-center rounded-lg
text-xl text-neutral-50 hover:bg-neutral-50/20 focus-visible:bg-neutral-5/20
focus-visible:outline-none active:bg-neutral-50/30`,
        className
      )}
    >
      {Children.only(children)}
    </button>
  )
);
IconButton.displayName = 'IconButton';

export default IconButton;
