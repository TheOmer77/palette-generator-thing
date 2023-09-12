import { forwardRef } from 'react';
import { ComponentPropsWithoutRef, Primitive } from '@radix-ui/react-primitive';
import { cn } from 'utils';

export interface RadioProps
  extends ComponentPropsWithoutRef<typeof Primitive.button> {
  checked?: boolean;
}

export const Radio = forwardRef<HTMLButtonElement, RadioProps>(
  ({ checked = false, className, ...props }, ref) => (
    <Primitive.button
      {...props}
      ref={ref}
      data-state={checked ? 'checked' : 'unchecked'}
      className={cn(
        `radio border-box relative flex h-6 w-6 cursor-default items-center
justify-center rounded-full border-2 border-neutral-500 outline-none
data-[state=checked]:border-none data-[state=checked]:bg-primary-600
data-[state=checked]:after:block data-[state=checked]:after:h-3
data-[state=checked]:after:w-3 data-[state=checked]:after:rounded-full
data-[state=checked]:after:bg-white data-[state=checked]:after:content-['']
dark:data-[state=checked]:bg-primary-200
dark:data-[state=checked]:after:bg-primary-900`,
        className
      )}
    />
  )
);
Radio.displayName = 'Radio';
