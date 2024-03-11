'use client';

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import { Trigger } from '@radix-ui/react-tabs';

import { cn } from '@/lib/utils';

export const TabsTrigger = forwardRef<
  ElementRef<typeof Trigger>,
  ComponentPropsWithoutRef<typeof Trigger>
>(({ className, ...props }, ref) => (
  <Trigger
    ref={ref}
    className={cn(
      `inline-flex cursor-default items-center justify-center whitespace-nowrap
rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all
duration-100 state-layer data-[state=active]:bg-background
data-[state=active]:text-foreground data-[state=active]:shadow-sm
hover:state-layer-foreground/5 focus-visible:outline-none focus-visible:ring-2
focus-visible:ring-ring focus-visible:ring-offset-2 active:bg-foreground/10
active:duration-0 active:data-[state=active]:bg-neutral-100
disabled:pointer-events-none disabled:opacity-50
dark:active:data-[state=active]:bg-neutral-900`,
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = 'TabsTrigger';
