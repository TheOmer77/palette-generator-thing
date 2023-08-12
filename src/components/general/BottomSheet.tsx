import { type ComponentProps, forwardRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogProps,
  DialogTitle,
} from '@radix-ui/react-dialog';

import H2 from './H2';
import { cn } from 'utils';

export interface BottomSheetProps
  extends ComponentProps<'div'>,
    Pick<DialogProps, 'open' | 'onOpenChange'> {
  title?: string;
}

const BottomSheet = forwardRef<HTMLDivElement, BottomSheetProps>(
  ({ title, open, onOpenChange, className, children, ...props }, ref) => {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogPortal>
          <DialogOverlay
            className='bg-neutral-5/50 fixed inset-0 z-20
data-[state=closed]:animate-fadeout data-[state=open]:animate-fadein'
          />
          <DialogContent
            {...props}
            ref={ref}
            className={cn(
              `text-neutral-5 bg-neutral-98 dark:text-neutral-98
shadow-neutral-10/50 dark:bg-neutral-10 fixed inset-x-0 bottom-0 z-20 mx-auto
flex w-screen max-w-2xl flex-col rounded-t-lg p-4 shadow
data-[state=closed]:animate-slideout data-[state=open]:animate-slidein`,
              className
            )}
          >
            {title && (
              <DialogTitle asChild>
                <H2>{title}</H2>
              </DialogTitle>
            )}
            {children}
          </DialogContent>
        </DialogPortal>
      </Dialog>
    );
  }
);
BottomSheet.displayName = 'BottomSheet';

export default BottomSheet;
