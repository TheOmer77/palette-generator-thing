'use client';

import {
  forwardRef,
  useCallback,
  useEffect,
  useState,
  type ChangeEventHandler,
  type FocusEventHandler,
} from 'react';
import { formatHex, modeRgb, useMode as loadMode } from 'culori/fn';
import { Dice5Icon } from 'lucide-react';

import { IconButton } from '@/components/ui/IconButton';
import { Input, type InputProps } from '@/components/ui/Input';
import { Tooltip } from '@/components/ui/Tooltip';
import { autoAddHexHash, isValidHexColor, randomHexColor } from '@/utils';

loadMode(modeRgb);

export interface ColorInputProps
  extends Omit<
    InputProps,
    | 'asChild'
    | 'endAdornment'
    | 'onChange'
    | 'ref'
    | 'startAdornment'
    | 'type'
    | 'value'
  > {
  value?: string;
  onChange?: (newValue: string) => void;
  withAlpha?: boolean;
  withRandomBtn?: boolean;
}

export const ColorInput = forwardRef<HTMLInputElement, ColorInputProps>(
  (
    {
      value,
      onChange,
      onBlur,
      withAlpha = false,
      withRandomBtn,
      label = 'Hex color',
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(value);
    const [invalid, setInvalid] = useState(
      typeof value !== 'string' || !isValidHexColor(value)
    );

    const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
      e => {
        const newValue = autoAddHexHash(
          e.target.value
            .toLowerCase()
            .replace(/([^0-9A-F]+)/gi, '')
            .substring(0, withAlpha ? 8 : 6)
        );

        if (isValidHexColor(newValue, withAlpha)) onChange?.(newValue);
        setInvalid(!isValidHexColor(newValue, withAlpha));
        setInternalValue(newValue);
      },
      [onChange, withAlpha]
    );

    const handleBlur = useCallback<FocusEventHandler<HTMLInputElement>>(
      e => {
        onBlur?.(e);

        setInvalid(false);
        const formattedValue = formatHex(value);
        if (typeof formattedValue === 'string' && value !== formattedValue)
          return onChange?.(formattedValue);
        setInternalValue(formattedValue);
      },
      [onChange, onBlur, value]
    );

    useEffect(() => {
      setInternalValue(autoAddHexHash(value?.toLowerCase?.() || ''));
    }, [value]);

    return (
      <Input
        {...props}
        ref={ref}
        label={label}
        value={internalValue || '#'}
        onChange={handleChange}
        onBlur={handleBlur}
        invalid={invalid}
        {...(withRandomBtn
          ? {
              endAdornment: (
                <Tooltip title='Generate random color'>
                  <IconButton
                    aria-label='Generate random color'
                    onClick={() => onChange?.(randomHexColor())}
                  >
                    <Dice5Icon />
                  </IconButton>
                </Tooltip>
              ),
            }
          : {})}
      />
    );
  }
);
ColorInput.displayName = 'ColorInput';
