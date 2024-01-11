'use client';

import { forwardRef, useContext } from 'react';
import {
  Primitive,
  type ComponentPropsWithoutRef,
} from '@radix-ui/react-primitive';
import { cn } from '@/utils';
import { RadioGroupContext } from './context';

export interface RadioProps
  extends ComponentPropsWithoutRef<typeof Primitive.button> {
  checked?: boolean;
  value?: string;
}

export const Radio = forwardRef<HTMLButtonElement, RadioProps>(
  ({ value, checked = false, disabled, className, onClick, ...props }, ref) => {
    const { value: groupValue, onValueChange } = useContext(RadioGroupContext);
    const _checked = checked || (!!value && value === groupValue);

    return (
      <Primitive.button
        {...props}
        ref={ref}
        disabled={disabled}
        data-state={_checked ? 'checked' : 'unchecked'}
        aria-checked={_checked}
        aria-disabled={disabled}
        onClick={e => {
          if (value !== groupValue) onValueChange?.(value);
          onClick?.(e);
        }}
        className={cn(
          `relative flex h-em w-em cursor-default items-center justify-center
rounded-full p-[0.3125rem] outline-none ring-[1.5px] ring-inset ring-neutral-600
transition-[background-color,box-shadow] after:h-full after:w-full
after:scale-0 after:rounded-full after:bg-white after:transition-transform
after:content-[''] aria-disabled:ring-neutral-400
data-[state=checked]:bg-primary-500 data-[state=checked]:ring-0
data-[state=checked]:after:block data-[state=checked]:after:scale-100
disabled:ring-neutral-400 dark:ring-neutral-400 dark:after:bg-primary-900
dark:aria-disabled:ring-neutral-600 dark:data-[state=checked]:bg-primary-300
dark:disabled:ring-neutral-600`,
          className
        )}
      />
    );
  }
);
Radio.displayName = 'Radio';
