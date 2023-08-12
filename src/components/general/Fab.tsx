import { forwardRef, isValidElement } from 'react';
import { cn } from 'utils';
import type { ButtonProps } from './Button';

const Fab = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ icon, iconPosition = 'start', className, children, ...props }, ref) => (
    <button
      {...props}
      ref={ref}
      className={cn(
        `focus-visible:bg-neutral-70 active:bg-neutral-80 dark:text-neutral-70
text-neutral-30 dark:shadow-neutral-30/50 dark:bg-neutral-10 bg-neutral-90
dark:focus-visible:bg-neutral-20 dark:active:bg-neutral-20 fixed bottom-4 end-4
z-10 flex h-14 cursor-default select-none items-center justify-center gap-3
self-center overflow-hidden rounded-lg text-base font-medium shadow
shadow-neutral-50/50 after:absolute after:start-0 after:top-0 after:h-full
after:w-full after:content-[""] hover:after:bg-neutral-50/10
focus-visible:outline-none [&>.icon]:text-2xl`,
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
