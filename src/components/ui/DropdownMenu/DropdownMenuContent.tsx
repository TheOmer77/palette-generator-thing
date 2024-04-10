'use client';

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import { Content, Portal } from '@radix-ui/react-dropdown-menu';

import { cn } from '@/lib/utils';

export const DropdownMenuContent = forwardRef<
  ElementRef<typeof Content>,
  ComponentPropsWithoutRef<typeof Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <Portal>
    <Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        `z-50 min-w-32 origin-[--radix-dropdown-menu-content-transform-origin]
space-y-px overflow-hidden rounded-md bg-popover p-1 text-popover-foreground
shadow-md data-[state=closed]:animate-fade-out
data-[state=open]:data-[side=bottom]:animate-scale-y-in
data-[state=open]:data-[side=left]:animate-scale-x-in
data-[state=open]:data-[side=right]:animate-scale-x-in
data-[state=open]:data-[side=top]:animate-scale-y-in print:hidden
[&>[role=group]]:space-y-px`,
        className
      )}
      {...props}
    />
  </Portal>
));
DropdownMenuContent.displayName = Content.displayName;
