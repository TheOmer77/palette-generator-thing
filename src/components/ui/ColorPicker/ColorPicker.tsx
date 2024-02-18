import type { ComponentPropsWithoutRef } from 'react';
import { HexColorPicker } from 'react-colorful';

import { cn } from '@/lib/utils';

export type ColorPickerProps = Omit<
  ComponentPropsWithoutRef<typeof HexColorPicker>,
  'color'
> & { value?: ComponentPropsWithoutRef<typeof HexColorPicker>['color'] };

export const ColorPicker = ({
  value,
  className,
  ...props
}: ColorPickerProps) => (
  <HexColorPicker
    {...props}
    color={value}
    className={cn(
      /* Using String.raw due to underscores in targeted classnames
      https://github.com/tailwindlabs/tailwindcss/issues/8881#issuecomment-1208600668 */
      String.raw`mx-auto max-w-sm [&.react-colorful]:h-auto
[&.react-colorful]:w-auto [&_.react-colorful\_\_hue]:h-2
[&_.react-colorful\_\_hue]:rounded-full
[&_.react-colorful\_\_interactive:focus_.react-colorful\_\_pointer]:scale-100
[&_.react-colorful\_\_pointer]:h-5 [&_.react-colorful\_\_pointer]:w-5
[&_.react-colorful\_\_pointer]:-translate-x-1/2
[&_.react-colorful\_\_pointer]:-translate-y-1/2
[&_.react-colorful\_\_pointer]:border-2
[&_.react-colorful\_\_pointer]:border-white
[&_.react-colorful\_\_pointer]:shadow-sm [&_.react-colorful\_\_saturation]:mb-4
[&_.react-colorful\_\_saturation]:aspect-square
[&_.react-colorful\_\_saturation]:w-full
[&_.react-colorful\_\_saturation]:rounded-lg
[&_.react-colorful\_\_saturation]:border-none`,
      className
    )}
  />
);
