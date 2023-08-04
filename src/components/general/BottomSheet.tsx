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

interface BottomSheetProps
  extends ComponentProps<'div'>,
    Pick<DialogProps, 'open' | 'onOpenChange'> {
  title?: string;
}

const BottomSheet = forwardRef<HTMLDivElement, BottomSheetProps>(
  ({ title, open, onOpenChange, className, children, ...props }, ref) => {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogPortal>
          <DialogOverlay className='fixed inset-0 z-20 bg-slate-950/50' />
          <DialogContent
            {...props}
            ref={ref}
            className={cn(
              `fixed bottom-0 start-1/2 z-20 w-screen max-w-2xl
-translate-x-1/2 rounded-t-lg bg-slate-50 p-4 text-slate-950 shadow
shadow-slate-900/50 dark:bg-slate-900 dark:text-slate-50`,
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
