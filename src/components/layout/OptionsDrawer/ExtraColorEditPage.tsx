import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';

import { ColorEditPage } from './ColorEditPage';
import { useBaseColors } from '@/hooks/useBaseColors';
import { useTheme } from '@/hooks/useTheme';

type ExtraColorEditPageProps = ComponentPropsWithoutRef<'div'> & {
  index: number;
};

export const ExtraColorEditPage = forwardRef<
  ElementRef<typeof ColorEditPage>,
  ExtraColorEditPageProps
>(({ index, ...props }, ref) => {
  const { extras: baseExtras } = useBaseColors(),
    { extras: themeExtras } = useTheme();

  const { name, value } = baseExtras[index],
    { value: themeValue } = themeExtras[index];
  const title = name || `Extra ${index + 1}`;

  return (
    <ColorEditPage {...props} ref={ref} title={title} color={themeValue}>
      {/* THE CONTENT BELOW IS TEMPORARY!! */}
      <div className='grid w-full grid-cols-2 gap-2'>
        <span className='font-semibold'>Name:</span>
        <span className='text-muted-foreground'>{name || 'None'}</span>
        <span className='font-semibold'>Value:</span>
        <span className='text-muted-foreground'>{value}</span>
        <span className='font-semibold'>Actual hex color:</span>
        <span className='text-muted-foreground'>{themeValue}</span>
        <span className='font-semibold'>
          Any actual editing functionality here:
        </span>
        <span className='text-muted-foreground'>Nope.</span>
      </div>
    </ColorEditPage>
  );
});
ExtraColorEditPage.displayName = 'ExtraColorEditPage';
