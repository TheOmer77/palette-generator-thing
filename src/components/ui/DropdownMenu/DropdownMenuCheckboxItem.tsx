'use client';

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import { CheckboxItem, ItemIndicator } from '@radix-ui/react-dropdown-menu';
import { Check } from 'lucide-react';

import { cn } from '@/lib/utils';

export const DropdownMenuCheckboxItem = forwardRef<
  ElementRef<typeof CheckboxItem>,
  ComponentPropsWithoutRef<typeof CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <CheckboxItem
    ref={ref}
    className={cn(
      `relative flex h-10 w-full cursor-default select-none items-center
rounded-sm pe-2 ps-8 text-base outline-none transition-[background-color]
duration-100 state-layer data-[disabled]:pointer-events-none
data-[disabled]:opacity-50 focus:state-layer-muted/30 active:bg-muted/30
active:duration-0 md:h-8 md:text-sm [&>*]:z-10`,
      className
    )}
    checked={checked}
    {...props}
  >
    <ItemIndicator className='absolute start-2.5'>
      <Check />
    </ItemIndicator>
    <span>{children}</span>
  </CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = CheckboxItem.displayName;
