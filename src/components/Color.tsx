import { ChangeEventHandler } from 'react';
import { hexInverseBw, isValidHexColor } from '../utils/colorUtils';

const Color = ({
  value,
  input = false,
  onChange,
}: {
  value: string;
  input?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}) => {
  return input ? (
    <div className='color-input-container'>
      <input
        type='text'
        value={value}
        onChange={event =>
          (event.target.value.length < 1 ||
            (event.target.value.length < 8 &&
              event.target.value.startsWith('#'))) &&
          onChange?.(event)
        }
        style={
          isValidHexColor(value)
            ? { backgroundColor: value, color: hexInverseBw(value) }
            : {}
        }
        className='color'
      />
      {!isValidHexColor(value) && (
        <span className='error'>Invalid hex color!</span>
      )}
    </div>
  ) : (
    <div
      style={
        isValidHexColor(value)
          ? { backgroundColor: value, color: hexInverseBw(value) }
          : {}
      }
      className='color'
    >
      {value}
    </div>
  );
};

export default Color;
