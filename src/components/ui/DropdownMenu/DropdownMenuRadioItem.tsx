'use client';

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import { ItemIndicator, RadioItem } from '@radix-ui/react-dropdown-menu';
import { Circle } from 'lucide-react';

import { cn } from '@/lib/utils';

export const DropdownMenuRadioItem = forwardRef<
  ElementRef<typeof RadioItem>,
  ComponentPropsWithoutRef<typeof RadioItem>
>(({ className, children, ...props }, ref) => (
  <RadioItem
    ref={ref}
    className={cn(
      `relative flex cursor-default select-none items-center rounded-sm py-1.5
pl-8 pr-2 text-sm outline-none transition-colors
data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent
focus:text-accent-foreground`,
      className
    )}
    {...props}
  >
    <span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
      <ItemIndicator>
        <Circle className='fill-current h-2 w-2' />
      </ItemIndicator>
    </span>
    {children}
  </RadioItem>
));
DropdownMenuRadioItem.displayName = RadioItem.displayName;
