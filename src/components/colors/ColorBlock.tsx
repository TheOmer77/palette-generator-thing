import { ComponentProps, forwardRef, useCallback, useState } from 'react';
import { IconButton } from 'components/general';
import { cn, isHexColorLight, isValidHexColor } from 'utils';
import { CopyIcon, DoneIcon } from 'assets/icons';

interface ColorBlockProps extends ComponentProps<'div'> {
  value: string;
  label?: string;
}

const ColorBlock = forwardRef<HTMLDivElement, ColorBlockProps>(
  ({ value, label, style, ...props }, ref) => {
    const [justCopied, setJustCopied] = useState(false);

    const copyValue = useCallback(() => {
      navigator.clipboard.writeText(value);
      setJustCopied(true);
      setTimeout(() => setJustCopied(false), 1500);
    }, [value]);

    return (
      <div
        {...props}
        ref={ref}
        style={{
          ...(isValidHexColor(value) ? { backgroundColor: value } : {}),
          ...style,
        }}
        className={cn(
          `relative flex select-none flex-col items-start justify-center
rounded-lg p-2`,
          isHexColorLight(value) ? 'text-black' : 'text-white'
        )}
      >
        <IconButton
          title='Copy color value'
          className={cn(
            'absolute end-2 [--tw-text-opacity:0.6]',
            isHexColorLight(value) ? 'text-black' : 'text-white'
          )}
          onClick={copyValue}
        >
          {justCopied ? <DoneIcon /> : <CopyIcon />}
        </IconButton>
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
      </div>
    );
  }
);
ColorBlock.displayName = 'ColorBlock';

export default ColorBlock;
