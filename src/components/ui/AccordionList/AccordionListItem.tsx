'use client';

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';
import { ChevronDownIcon } from 'lucide-react';

import {
  ACCORDION_ITEM_NAME,
  useAccordionListContext,
  type ScopedProps,
} from './common';
import { Collapsible } from '../Collapsible';
import { ListItem, ListItemIcon } from '../List';
import { cn } from '@/utils';

export interface AccordionListItemProps
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
        <ListItemIcon
          className={cn('me-0 ms-auto duration-200', open && 'rotate-180')}
        >
          <ChevronDownIcon />
        </ListItemIcon>
      </ListItem>
      <Collapsible open={open}>{children}</Collapsible>
    </div>
  );
});
AccordionListItem.displayName = 'AccordionListItem';
