import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';

import { ColorEditPage } from './ColorEditPage';
import { Input } from '@/components/ui/Input';
import { useBaseColors } from '@/hooks/useBaseColors';
import { useTheme } from '@/hooks/useTheme';
import { useOptionsDrawer } from '@/store/useOptionsDrawer';

type ExtraColorEditPageProps = ComponentPropsWithoutRef<'div'> & {
  index: number;
};

export const ExtraColorEditPage = forwardRef<
  ElementRef<typeof ColorEditPage>,
  ExtraColorEditPageProps
>(({ index, ...props }, ref) => {
  const { extras: baseExtras } = useBaseColors(),
    { extras: drawerExtras, renameExtraColor } = useOptionsDrawer(),
    { extras: themeExtras } = useTheme();

  const { name, value } = drawerExtras?.[index] || baseExtras[index],
    { value: themeValue } = themeExtras[index];
  const title = name || `Extra ${index + 1}`;

  return (
    <ColorEditPage {...props} ref={ref} title={title} color={themeValue}>
      <Input
        label='Name'
        value={name || ''}
        onChange={e => renameExtraColor(index, e.target.value)}
        className='mt-[2px]'
      />
      {/* THE CONTENT BELOW IS TEMPORARY!! */}
      <div className='grid w-full grid-cols-2 gap-2'>
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
