import {
  forwardRef,
  useCallback,
  useMemo,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import { useEventListener } from 'usehooks-ts';
import { ArrowLeftIcon } from 'lucide-react';

import { DrawerHeader, DrawerTitle } from '@/components/ui/Drawer';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { IconButton } from '@/components/ui/IconButton';
import { useOptionsDrawer } from '@/store/useOptionsDrawer';
import { generatePalette } from '@/lib/colorUtils';

export type ColorEditPageProps = ComponentPropsWithoutRef<'div'> & {
  title: string;
  color: string;
  onColorSave?: (color: string) => void;
};

export const ColorEditPage = forwardRef<ElementRef<'div'>, ColorEditPageProps>(
  ({ title, color, onColorSave, children, ...props }, ref) => {
    const { saveToSearchParams } = useOptionsDrawer();
    const palette = useMemo(() => generatePalette(color), [color]);

    const handleColorSave = useCallback(() => {
      onColorSave?.(color);
      saveToSearchParams();
    }, [color, onColorSave, saveToSearchParams]);

    useEventListener('popstate', handleColorSave);

    return (
      <div {...props} ref={ref}>
        <DrawerHeader className='flex h-16 flex-row items-center gap-4 py-0'>
          <IconButton onClick={() => window.history.back()}>
            <ArrowLeftIcon />
          </IconButton>
          <DrawerTitle className='text-xl'>{title}</DrawerTitle>
        </DrawerHeader>
        <div className='mx-4 mb-4 grid h-12 grid-cols-11 overflow-hidden rounded-lg'>
          {palette.map((backgroundColor, index) => (
            <span
              key={index}
              style={{ backgroundColor }}
              className='transition-[background-color]'
            />
          ))}
        </div>
        <ScrollArea
          className='[&>[data-radix-scroll-area-viewport]>div]:space-y-4
[&>[data-radix-scroll-area-viewport]]:h-[calc(100dvh-8rem)]
[&>[data-radix-scroll-area-viewport]]:px-4'
        >
          {children}
        </ScrollArea>
      </div>
    );
  }
);
ColorEditPage.displayName = 'ColorEditPage';
