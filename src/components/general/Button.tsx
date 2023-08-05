import { ComponentProps, forwardRef } from 'react';
import cn from 'utils/cn';

const Button = forwardRef<HTMLButtonElement, ComponentProps<'button'>>(
  ({ className, children, ...props }, ref) => (
    <button
      {...props}
      ref={ref}
      className={cn(
        `flex h-9 cursor-default select-none items-center justify-center 
self-center rounded-lg px-3 text-base font-medium text-slate-700 
hover:bg-slate-500/20 focus-visible:bg-slate-500/20 focus-visible:outline-none
active:bg-slate-500/30 dark:text-slate-300`,
        className
      )}
    >
      {children}
    </button>
  )
);
Button.displayName = 'Button';

export default Button;
