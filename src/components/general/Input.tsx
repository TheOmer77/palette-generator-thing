import { forwardRef, ReactNode, ComponentProps } from 'react';
import { cn } from 'utils';

export interface InputProps extends ComponentProps<'input'> {
  label?: string;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, startAdornment, endAdornment, className, ...props }, ref) => (
    <div
      className={cn(
        `focus-within:ring-primary-40 [&>label]:focus-within:text-primary-40
dark:focus-within:ring-primary-70 dark:[&>label]:focus-within:text-primary-70
dark:bg-neutral-5 bg-neutral-98 ring-neutral-70 dark:ring-neutral-30 relative
mt-6 flex h-12 items-center gap-2 rounded-lg px-2 ring-1 focus-within:ring-2`,
        className
      )}
    >
      <label
        htmlFor={id}
        className='dark:text-neutral-60 text-neutral-40 absolute -top-6 select-none
      text-sm font-medium'
      >
        {label}
      </label>
      {startAdornment}
      <input
        {...props}
        ref={ref}
        id={id}
        className='text-neutral-10 dark:text-neutral-90 flex-grow bg-transparent
        focus-visible:outline-none'
      />
      {endAdornment}
    </div>
  )
);
Input.displayName = 'Input';

export default Input;
