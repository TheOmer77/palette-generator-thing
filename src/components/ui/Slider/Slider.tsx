'use client';

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import {
  Slider as SliderRoot,
  SliderRange,
  SliderThumb,
  SliderTrack,
} from '@radix-ui/react-slider';

import { cn } from '@/lib/utils';

export const Slider = forwardRef<
  ElementRef<typeof SliderRoot>,
  ComponentPropsWithoutRef<typeof SliderRoot>
>(({ className, ...props }, ref) => (
  <SliderRoot
    ref={ref}
    className={cn(
      `relative flex touch-none select-none data-[orientation=vertical]:h-full
data-[orientation=horizontal]:w-full data-[orientation=horizontal]:items-center
data-[orientation=vertical]:justify-center`,
      className
    )}
    {...props}
  >
    <SliderTrack
      data-slider-track=''
      className='relative grow overflow-hidden rounded-full bg-muted
      data-[orientation=horizontal]:h-2 data-[orientation=vertical]:h-full
      data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-2'
    >
      <SliderRange
        data-slider-range=''
        className='absolute bg-primary data-[orientation=horizontal]:h-full
        data-[orientation=vertical]:w-full'
      />
    </SliderTrack>
    <SliderThumb
      data-slider-thumb=''
      className='block h-5 w-5 rounded-full border-2 border-primary
bg-background ring-offset-background transition-colors
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
    />
  </SliderRoot>
));
Slider.displayName = SliderRoot.displayName;
