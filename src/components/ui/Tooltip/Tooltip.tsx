'use client';

import type { ReactNode } from 'react';
import {
  Tooltip as TooltipRoot,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger,
  type TooltipContentProps,
} from '@radix-ui/react-tooltip';

import { cn } from '@/lib/utils';

export type TooltipProps = Omit<TooltipContentProps, 'sideOffset' | 'title'> & {
  content: ReactNode;
};

export const Tooltip = ({
  content,
  side,
  className,
  children,
}: TooltipProps) => (
  <TooltipProvider>
    <TooltipRoot>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipPortal>
        <TooltipContent
          side={side}
          className={cn(
            `z-30 select-none rounded-lg bg-popover p-2 text-xs leading-none
text-popover-foreground shadow-sm shadow-neutral-950/25
will-change-[transform,opacity] data-[state=closed]:animate-tooltip-out
data-[state=delayed-open]:animate-tooltip-in
data-[state=instant-open]:animate-tooltip-in
data-[side=bottom]:[--slide-translate-origin-y:-2px]
data-[side=left]:[--slide-translate-origin-x:2px]
data-[side=right]:[--slide-translate-origin-x:-2px]
data-[side=top]:[--slide-translate-origin-y:2px] print:hidden`,
            className
          )}
          sideOffset={4}
        >
          {content}
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </TooltipProvider>
);
