import {
  forwardRef,
  useMemo,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import { ArrowLeftIcon } from 'lucide-react';

import { DrawerHeader, DrawerTitle } from '@/components/ui/Drawer';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { IconButton } from '@/components/ui/IconButton';
import { generatePalette } from '@/lib/colorUtils';
import { cn } from '@/lib/utils';

export type ColorEditPageProps = ComponentPropsWithoutRef<'div'> & {
  title: string;
  color: string;
};

export const ColorEditPage = forwardRef<ElementRef<'div'>, ColorEditPageProps>(
  ({ title, color, className, children, ...props }, ref) => {
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
          <IconButton onClick={() => window.history.back()}>
            <ArrowLeftIcon />
          </IconButton>
          <DrawerTitle className='text-xl'>{title}</DrawerTitle>
        </DrawerHeader>
        <div
          className='mx-4 mb-4 grid h-12 shrink-0 grid-cols-11 overflow-hidden
rounded-lg'
        >
          {palette.map((backgroundColor, index) => (
            <span
              key={index}
              style={{ backgroundColor }}
              className='transition-[background-color]'
            />
          ))}
        </div>
        <ScrollArea
          className='flex-grow
[&>[data-radix-scroll-area-viewport]>div]:space-y-4
[&>[data-radix-scroll-area-viewport]]:px-4
[&>[data-radix-scroll-area-viewport]]:pb-4'
        >
          {children}
        </ScrollArea>
      </div>
    );
  }
);
ColorEditPage.displayName = 'ColorEditPage';