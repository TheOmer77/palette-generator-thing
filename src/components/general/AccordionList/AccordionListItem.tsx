import { ComponentPropsWithoutRef, ReactNode, forwardRef } from 'react';

import {
  ACCORDION_ITEM_NAME,
  ScopedProps,
  useAccordionListContext,
} from './common';
import { Collapsible, ListItem } from 'components/general';
import { cn } from 'utils';
import { ExpandMoreIcon } from 'assets/icons';

interface AccordionListItemProps
  extends Omit<ComponentPropsWithoutRef<'button'>, 'title' | 'onClick'> {
  value: string;
  title: ReactNode;
  open?: boolean;
}

export const AccordionListItem = forwardRef<
  HTMLButtonElement,
  ScopedProps<AccordionListItemProps>
>(({ __scopeAccordionList, value, title, children, ...props }, ref) => {
  const { value: currentValue, onValueChange } = useAccordionListContext(
    ACCORDION_ITEM_NAME,
    __scopeAccordionList
  );
  const open = currentValue === value;

  return (
    <div
      className={cn(
        'rounded-lg transition-[background-color] duration-200',
        open && 'bg-white dark:bg-neutral-800'
      )}
    >
      <ListItem
        {...props}
        ref={ref}
        onClick={() => onValueChange?.(value === currentValue ? null : value)}
      >
        {title}
        <ExpandMoreIcon
          className={cn('ms-auto text-xl duration-200', open && 'rotate-180')}
        />
      </ListItem>
      <Collapsible open={open}>{children}</Collapsible>
    </div>
  );
});
AccordionListItem.displayName = 'AccordionListItem';
