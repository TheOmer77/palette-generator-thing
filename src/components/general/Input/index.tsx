import { forwardRef, type ComponentProps, type ReactNode } from 'react';
import { Slot } from '@radix-ui/react-slot';

import { cn } from 'utils';

export interface InputProps extends ComponentProps<'input'> {
  label?: string;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  asChild?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      startAdornment,
      endAdornment,
      asChild = false,
      className,
      ...props
    },
    ref
  ) => {
    const InputComponent = asChild ? Slot : 'input';
    return (
      <div
        className={cn(
          `relative flex h-12 items-center gap-2 rounded-lg bg-white px-2
ring-1 ring-neutral-300 focus-within:ring-2 focus-within:ring-primary-500
dark:bg-neutral-950 dark:ring-neutral-700 dark:focus-within:ring-primary-300
[&>label]:focus-within:text-primary-500
dark:[&>label]:focus-within:text-primary-300`,
          label && 'mt-6',
          className
        )}
      >
        <label
          htmlFor={id}
          className='absolute -top-6 select-none text-sm font-medium
text-neutral-600 dark:text-neutral-400'
        >
          {label}
        </label>
        {startAdornment}
        <InputComponent
          {...props}
          ref={ref}
          id={id}
          className='flex-grow bg-transparent text-neutral-900
autofill-override-white focus-visible:outline-none dark:text-neutral-100
dark:autofill-override-neutral-950'
        />
        {endAdornment}
      </div>
    );
  }
);
Input.displayName = 'Input';
