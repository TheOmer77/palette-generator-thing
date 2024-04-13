'use client';

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import { ItemIndicator, RadioItem } from '@radix-ui/react-dropdown-menu';
import { CircleIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

export const DropdownMenuRadioItem = forwardRef<
  ElementRef<typeof RadioItem>,
  ComponentPropsWithoutRef<typeof RadioItem>
>(({ className, children, ...props }, ref) => (
  <RadioItem
    ref={ref}
    className={cn(
      `relative flex h-10 w-full cursor-default select-none items-center
rounded-sm pe-2 ps-8 text-base outline-none transition-[background-color]
duration-100 state-layer data-[disabled]:pointer-events-none
data-[disabled]:opacity-50 focus:state-layer-muted/30 active:bg-muted/30
active:duration-0 md:h-8 md:text-sm [&>*]:z-10`,
      className
    )}
    {...props}
  >
    <ItemIndicator className='absolute start-2.5'>
      <CircleIcon className='fill-current text-[0.625rem] md:text-[0.5rem]' />
    </ItemIndicator>
    <span>{children}</span>
  </RadioItem>
));
DropdownMenuRadioItem.displayName = RadioItem.displayName;
