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
            `peer h-14 w-full rounded-lg border border-input bg-background px-3
text-base text-foreground shadow ring-0 ring-input
transition-[box-shadow,border-color] duration-100 autofill-override-background
invalid:border-input-invalid invalid:ring-input-invalid
aria-[invalid=true]:border-input-invalid aria-[invalid=true]:ring-input-invalid
focus:border-ring focus:outline-none focus:ring-1
invalid:focus:border-input-invalid
aria-[invalid=true]:focus:border-input-invalid md:h-12 md:text-sm
[&:focus:not(:invalid):not([aria-invalid=true])]:ring-ring
[&:hover:not(:focus):not(:invalid):not([aria-invalid=true])]:border-input-hover`,
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
            className='pointer-events-none absolute bottom-0 start-0 flex h-14
select-none flex-row items-center px-3 text-base text-muted-foreground
transition-[font-size,transform,color] peer-invalid:text-input-invalid
peer-focus:-translate-y-3 peer-focus:text-xs peer-focus:text-ring
peer-[:not(:placeholder-shown)]:-translate-y-3
peer-[:not(:placeholder-shown)]:text-xs
peer-aria-[invalid=true]:text-input-invalid md:h-12 md:text-sm
md:peer-focus:-translate-y-2.5
md:peer-[:not(:placeholder-shown)]:-translate-y-2.5'
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';
