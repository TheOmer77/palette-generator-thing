import {
  forwardRef,
  useCallback,
  useState,
  type ComponentPropsWithoutRef,
} from 'react';
import { CheckIcon, CopyIcon } from 'lucide-react';

import { Tooltip } from '@/components/ui/Tooltip';
import { isHexColorLight, isValidHexColor } from '@/lib/colorUtils';
import { cn } from '@/lib/utils';

export type ColorBlockProps = ComponentPropsWithoutRef<'button'> & {
  value: string;
  label?: string;
};

export const ColorBlock = forwardRef<HTMLButtonElement, ColorBlockProps>(
  ({ value, label, style, ...props }, ref) => {
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
            isHexColorLight(value) ? 'text-black' : 'text-white'
          )}
          // Hex color has spaces so it's read correctly by screen readers
          aria-label={`${label} - ${value
            .split('')
            .join(' ')} - Copy color value`}
          onClick={copyValue}
        >
          <Icon
            className={cn(
              'absolute end-2 text-lg print:hidden',
              isHexColorLight(value) ? 'text-black/60' : 'text-white/60'
            )}
          />
          {label && (
            <span
              className={cn(
                `mt-1 text-xs leading-4`,
                isHexColorLight(value) ? 'text-black/60' : 'text-white/60'
              )}
            >
              {label}
            </span>
          )}
          <span className='text-base font-medium'>{value}</span>
        </button>
      </Tooltip>
    );
  }
);
ColorBlock.displayName = 'ColorBlock';
