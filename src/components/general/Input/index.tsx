import { forwardRef, type ComponentProps, type ReactNode } from 'react';
import { Primitive } from '@radix-ui/react-primitive';

import { cn } from 'utils';

export interface InputProps extends ComponentProps<'input'> {
  label?: string;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  asChild?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, startAdornment, endAdornment, className, ...props }, ref) => {
    return (
      <div
        className={cn(
          `relative flex h-12 items-center gap-2 rounded-lg bg-white px-2
dark:bg-neutral-950`,
          label && 'mt-6',
          className
        )}
      >
        {startAdornment}
        <Primitive.input
          {...props}
          ref={ref}
          id={id}
          className='peer h-full flex-grow bg-transparent
text-neutral-900 autofill-override-white focus-visible:outline-none
dark:text-neutral-100 dark:autofill-override-neutral-950'
        />
        {endAdornment}
        <div
          className='input-outline pointer-events-none absolute start-0 top-0
h-full w-full rounded-lg  ring-1 ring-neutral-300 peer-focus:ring-2
peer-focus:ring-primary-500 dark:ring-neutral-700
dark:peer-focus:ring-primary-300'
        />
        <label
          htmlFor={id}
          className='absolute -top-6 select-none text-sm
font-medium text-neutral-600 peer-focus:text-primary-500 dark:text-neutral-400 dark:peer-focus:text-primary-300'
        >
          {label}
        </label>
      </div>
    );
  }
);
Input.displayName = 'Input';
