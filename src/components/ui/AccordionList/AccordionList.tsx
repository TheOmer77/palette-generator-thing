import { forwardRef } from 'react';

import { List, type ListProps } from '../List';
import {
  ACCORDION_GROUP_NAME,
  AccordionListContext,
  type AccordionListContextValue,
  type ScopedProps,
} from './common';

export type AccordionListProps = ListProps & AccordionListContextValue;

export const AccordionList = forwardRef<
  HTMLUListElement,
  ScopedProps<AccordionListProps>
>(({ __scopeAccordionList, value, onValueChange, children, ...props }, ref) => (
  <AccordionListContext
    scope={__scopeAccordionList}
    value={value}
    onValueChange={onValueChange}
  >
    <List {...props} ref={ref}>
      {children}
    </List>
  </AccordionListContext>
));
AccordionList.displayName = ACCORDION_GROUP_NAME;
