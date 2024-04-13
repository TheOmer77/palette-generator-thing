import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';

import { ColorEditPage } from './ColorEditPage';
import {
  ExtraColorEditor,
  type ExtraColorEditorProps,
} from '@/components/layout/BaseColors';
import { useBaseColors } from '@/hooks/useBaseColors';
import { useOptionsDrawer } from '@/store/useOptionsDrawer';
import { cn } from '@/lib/utils';
import {
  generalColorSuggestionNames,
  generalColorSuggestions,
} from '@/constants';
import type { GeneralColorSuggestion } from '@/types/defaultSuggestions';

type ExtraColorEditPageProps = ComponentPropsWithoutRef<'div'> &
  ExtraColorEditorProps;

export const ExtraColorEditPage = forwardRef<
  ElementRef<typeof ColorEditPage>,
  ExtraColorEditPageProps
>(({ index, className, ...props }, ref) => {
  const { primary, extras: baseExtras } = useBaseColors(),
    { extras: drawerExtras } = useOptionsDrawer();

  const { name, value } = drawerExtras?.[index] || baseExtras[index];
  const title = name || `Extra ${index + 1}`;

  const colorIsSuggestion = generalColorSuggestionNames.includes(value);

  const themeValue = colorIsSuggestion
    ? generalColorSuggestions[value as GeneralColorSuggestion]?.(primary)
    : value;

  return (
    <ColorEditPage
      {...props}
      ref={ref}
      title={title}
      color={themeValue}
      className={cn(
        `[&_[data-radix-scroll-area-viewport]]:pb-[4.5rem]
[&_[data-radix-scroll-area-viewport]]:pt-[1px] [&_[data-scroll-bar]]:z-10`,
        className
      )}
    >
      <ExtraColorEditor index={index} />
    </ColorEditPage>
  );
});
ExtraColorEditPage.displayName = 'ExtraColorEditPage';
