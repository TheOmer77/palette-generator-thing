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
        `relative mt-6 flex h-12 items-center gap-2 rounded-lg bg-white px-2
ring-1 ring-neutral-70 focus-within:ring-2 focus-within:ring-primary-500
dark:bg-black dark:ring-neutral-30 dark:focus-within:ring-primary-300
[&>label]:focus-within:text-primary-500
dark:[&>label]:focus-within:text-primary-300`,
        className
      )}
    >
      <label
        htmlFor={id}
        className='absolute -top-6 select-none text-sm font-medium
text-neutral-40 dark:text-neutral-60'
      >
        {label}
      </label>
      {startAdornment}
      <input
        {...props}
        ref={ref}
        id={id}
        className='flex-grow bg-transparent text-neutral-10
focus-visible:outline-none dark:text-neutral-90'
      />
      {endAdornment}
    </div>
  )
);
Input.displayName = 'Input';

export default Input;
