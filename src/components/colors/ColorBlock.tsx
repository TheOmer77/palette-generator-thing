import { forwardRef } from 'react';
import { hexInverseBw, isValidHexColor } from 'utils/colorUtils';

interface ColorBlockProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  value: string;
}

const ColorBlock = forwardRef<HTMLDivElement, ColorBlockProps>(
  ({ value, style, ...props }, ref) => (
    <div
      {...props}
      ref={ref}
      style={{
        ...(isValidHexColor(value)
          ? { backgroundColor: value, color: hexInverseBw(value) }
          : {}),
        ...style,
      }}
      className='flex flex-col items-start justify-center rounded-lg p-2'
    >
      {value}
    </div>
  )
);
ColorBlock.displayName = 'ColorBlock';

export default ColorBlock;
