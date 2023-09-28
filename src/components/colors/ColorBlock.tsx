import { ComponentProps, forwardRef, useCallback, useState } from 'react';
import { cn, isHexColorLight, isValidHexColor } from 'utils';
import { CopyIcon, DoneIcon } from 'assets/icons';

export interface ColorBlockProps extends ComponentProps<'button'> {
  value: string;
  label?: string;
}

export const ColorBlock = forwardRef<HTMLButtonElement, ColorBlockProps>(
  ({ value, label, style, ...props }, ref) => {
    const [justCopied, setJustCopied] = useState(false);

    const copyValue = useCallback(() => {
      navigator.clipboard.writeText(value);
      setJustCopied(true);
      setTimeout(() => setJustCopied(false), 1500);
    }, [value]);

    return (
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
hover:state-layer-neutral-500/20 focus-visible:outline-none
focus-visible:state-layer-neutral-500/20 active:state-layer-neutral-500/30`,
          isHexColorLight(value) ? 'text-black' : 'text-white'
        )}
        title='Copy color value'
        onClick={copyValue}
      >
        <span
          className={cn(
            'absolute end-2 text-xl [--tw-text-opacity:0.6] print:hidden',
            isHexColorLight(value) ? 'text-black' : 'text-white'
          )}
        >
          {justCopied ? <DoneIcon /> : <CopyIcon />}
        </span>
        {label && (
          <span
            className={cn(
              `mt-1 text-sm leading-4 [--tw-text-opacity:0.6]`,
              isHexColorLight(value) ? 'text-black' : 'text-white'
            )}
          >
            {label}
          </span>
        )}
        <span className='text-lg font-medium'>{value}</span>
      </button>
    );
  }
);
ColorBlock.displayName = 'ColorBlock';
