'use client';

import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  type DialogProps,
} from '@radix-ui/react-dialog';

import { H2 } from '../Headings';
import { cn } from '@/lib/utils';

export type BottomSheetProps = ComponentPropsWithoutRef<'div'> &
  Pick<DialogProps, 'open' | 'onOpenChange'> & {
    title?: string;
  };

export const BottomSheet = forwardRef<HTMLDivElement, BottomSheetProps>(
  ({ title, open, onOpenChange, className, children, ...props }, ref) => (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay
          className='fixed inset-0 z-20 bg-neutral-950/50
data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in
print:hidden'
        />
        <DialogContent
          {...props}
          ref={ref}
          className={cn(
            `fixed inset-x-0 bottom-0 z-20 mx-auto flex
max-h-[calc(100dvh-4rem)] w-screen max-w-2xl flex-col rounded-t-lg bg-background
text-foreground shadow shadow-neutral-900/50 [--slide-translate-origin-y:100%]
data-[state=closed]:animate-slide-out data-[state=open]:animate-slide-in
dark:bg-card`,
            className
          )}
        >
          {title && (
            <DialogTitle asChild className='m-0 px-4 py-3'>
              <H2>{title}</H2>
            </DialogTitle>
          )}
          <div className='overflow-y-auto'>{children}</div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
);
BottomSheet.displayName = 'BottomSheet';
