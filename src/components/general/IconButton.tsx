import { Children, ComponentProps, forwardRef } from 'react';
import { cn } from 'utils';

const IconButton = forwardRef<HTMLButtonElement, ComponentProps<'button'>>(
  ({ children, className, ...props }, ref) => (
    <button
      {...props}
      ref={ref}
      className={cn(
        `flex h-8 w-8 cursor-default items-center justify-center rounded-lg
text-xl text-slate-500 hover:bg-slate-500/20 focus-visible:bg-slate-500/20
focus-visible:outline-none active:bg-slate-500/30`,
        className
      )}
    >
      {Children.only(children)}
    </button>
  )
);
IconButton.displayName = 'IconButton';

export default IconButton;
