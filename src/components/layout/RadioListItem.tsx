import { useContext, type ComponentPropsWithoutRef } from 'react';

import { ListItem, ListItemIcon } from '@/components/ui/List';
import { Radio, RadioGroupContext } from '@/components/ui/Radio';

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
      <ListItemIcon>
        <Radio value={value} checked={checked} disabled={disabled} asChild>
          <span />
        </Radio>
      </ListItemIcon>
      {children}
    </ListItem>
  );
};

export default RadioListItem;
