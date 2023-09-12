import { ComponentPropsWithoutRef, forwardRef, useRef } from 'react';
import { RovingFocusGroupItem } from '@radix-ui/react-roving-focus';

import { cn } from 'utils';

const listItemClassName = `flex h-12 w-full cursor-default select-none
items-center rounded-lg p-4 outline-none transition-[background-color]
state-layer hover:state-layer-neutral-500/20 focus-visible:outline-none
focus-visible:state-layer-neutral-500/20 active:state-layer-neutral-500/30`;

import {
  LIST_ITEM_NAME,
  ScopedProps,
  useListContext,
  useRovingFocusGroupScope,
} from './common';

export const ListItem = forwardRef<
  HTMLButtonElement,
  ScopedProps<ComponentPropsWithoutRef<'button'>>
>(({ __scopeList, className, ...props }, ref) => {
  const context = useListContext(LIST_ITEM_NAME, __scopeList);
  const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeList);
  const disabled = context.disabled || props.disabled;
  const rovingFocusItemRef = useRef<HTMLDivElement>(null);

  return (
    <li className='p-0'>
      {context.rovingFocus ? (
        <RovingFocusGroupItem
          asChild
          {...rovingFocusGroupScope}
          focusable={!disabled}
          ref={rovingFocusItemRef}
        >
          <button
            {...props}
            ref={ref}
            disabled={disabled}
            className={cn(listItemClassName, className)}
          />
        </RovingFocusGroupItem>
      ) : (
        <button
          {...props}
          ref={ref}
          disabled={disabled}
          className={cn(listItemClassName, className)}
        />
      )}
    </li>
  );
});
ListItem.displayName = LIST_ITEM_NAME;
