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
        `hover:bg-neutral-98/20 focus-visible:bg-neutral-98/20
active:bg-neutral-98/30 dark:text-neutral-70 text-neutral-30 flex h-9
cursor-default select-none items-center justify-center gap-2 self-center
rounded-lg px-3 text-base font-medium focus-visible:outline-none
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

export default Button;
