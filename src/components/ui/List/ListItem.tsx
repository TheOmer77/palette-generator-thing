'use client';

import { forwardRef, useRef, type ComponentPropsWithoutRef } from 'react';
import { RovingFocusGroupItem } from '@radix-ui/react-roving-focus';
import { Primitive } from '@radix-ui/react-primitive';

import {
  LIST_ITEM_NAME,
  useListContext,
  useRovingFocusGroupScope,
  type ScopedProps,
} from './common';
import { cn } from '@/lib/utils';

export type ListItemProps = ScopedProps<
  ComponentPropsWithoutRef<typeof Primitive.button>
> & { unstyled?: boolean };

export const ListItem = forwardRef<HTMLButtonElement, ListItemProps>(
  ({ __scopeList, asChild, unstyled, className, ...props }, ref) => {
    const context = useListContext(LIST_ITEM_NAME, __scopeList);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeList);
    const disabled = context.disabled || props.disabled;
    const rovingFocusItemRef = useRef<HTMLDivElement>(null);

    const itemButton = (
      <Primitive.button
        {...props}
        ref={ref}
        disabled={disabled}
        asChild={asChild}
        className={cn(
          !unstyled &&
            `flex min-h-12 w-full cursor-default select-none items-center
rounded-lg px-4 py-2 text-start text-base outline-none
transition-[background-color] duration-100 state-layer
focus-visible:outline-none focus-visible:state-layer-muted/30 active:bg-muted/30
active:duration-0 disabled:text-muted md:min-h-10 md:text-sm
[&:not(:disabled)]:hover:state-layer-muted/30 [&>*]:z-10`,
          className
        )}
      />
    );

    return (
      <li className='p-0'>
        {context.rovingFocus ? (
          <RovingFocusGroupItem
            asChild
            {...rovingFocusGroupScope}
            focusable={!disabled}
            ref={rovingFocusItemRef}
          >
            {itemButton}
          </RovingFocusGroupItem>
        ) : (
          itemButton
        )}
      </li>
    );
  }
);
ListItem.displayName = LIST_ITEM_NAME;
