import {
  forwardRef,
  useMemo,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import { ArrowLeftIcon } from 'lucide-react';

import { PalettePreview } from '@/components/layout/BaseColors';
import { DrawerHeader, DrawerTitle } from '@/components/ui/Drawer';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { IconButton } from '@/components/ui/IconButton';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { useModal } from '@/hooks/useModal';
import { useVirtualKeyboardOpen } from '@/hooks/useVirtualKeyboardOpen';
import { generatePalette } from '@/lib/colorUtils';
import { cn } from '@/lib/utils';

export type ColorEditPageProps = ComponentPropsWithoutRef<'div'> & {
  title: string;
  color: string;
};

export const ColorEditPage = forwardRef<ElementRef<'div'>, ColorEditPageProps>(
  ({ title, color, className, children, ...props }, ref) => {
    const { closeModal } = useModal();
    const matchesMd = useBreakpoint('md');
    const virtualKeyboardOpen = useVirtualKeyboardOpen();

    const palette = useMemo(() => generatePalette(color), [color]);

    return (
      <div
        {...props}
        ref={ref}
        className={cn('flex h-full flex-col', className)}
      >
        <DrawerHeader
          className='flex h-16 shrink-0 flex-row items-center gap-4
py-0'
        >
          <IconButton
            variant='flat'
            size={matchesMd ? 'md' : 'lg'}
            onClick={() => closeModal()}
          >
            <ArrowLeftIcon />
          </IconButton>
          <DrawerTitle className='text-xl'>{title}</DrawerTitle>
        </DrawerHeader>
        <PalettePreview palette={palette} />
        <ScrollArea
          className={cn(
            '[&>[data-radix-scroll-area-viewport]]:px-4 [&>[data-radix-scroll-area-viewport]]:pb-4',
            virtualKeyboardOpen ? 'mt-auto' : 'flex-grow'
          )}
        >
          {children}
        </ScrollArea>
      </div>
    );
  }
);
ColorEditPage.displayName = 'ColorEditPage';
