import {
  useMemo,
  type CSSProperties,
  type ComponentPropsWithoutRef,
} from 'react';
import { HexColorPicker } from 'react-colorful';
import { formatHex, modeHsl, useMode as loadMode } from 'culori/fn';

import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/Slider';
import type { SliderProps } from '@radix-ui/react-slider';

export type ColorPickerProps = Omit<
  ComponentPropsWithoutRef<typeof HexColorPicker>,
  'color'
> & {
  value?: ComponentPropsWithoutRef<typeof HexColorPicker>['color'];
  orientation?: SliderProps['orientation'];
};

const hsl = loadMode(modeHsl);

export const ColorPicker = ({
  value,
  onChange,
  orientation = 'vertical',
  className,
  ...props
}: ColorPickerProps) => {
  const valueHsl = useMemo(() => hsl(value), [value]);

  return (
    <div
      className={cn(
        /* Using String.raw due to underscores in targeted classnames
      https://github.com/tailwindlabs/tailwindcss/issues/8881#issuecomment-1208600668 */
        String.raw`mx-auto flex h-full w-full max-w-sm gap-4
[&_.react-colorful>:not(.react-colorful\_\_saturation)]:hidden
[&_.react-colorful\_\_interactive:focus_.react-colorful\_\_pointer]:scale-100
[&_.react-colorful\_\_pointer]:h-5 [&_.react-colorful\_\_pointer]:w-5
[&_.react-colorful\_\_pointer]:-translate-x-1/2
[&_.react-colorful\_\_pointer]:-translate-y-1/2
[&_.react-colorful\_\_pointer]:border-2
[&_.react-colorful\_\_pointer]:border-white
[&_.react-colorful\_\_pointer]:shadow-sm
[&_.react-colorful\_\_saturation]:aspect-square
[&_.react-colorful\_\_saturation]:w-full
[&_.react-colorful\_\_saturation]:rounded-lg
[&_.react-colorful\_\_saturation]:border-none
[&_.react-colorful]:h-full [&_.react-colorful]:w-full`,
        orientation === 'horizontal' ? 'flex-row' : 'flex-col',
        className
      )}
    >
      <HexColorPicker {...props} color={value} onChange={onChange} />
      <Slider
        data-hue-slider=''
        orientation={orientation === 'horizontal' ? 'vertical' : 'horizontal'}
        inverted={orientation === 'horizontal'}
        min={0}
        max={360}
        value={[valueHsl?.h || 0]}
        onValueChange={([value]) =>
          // BUG: value = 360 actually sets hue to 0
          // Need to use internal HSL state instead of directly parsing value prop
          onChange?.(
            formatHex({
              mode: 'hsl',
              h: value,
              s: valueHsl?.s || 0,
              l: valueHsl?.l || 0,
            })
          )
        }
        style={
          {
            '--thumb-color': `hsl(${valueHsl?.h || 0} 100% 50%)`,
            '--gradient-angle':
              orientation === 'horizontal' ? '180deg' : '90deg',
          } as CSSProperties
        }
        className='data-[orientation=vertical]:h-auto
[&_[data-slider-range]]:bg-transparent [&_[data-slider-thumb]]:border-white
[&_[data-slider-thumb]]:bg-[--thumb-color] [&_[data-slider-thumb]]:shadow-sm
[&_[data-slider-thumb]]:transition-none
[&_[data-slider-track]]:bg-[linear-gradient(var(--gradient-angle),red_0,#ff0_17%,#0f0_33%,#0ff_50%,#00f_67%,#f0f_83%,red)]'
      />
    </div>
  );
};
