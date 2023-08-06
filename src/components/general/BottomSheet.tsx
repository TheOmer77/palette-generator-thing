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
import cn from 'utils/cn';

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
            className='fixed inset-0 z-20 bg-slate-950/50
data-[state=closed]:animate-fadeout data-[state=open]:animate-fadein'
          />
          <DialogContent
            {...props}
            ref={ref}
            className={cn(
              `fixed inset-x-0 bottom-0 z-20 mx-auto flex w-screen max-w-2xl
flex-col rounded-t-lg bg-slate-50 p-4 text-slate-950 shadow shadow-slate-900/50
data-[state=closed]:animate-slideout data-[state=open]:animate-slidein
dark:bg-slate-900 dark:text-slate-50`,
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
