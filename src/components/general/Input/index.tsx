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
dark:bg-neutral-950`,
          label && 'mt-6',
          className
        )}
      >
        {startAdornment}
        <InputComponent
          {...props}
          ref={ref}
          id={id}
          className='flex-grow bg-transparent text-neutral-900
autofill-override-white focus-visible:outline-none dark:text-neutral-100
dark:autofill-override-neutral-950 [&+.input-outline>label]:focus:text-primary-500
dark:[&+.input-outline>label]:focus:text-primary-300
[&+.input-outline]:focus:ring-2
[&+.input-outline]:focus:ring-primary-500
dark:[&+.input-outline]:focus:ring-primary-300'
        />
        <div
          className='input-outline pointer-events-none absolute start-0 top-0
h-full w-full rounded-lg ring-1 ring-neutral-300 dark:ring-neutral-700'
        >
          <label
            htmlFor={id}
            className='pointer-events-auto absolute -top-6 select-none text-sm
font-medium text-neutral-600 dark:text-neutral-400'
          >
            {label}
          </label>
        </div>
        {endAdornment}
      </div>
    );
  }
);
Input.displayName = 'Input';
