import { forwardRef, isValidElement } from 'react';
import { cn } from 'utils';
import type { ButtonProps } from './Button';

const Fab = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ icon, iconPosition = 'start', className, children, ...props }, ref) => (
    <button
      {...props}
      ref={ref}
      className={cn(
        `focus-visible:bg-primary-70 active:bg-primary-90 dark:text-primary-80
text-primary-20 dark:shadow-primary-20/50 dark:bg-primary-10 bg-primary-95
dark:focus-visible:bg-primary-20 dark:active:bg-primary-20 shadow-primary-50/50
hover:after:bg-primary-50/10 fixed bottom-4 end-4 z-10 flex h-14 cursor-default
select-none items-center justify-center gap-3 self-center overflow-hidden
rounded-lg text-base font-medium shadow after:absolute after:start-0
after:top-0 after:h-full after:w-full after:content-[""]
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
