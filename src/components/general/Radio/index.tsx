import { forwardRef } from 'react';
import { ComponentPropsWithoutRef, Primitive } from '@radix-ui/react-primitive';
import { cn } from 'utils';

export interface RadioProps
  extends ComponentPropsWithoutRef<typeof Primitive.button> {
  checked?: boolean;
}

export const Radio = forwardRef<HTMLButtonElement, RadioProps>(
  ({ checked = false, disabled, className, ...props }, ref) => (
    <Primitive.button
      {...props}
      ref={ref}
      disabled={disabled}
      data-state={checked ? 'checked' : 'unchecked'}
      aria-disabled={disabled}
      className={cn(
        `relative flex h-5 w-5 cursor-default items-center
justify-center rounded-full outline-none ring-2 ring-inset ring-neutral-600
transition-[background-color,box-shadow] after:h-2 after:w-2
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
  )
);
Radio.displayName = 'Radio';
