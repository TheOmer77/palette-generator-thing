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

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ icon, iconPosition = 'start', className, children, ...props }, ref) => (
    <button
      {...props}
      ref={ref}
      className={cn(
        `flex h-9 cursor-default select-none items-center justify-center gap-2
self-center rounded-lg px-3 text-base font-medium text-neutral-700
hover:bg-neutral-50/20 focus-visible:bg-neutral-50/20
focus-visible:outline-none active:bg-neutral-50/30 dark:text-neutral-300 
[&>.icon]:text-xl`,
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