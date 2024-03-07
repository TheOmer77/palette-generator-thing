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
text-foreground shadow ring-1 ring-input transition-shadow duration-100
autofill-override-background invalid:ring-input-invalid
aria-[invalid=true]:ring-input-invalid hover:ring-input-hover
invalid:hover:ring-input-invalid aria-[invalid=true]:hover:ring-input-invalid
focus:outline-none focus:ring-2 focus:ring-ring invalid:focus:ring-input-invalid
aria-[invalid=true]:focus:ring-input-invalid`,
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
transition-[font-size,transform,color] peer-invalid:text-input-invalid
peer-focus:-translate-y-2.5 peer-focus:text-xs peer-focus:text-ring
peer-[:not(:placeholder-shown)]:-translate-y-2.5
peer-[:not(:placeholder-shown)]:text-xs
peer-aria-[invalid=true]:text-input-invalid'
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';
