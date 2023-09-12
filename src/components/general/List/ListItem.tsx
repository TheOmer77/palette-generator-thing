import { ComponentPropsWithoutRef, forwardRef, useRef } from 'react';
import { RovingFocusGroupItem } from '@radix-ui/react-roving-focus';

import { cn } from 'utils';

// eslint-disable-next-line react/display-name
const ListItemButton = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<'button'>
>(({ className, ...props }, ref) => (
  <button
    {...props}
    ref={ref}
    className={cn(
      `flex h-12 w-full cursor-default select-none
items-center rounded-lg p-4 outline-none transition-[background-color]
state-layer focus-visible:outline-none focus-visible:state-layer-neutral-500/20
enabled:hover:state-layer-neutral-500/20 
enabled:active:state-layer-neutral-500/30 disabled:text-neutral-600
dark:disabled:text-neutral-400`,
      className
    )}
  />
));

import {
  LIST_ITEM_NAME,
  ScopedProps,
  useListContext,
  useRovingFocusGroupScope,
} from './common';

export const ListItem = forwardRef<
  HTMLButtonElement,
  ScopedProps<ComponentPropsWithoutRef<'button'>>
>(({ __scopeList, ...props }, ref) => {
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
          <ListItemButton {...props} ref={ref} disabled={disabled} />
        </RovingFocusGroupItem>
      ) : (
        <ListItemButton {...props} ref={ref} disabled={disabled} />
      )}
    </li>
  );
});
ListItem.displayName = LIST_ITEM_NAME;
