'use client';

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import { Trigger, SelectIcon, SelectValue } from '@radix-ui/react-select';
import { ChevronDownIcon } from 'lucide-react';

import type { SelectExtraProps } from './types';
import { cn } from '@/lib/utils';

type SelectTriggerProps = ComponentPropsWithoutRef<typeof Trigger> &
  SelectExtraProps;

export const SelectTrigger = forwardRef<
  ElementRef<typeof Trigger>,
  SelectTriggerProps
>(
  (
    {
      id,
      label,
      placeholder,
      'aria-label': ariaLabel,
      invalid,
      className,
      ...props
    },
    ref
  ) => (
    <Trigger
      {...props}
      ref={ref}
      id={id}
      aria-label={ariaLabel || label}
      aria-invalid={invalid}
      className={cn(
        `group relative flex h-12 w-full cursor-default items-center
justify-between rounded-md border border-input bg-background px-3 text-sm shadow
ring-0 ring-input transition-[box-shadow,border-color] duration-100
placeholder:text-muted-foreground aria-expanded:border-ring aria-expanded:ring-1
aria-expanded:ring-ring aria-[invalid=true]:border-input-invalid
aria-[invalid=true]:ring-input-invalid focus:border-ring focus:outline-none
focus:ring-1 focus:ring-ring aria-[invalid=true]:focus:border-input-invalid
aria-[invalid=true]:focus:ring-input-invalid disabled:opacity-50
[&:not(:focus):not([aria-invalid=true])]:hover:border-input-hover
[&>[data-select-value]]:select-none [&>span]:line-clamp-1`,
        label && '[&>[data-select-value]]:pt-4',
        className
      )}
    >
      <SelectValue placeholder={placeholder} data-select-value='' />
      {label && (
        <label
          htmlFor={id}
          aria-hidden
          className='pointer-events-none absolute bottom-0 start-0 flex h-12
select-none flex-row items-center px-3 text-sm text-muted-foreground
transition-[font-size,transform,color] group-focus:-translate-y-2.5
group-focus:text-xs group-focus:text-ring group-aria-expanded:-translate-y-2.5
group-aria-expanded:text-xs group-aria-expanded:text-ring
group-aria-[invalid]:text-input-invalid
[[data-select-value]:not(:empty)~&]:-translate-y-2.5
[[data-select-value]:not(:empty)~&]:text-xs'
        >
          {label}
        </label>
      )}
      <SelectIcon asChild>
        <ChevronDownIcon className='text-base' />
      </SelectIcon>
    </Trigger>
  )
);
SelectTrigger.displayName = 'SelectTrigger';
