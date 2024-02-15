import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import { ArrowLeftIcon } from 'lucide-react';

import { DrawerHeader, DrawerTitle } from '@/components/ui/Drawer';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { IconButton } from '@/components/ui/IconButton';

export type ColorEditPageProps = ComponentPropsWithoutRef<'div'> & {
  title: string;
};

export const ColorEditPage = forwardRef<ElementRef<'div'>, ColorEditPageProps>(
  ({ title, children, ...props }, ref) => (
    <div {...props} ref={ref}>
      <DrawerHeader className='flex h-14 flex-row items-center gap-4 py-0'>
        <IconButton onClick={() => window.history.back()}>
          <ArrowLeftIcon />
        </IconButton>
        <DrawerTitle className='text-xl'>{title}</DrawerTitle>
      </DrawerHeader>
      <ScrollArea className='[&>[data-radix-scroll-area-viewport]]:h-[calc(100dvh-3.5rem)]'>
        {children}
      </ScrollArea>
    </div>
  )
);
ColorEditPage.displayName = 'ColorEditPage';
