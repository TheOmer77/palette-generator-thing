'use client';

import {
  forwardRef,
  useState,
  useEffect,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';
import { Primitive } from '@radix-ui/react-primitive';

import { cn } from '@/lib/utils';

export type InputProps = ComponentPropsWithoutRef<typeof Primitive.input> & {
  label?: string;
  invalid?: boolean;
  helperText?: string;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      value,
      onChange,
      label,
      invalid,
      helperText,
      startAdornment,
      endAdornment,
      className,
      ...props
    },
    ref
  ) => {
    const [uncontrolledHasValue, setUncontrolledHasValue] = useState(false);
    useEffect(() => {
      if (value && uncontrolledHasValue) setUncontrolledHasValue(false);
    }, [uncontrolledHasValue, value]);

    return (
      <div
        className={cn(
          `relative flex h-12 items-center gap-2 rounded-lg bg-background px-1`,
          typeof helperText === 'string' && helperText.length > 0 && `mb-7`,
          className
        )}
      >
        {startAdornment &&
          (label ? (
            <div className='flex h-full flex-row items-center gap-2 pt-4'>
              {startAdornment}
            </div>
          ) : (
            startAdornment
          ))}
        <Primitive.input
          {...props}
          ref={ref}
          id={id}
          value={value}
          aria-label={label}
          aria-invalid={invalid}
          className={cn(
            `peer h-full flex-grow bg-transparent px-2 text-sm
text-foreground autofill-override-background focus-visible:outline-none`,
            label &&
              `pt-4 placeholder:opacity-0 placeholder:transition-opacity
focus:placeholder:opacity-100`
          )}
          onChange={e => {
            if (!value) setUncontrolledHasValue(!!e.target.value);
            onChange?.(e);
          }}
        />
        {endAdornment}
        {label && (
          <label
            htmlFor={id}
            aria-hidden
            className={cn(
              `pointer-events-none absolute select-none px-2 text-sm
text-muted-foreground transition-[font-size,transform,color]
peer-invalid:text-danger-600 peer-focus:-translate-y-2.5 peer-focus:text-xs
peer-focus:text-primary-500 peer-aria-[invalid=true]:text-danger-600
dark:peer-invalid:text-danger-300 dark:peer-focus:text-primary-300
dark:peer-aria-[invalid=true]:text-danger-300`,
              (startAdornment || value || (!value && uncontrolledHasValue)) &&
                '-translate-y-2.5 text-xs'
            )}
          >
            {label}
          </label>
        )}
        <div
          className='input-outline pointer-events-none absolute start-0 top-0
h-full w-full rounded-lg ring-1 ring-input transition-shadow
peer-invalid:ring-danger peer-focus:ring-2 peer-focus:ring-ring
peer-aria-[invalid=true]:ring-danger'
        />
        {typeof helperText === 'string' && helperText.length > 0 && (
          <span
            className='absolute top-[3.75rem] select-none text-xs
text-muted-foreground peer-invalid:text-danger-600
peer-aria-[invalid=true]:text-danger-600 dark:text-neutral-300
dark:peer-invalid:text-danger-300
dark:peer-aria-[invalid=true]:text-danger-300'
          >
            {helperText}
          </span>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';
