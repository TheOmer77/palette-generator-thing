import { ComponentProps, forwardRef, useCallback, useState } from 'react';
import { IconButton } from 'components/general';
import { hexInverseBw, isValidHexColor } from 'utils/colorUtils';
import { ReactComponent as CopyIcon } from 'assets/icons/copy.svg';
import { ReactComponent as DoneIcon } from 'assets/icons/done.svg';

interface ColorBlockProps extends ComponentProps<'div'> {
  value: string;
}

const ColorBlock = forwardRef<HTMLDivElement, ColorBlockProps>(
  ({ value, style, ...props }, ref) => {
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
          ...(isValidHexColor(value)
            ? { backgroundColor: value, color: hexInverseBw(value) }
            : {}),
          ...style,
        }}
        className='relative flex flex-col items-start justify-center rounded-lg p-2'
      >
        <IconButton
          title='Copy color value'
          className='absolute end-2 top-1 [--tw-text-opacity:0.5] dark:[--tw-text-opacity:0.5]'
          onClick={copyValue}
          style={isValidHexColor(value) ? { color: hexInverseBw(value) } : {}}
        >
          {justCopied ? <DoneIcon /> : <CopyIcon />}
        </IconButton>
        {value}
      </div>
    );
  }
);
ColorBlock.displayName = 'ColorBlock';

export default ColorBlock;
