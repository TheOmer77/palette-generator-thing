import {
  forwardRef,
  useCallback,
  useState,
  type ComponentPropsWithoutRef,
} from 'react';
import { useIsClient } from 'usehooks-ts';
import { CheckIcon, CopyIcon } from 'lucide-react';

import { Tooltip } from '@/components/ui/Tooltip';
import { isHexColorLight, isValidHexColor } from '@/lib/colorUtils';
import { cn } from '@/lib/utils';

export type ColorBlockProps = ComponentPropsWithoutRef<'button'> & {
  value: string;
  label?: string;
};

export const ColorGridItem = forwardRef<HTMLButtonElement, ColorBlockProps>(
  ({ value, label, style, ...props }, ref) => {
    const isClient = useIsClient();
    const [justCopied, setJustCopied] = useState(false);
    const Icon = justCopied ? CheckIcon : CopyIcon;

    const copyValue = useCallback(() => {
      if (justCopied) return;

      navigator.clipboard.writeText(value);
      setJustCopied(true);
      setTimeout(() => setJustCopied(false), 1500);
    }, [justCopied, value]);

    return (
      <Tooltip content='Copy color value'>
        <button
          {...props}
          ref={ref}
          style={{
            ...(isValidHexColor(value) ? { backgroundColor: value } : {}),
            ...style,
          }}
          className={cn(
            `flex cursor-default select-none flex-col items-start justify-center
overflow-hidden rounded-lg p-2 state-layer [print-color-adjust:exact]
hover:state-layer-muted/20 focus-visible:outline-none
focus-visible:state-layer-muted/20 active:state-layer-muted/40
active:after:duration-0`,
            isHexColorLight(value) ? 'text-black' : 'text-white',
            !isClient && 'pointer-events-none'
          )}
          // Hex color has spaces so it's read correctly by screen readers
          aria-label={`${label} - ${value
            .split('')
            .join(' ')} - Copy color value`}
          onClick={copyValue}
        >
          <Icon
            className={cn(
              'absolute end-2 text-lg transition-opacity md:text-base print:hidden',
              isHexColorLight(value) ? 'text-black/60' : 'text-white/60',
              !isClient && 'opacity-0'
            )}
          />
          {label && (
            <span
              className={cn(
                `mt-1 text-sm leading-4 md:text-xs print:text-xs`,
                isHexColorLight(value) ? 'text-black/60' : 'text-white/60'
              )}
            >
              {label}
            </span>
          )}
          <span className='text-lg font-medium md:text-base print:text-base'>
            {value}
          </span>
        </button>
      </Tooltip>
    );
  }
);
ColorGridItem.displayName = 'ColorGridItem';
