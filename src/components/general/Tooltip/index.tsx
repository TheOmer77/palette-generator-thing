import type { ReactNode } from 'react';
import {
  Tooltip as TooltipRoot,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger,
  type TooltipContentProps,
} from '@radix-ui/react-tooltip';
import clsx from 'clsx';

export interface TooltipProps
  extends Omit<TooltipContentProps, 'sideOffset' | 'title'> {
  title: ReactNode;
}

export const Tooltip = ({ title, side, className, children }: TooltipProps) => (
  <TooltipProvider>
    <TooltipRoot>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipPortal>
        <TooltipContent
          side={side}
          className={clsx(
            `z-30 select-none rounded-lg bg-neutral-50 p-2 text-sm leading-none
text-neutral-800 shadow-sm shadow-neutral-950/25
will-change-[transform,opacity] data-[state=closed]:animate-fadeout-fast
data-[state=delayed-open]:data-[side=bottom]:animate-slideDownAndFade
data-[state=delayed-open]:data-[side=left]:animate-slideLeftAndFade
data-[state=delayed-open]:data-[side=right]:animate-slideRightAndFade
data-[state=delayed-open]:data-[side=top]:animate-slideUpAndFade
data-[state=instant-open]:data-[side=bottom]:animate-slideDownAndFade
data-[state=instant-open]:data-[side=left]:animate-slideLeftAndFade
data-[state=instant-open]:data-[side=right]:animate-slideRightAndFade
data-[state=instant-open]:data-[side=top]:animate-slideUpAndFade
dark:bg-neutral-900 dark:text-neutral-200`,
            className
          )}
          sideOffset={4}
        >
          {title}
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </TooltipProvider>
);
