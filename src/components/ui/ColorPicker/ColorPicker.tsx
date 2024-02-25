import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type ComponentPropsWithoutRef,
} from 'react';
import { HslColorPicker, type HslColor } from 'react-colorful';
import { formatHex, modeHsl, useMode as loadMode, type Color } from 'culori/fn';
import type { SliderProps } from '@radix-ui/react-slider';

import { Slider } from '@/components/ui/Slider';
import { cn } from '@/lib/utils';

export type ColorPickerProps = Omit<
  ComponentPropsWithoutRef<typeof HslColorPicker>,
  'color' | 'onChange'
> & {
  value?: string;
  onChange?: (newValue: string) => void;
  orientation?: SliderProps['orientation'];
};

const hsl = loadMode(modeHsl);
const pickerHsl = (color?: string | Color) => {
  const hslValue = hsl(color);
  return {
    h: hslValue?.h || 0,
    s: (hslValue?.s || 0) * 100,
    l: (hslValue?.l || 0) * 100,
  } satisfies HslColor;
};

export const ColorPicker = ({
  value,
  onChange,
  orientation = 'vertical',
  className,
  ...props
}: ColorPickerProps) => {
  const [internalValue, setInternalValue] = useState<HslColor>(
    pickerHsl(value)
  );

  const sliderVars = useMemo(
    () =>
      ({
        '--thumb-color': `hsl(${internalValue.h} 100% 50%)`,
        '--gradient-angle': orientation === 'horizontal' ? '180deg' : '90deg',
      }) as CSSProperties,
    [internalValue.h, orientation]
  );

  const handleValueChange = useCallback(
    (hslColor: Partial<HslColor>) => {
      const prevValueHsl = { ...internalValue },
        newValueHsl = { ...prevValueHsl, ...hslColor };

      setInternalValue(prev => ({ ...prev, ...hslColor }));

      const valueHex = formatHex(value),
        newValueHex = formatHex({
          mode: 'hsl',
          h: newValueHsl.h,
          s: newValueHsl.s / 100,
          l: newValueHsl.l / 100,
        });
      if (valueHex !== newValueHex) onChange?.(newValueHex);
    },
    [internalValue, onChange, value]
  );

  useEffect(() => {
    // Reformat as hex to handle 3 digit hex colors
    const valueHex = formatHex(value),
      internalValueHex = formatHex({
        mode: 'hsl',
        h: internalValue.h,
        s: internalValue.s / 100,
        l: internalValue.l / 100,
      });
    if (internalValueHex !== valueHex) setInternalValue(pickerHsl(value));
  }, [internalValue, value]);

  return (
    <div
      className={cn(
        /* Using String.raw due to underscores in targeted classnames
        https://github.com/tailwindlabs/tailwindcss/issues/8881#issuecomment-1208600668 */
        String.raw`mx-auto flex h-full w-full max-w-xs gap-4
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
      <HslColorPicker
        {...props}
        color={internalValue}
        onChange={handleValueChange}
      />
      <Slider
        data-hue-slider=''
        orientation={orientation === 'horizontal' ? 'vertical' : 'horizontal'}
        inverted={orientation === 'horizontal'}
        min={0}
        max={360}
        value={[internalValue.h]}
        onValueChange={([value]) => handleValueChange({ h: value })}
        style={sliderVars}
        className='data-[orientation=vertical]:h-auto
[&_[data-slider-range]]:bg-transparent [&_[data-slider-thumb]]:border-white
[&_[data-slider-thumb]]:bg-[--thumb-color] [&_[data-slider-thumb]]:shadow-sm
[&_[data-slider-thumb]]:transition-none
[&_[data-slider-track]]:bg-[linear-gradient(var(--gradient-angle),red_0,#ff0_17%,#0f0_33%,#0ff_50%,#00f_67%,#f0f_83%,red)]'
      />
    </div>
  );
};
