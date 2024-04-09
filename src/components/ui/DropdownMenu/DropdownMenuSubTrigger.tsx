'use client';

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import { SubTrigger } from '@radix-ui/react-dropdown-menu';
import { ChevronRight } from 'lucide-react';

import { cn } from '@/lib/utils';

export const DropdownMenuSubTrigger = forwardRef<
  ElementRef<typeof SubTrigger>,
  ComponentPropsWithoutRef<typeof SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <SubTrigger
    ref={ref}
    className={cn(
      `flex cursor-default select-none items-center rounded-sm px-2 py-1.5
text-sm outline-none data-[state=open]:bg-accent focus:bg-accent`,
      inset && 'pl-8',
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className='me-auto' />
  </SubTrigger>
));
DropdownMenuSubTrigger.displayName = SubTrigger.displayName;
