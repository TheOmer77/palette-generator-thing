import type { ComponentPropsWithoutRef } from 'react';
import { ListItem, Radio } from 'components/general';

interface RadioListItemProps extends ComponentPropsWithoutRef<typeof ListItem> {
  checked?: boolean;
  disabled?: boolean;
  children?: string;
}

const RadioListItem = ({
  checked = false,
  disabled = false,
  children,
  ...props
}: RadioListItemProps) => (
  <ListItem
    {...props}
    disabled={disabled}
    role='radio'
    aria-checked={checked}
    aria-disabled={disabled}
    aria-label={children}
  >
    <Radio checked={checked} disabled={disabled} className='z-10 me-4' asChild>
      <span />
    </Radio>
    {children}
  </ListItem>
);

export default RadioListItem;
