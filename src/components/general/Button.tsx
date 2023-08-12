import {
  type ComponentProps,
  type ReactNode,
  forwardRef,
  isValidElement,
} from 'react';
import { cn } from 'utils';

export interface ButtonProps extends ComponentProps<'button'> {
  icon?: ReactNode;
  iconPosition?: 'start' | 'end';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ icon, iconPosition = 'start', className, children, ...props }, ref) => (
    <button
      {...props}
      ref={ref}
      className={cn(
        `flex h-9 cursor-default select-none items-center justify-center
gap-2 self-center rounded-lg px-3 text-base font-medium text-slate-700
hover:bg-slate-500/20 focus-visible:bg-slate-500/20 focus-visible:outline-none
active:bg-slate-500/30 dark:text-slate-300 [&>.icon]:text-xl`,
        className
      )}
    >
      {isValidElement(icon) && iconPosition === 'start' && (
        <span className='icon'>{icon}</span>
      )}
      {children}
      {isValidElement(icon) && iconPosition === 'end' && (
        <span className='icon'>{icon}</span>
      )}
    </button>
  )
);
Button.displayName = 'Button';

export default Button;
