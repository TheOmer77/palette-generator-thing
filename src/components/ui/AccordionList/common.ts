import { createContextScope, type Scope } from '@radix-ui/react-context';

export const ACCORDION_GROUP_NAME = 'AccordionList',
  ACCORDION_ITEM_NAME = 'AccordionListItem';

export type ScopedProps<P> = P & { __scopeAccordionList?: Scope };
export type AccordionListContextValue = {
  value: string | null;
  onValueChange: (newValue: string | null) => void;
};

export const [createAccordionListContext, createAccordionListScope] =
  createContextScope(ACCORDION_GROUP_NAME);

export const [AccordionListContext, useAccordionListContext] =
  createAccordionListContext<AccordionListContextValue>(ACCORDION_GROUP_NAME);
