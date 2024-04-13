'use client';

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import { Content, SelectPortal, SelectViewport } from '@radix-ui/react-select';

import { SelectScrollUpButton } from './SelectScrollUpButton';
import { SelectScrollDownButton } from './SelectScrollDownButton';
import { cn } from '@/lib/utils';

export const SelectContent = forwardRef<
  ElementRef<typeof Content>,
  ComponentPropsWithoutRef<typeof Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPortal>
    <Content
      {...props}
      ref={ref}
      className={cn(
        `relative z-50 max-h-96 min-w-32
origin-[--radix-select-content-transform-origin] overflow-hidden rounded-md
bg-popover text-popover-foreground shadow-md
data-[state=closed]:animate-fade-out
data-[state=open]:data-[side=bottom]:animate-scale-y-in
data-[state=open]:data-[side=left]:animate-scale-x-in
data-[state=open]:data-[side=right]:animate-scale-x-in
data-[state=open]:data-[side=top]:animate-scale-y-in print:hidden`,
        position === 'popper' &&
          `data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1
data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1`,
        className
      )}
      position={position}
    >
      <SelectScrollUpButton />
      <SelectViewport
        className={cn(
          'p-1 space-y-px',
          position === 'popper' &&
            `h-[var(--radix-select-trigger-height)] w-full
min-w-[var(--radix-select-trigger-width)]`
        )}
      >
        {children}
      </SelectViewport>
      <SelectScrollDownButton />
    </Content>
  </SelectPortal>
));
SelectContent.displayName = 'SelectContent';
