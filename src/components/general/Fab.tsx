import { forwardRef, isValidElement } from 'react';
import { cn } from 'utils';
import type { ButtonProps } from './Button';

const Fab = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ icon, iconPosition = 'start', className, children, ...props }, ref) => (
    <button
      {...props}
      ref={ref}
      className={cn(
        `fixed bottom-4 end-4 z-10 flex h-14 cursor-default select-none
items-center justify-center gap-3 self-center overflow-hidden rounded-lg
bg-primary-50 text-base font-medium text-primary-800 shadow shadow-primary-800/50
after:absolute after:start-0 after:top-0 after:h-full after:w-full
after:content-[""] hover:after:bg-primary-500/10 focus-visible:bg-primary-100
focus-visible:outline-none active:bg-primary-100 dark:bg-primary-800
dark:text-primary-200 dark:focus-visible:bg-primary-700 dark:active:bg-primary-700
[&>.icon]:text-2xl`,
        isValidElement(icon) && !children ? 'w-14' : 'px-4',
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
Fab.displayName = 'Fab';

export default Fab;
