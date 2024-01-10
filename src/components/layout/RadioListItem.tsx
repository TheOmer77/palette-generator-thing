import { useContext, type ComponentPropsWithoutRef } from 'react';

import { ListItem, Radio, RadioGroupContext } from '@/components/general';

interface RadioListItemProps extends ComponentPropsWithoutRef<typeof ListItem> {
  checked?: boolean;
  disabled?: boolean;
  children?: string;
  value?: string;
}

const RadioListItem = ({
  checked = false,
  disabled = false,
  value,
  onClick,
  children,
  ...props
}: RadioListItemProps) => {
  const { value: groupValue, onValueChange } = useContext(RadioGroupContext);
  return (
    <ListItem
      {...props}
      onClick={e => {
        value !== groupValue && onValueChange?.(value);
        onClick?.(e);
      }}
      disabled={disabled}
      role='radio'
      aria-checked={checked}
      aria-disabled={disabled}
      aria-label={children}
    >
      <Radio
        value={value}
        checked={checked}
        disabled={disabled}
        className='z-10 me-4'
        asChild
      >
        <span />
      </Radio>
      {children}
    </ListItem>
  );
};

export default RadioListItem;
