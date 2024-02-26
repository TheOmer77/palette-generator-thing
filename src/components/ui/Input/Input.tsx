import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/lib/utils';

export type InputProps = ComponentPropsWithoutRef<'input'> & {
  label?: string;
  invalid?: boolean;
  asChild?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      value,
      label,
      placeholder,
      'aria-label': ariaLabel,
      invalid,
      asChild,
      className,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'input';
    return (
      <div className='relative'>
        <Comp
          {...props}
          ref={ref}
          id={id}
          value={value}
          placeholder={placeholder || label}
          aria-label={ariaLabel || label}
          aria-invalid={invalid}
          className={cn(
            `peer h-12 w-full rounded-lg bg-background px-3 text-sm
text-foreground ring-1 ring-input transition-shadow autofill-override-background
invalid:ring-danger-600 aria-[invalid=true]:ring-danger-600 focus:outline-none
focus:ring-2 focus:ring-ring invalid:focus:ring-danger-600
aria-[invalid=true]:focus:ring-danger-600 dark:invalid:ring-danger-300
dark:aria-[invalid=true]:ring-danger-300 dark:invalid:focus:ring-danger-300
dark:aria-[invalid=true]:focus:ring-danger-300`,
            label &&
              'pt-4 placeholder:opacity-0 placeholder:transition-opacity',
            placeholder && 'focus:placeholder:opacity-100',
            className
          )}
        />
        {label && (
          <label
            htmlFor={id}
            aria-hidden
            className='pointer-events-none absolute bottom-0 start-0 flex h-12
select-none flex-row items-center px-3 text-sm text-muted-foreground
transition-[font-size,transform,color] peer-invalid:text-danger
peer-focus:-translate-y-2.5 peer-focus:text-xs peer-focus:text-primary-500
peer-[:not(:placeholder-shown)]:-translate-y-2.5
peer-[:not(:placeholder-shown)]:text-xs peer-aria-[invalid=true]:text-danger
dark:peer-invalid:text-danger-300 dark:peer-focus:text-primary-300
dark:peer-aria-[invalid=true]:text-danger-300'
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';
