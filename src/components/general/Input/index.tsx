import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
  useState,
  useEffect,
} from 'react';
import { Primitive } from '@radix-ui/react-primitive';

import { cn } from 'utils';

export interface InputProps
  extends ComponentPropsWithoutRef<typeof Primitive.input> {
  label?: string;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      value,
      onChange,
      label,
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
          `relative flex h-14 items-center gap-2 rounded-lg bg-white px-3
dark:bg-neutral-950`,
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
          className={cn(
            `peer h-full flex-grow bg-transparent
text-neutral-900 autofill-override-white focus-visible:outline-none
dark:text-neutral-100 dark:autofill-override-neutral-950`,
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
              `peer-place pointer-events-none absolute select-none
text-base text-neutral-600 transition-[font-size,transform,color]
peer-focus:-translate-y-3 peer-focus:text-sm peer-focus:text-primary-500
dark:text-neutral-400 dark:peer-focus:text-primary-300`,
              (startAdornment || value || (!value && uncontrolledHasValue)) &&
                '-translate-y-3 text-sm'
            )}
          >
            {label}
          </label>
        )}
        <div
          className='input-outline pointer-events-none absolute start-0 top-0
h-full w-full rounded-lg ring-1 ring-neutral-300 transition-shadow
peer-focus:ring-2 peer-focus:ring-primary-500 dark:ring-neutral-700
dark:peer-focus:ring-primary-300'
        />
      </div>
    );
  }
);
Input.displayName = 'Input';
