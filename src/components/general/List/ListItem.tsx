import { ComponentPropsWithoutRef, forwardRef, useRef } from 'react';
import { RovingFocusGroupItem } from '@radix-ui/react-roving-focus';

import { cn } from 'utils';

const listItemClassName = `relative flex h-12 w-full cursor-default select-none items-center p-4
outline-none transition-[background-color] after:absolute after:start-0
after:top-0 after:h-full after:w-full after:rounded-lg after:content-[""]
hover:after:bg-neutral-500/20 focus-visible:outline-none
focus-visible:after:bg-neutral-500/20 active:after:bg-neutral-500/30`;

import {
  LIST_ITEM_NAME,
  ScopedProps,
  useListContext,
  useRovingFocusGroupScope,
} from './common';

export interface ListItemProps extends ComponentPropsWithoutRef<'button'> {}

export const ListItem = forwardRef<
  HTMLButtonElement,
  ScopedProps<ListItemProps>
>(({ __scopeToggleGroup, className, ...props }, ref) => {
  const context = useListContext(LIST_ITEM_NAME, __scopeToggleGroup);
  const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeToggleGroup);
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
