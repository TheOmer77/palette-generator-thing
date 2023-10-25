import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogProps,
  DialogTitle,
} from '@radix-ui/react-dialog';

import { H2 } from '../Headings';
import { cn } from 'utils';

export interface BottomSheetProps
  extends ComponentPropsWithoutRef<'div'>,
    Pick<DialogProps, 'open' | 'onOpenChange'> {
  title?: string;
}

export const BottomSheet = forwardRef<HTMLDivElement, BottomSheetProps>(
  ({ title, open, onOpenChange, className, children, ...props }, ref) => {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogPortal>
          <DialogOverlay
            className='fixed inset-0 z-20 bg-neutral-950/50
data-[state=closed]:animate-fadeout data-[state=open]:animate-fadein print:hidden'
          />
          <DialogContent
            {...props}
            ref={ref}
            className={cn(
              `fixed inset-x-0 bottom-0 z-20 mx-auto flex
max-h-[calc(100vh-4rem)] w-screen max-w-2xl flex-col rounded-t-lg bg-white
text-neutral-950 shadow shadow-neutral-900/50
data-[state=closed]:animate-slideout data-[state=open]:animate-slidein
supports-[height:100dvh]:max-h-[calc(100dvh-4rem)]
dark:bg-neutral-900 dark:text-neutral-50`,
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
    );
  }
);
BottomSheet.displayName = 'BottomSheet';
