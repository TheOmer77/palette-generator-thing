import { IconButton } from 'components/general';
import { ColorInput, type ColorInputProps } from 'components/colors';
import { RandomIcon } from 'assets/icons';
import { randomHexColor } from 'utils';

const ColorInputWithRandomBtn = ({
  value,
  onChange,
  ...props
}: ColorInputProps) => (
  <div className='p-2'>
    <ColorInput
      {...props}
      value={value}
      onChange={onChange}
      endAdornment={
        <IconButton
          title='Generate random color'
          onClick={() => onChange?.(randomHexColor())}
        >
          <RandomIcon />
        </IconButton>
      }
    />
  </div>
);

export default ColorInputWithRandomBtn;
