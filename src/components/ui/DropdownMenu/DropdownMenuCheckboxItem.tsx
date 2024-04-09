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
      `relative flex cursor-default select-none items-center rounded-sm py-1.5
pl-8 pr-2 text-sm outline-none transition-colors
data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent
focus:text-accent-foreground`,
      className
    )}
    checked={checked}
    {...props}
  >
    <span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
      <ItemIndicator>
        <Check className='h-4 w-4' />
      </ItemIndicator>
    </span>
    {children}
  </CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = CheckboxItem.displayName;
