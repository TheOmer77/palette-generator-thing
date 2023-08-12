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
relative mt-6 flex h-12 items-center gap-2 rounded-lg bg-slate-50 px-2 ring-1
ring-slate-300 focus-within:ring-2 dark:bg-slate-950 dark:ring-slate-700`,
        className
      )}
    >
      <label
        htmlFor={id}
        className='absolute -top-6 select-none text-sm font-medium
      text-slate-600 dark:text-slate-400'
      >
        {label}
      </label>
      {startAdornment}
      <input
        {...props}
        ref={ref}
        id={id}
        className='flex-grow bg-transparent text-slate-900 focus-visible:outline-none
        dark:text-slate-100'
      />
      {endAdornment}
    </div>
  )
);
Input.displayName = 'Input';

export default Input;
