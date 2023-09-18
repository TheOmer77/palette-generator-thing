import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { cn } from 'utils';

import { RovingFocusGroup } from '@radix-ui/react-roving-focus';

import {
  LIST_GROUP_NAME,
  ListContext,
  ScopedProps,
  useRovingFocusGroupScope,
} from './common';

type RovingFocusGroupProps = ComponentPropsWithoutRef<typeof RovingFocusGroup>;

export interface ListProps extends ComponentPropsWithoutRef<'ul'> {
  disabled?: boolean;
  rovingFocus?: boolean;
  loop?: RovingFocusGroupProps['loop'];
  dir?: RovingFocusGroupProps['dir'];
}

const listClassName = `flex w-full flex-col gap-px rounded-lg`;

export const List = forwardRef<HTMLUListElement, ScopedProps<ListProps>>(
  (
    {
      __scopeList,
      disabled = false,
      rovingFocus = true,
      loop = false,
      className,
      ...props
    },
    ref
  ) => {
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeList);

    return (
      <ListContext
        scope={__scopeList}
        rovingFocus={rovingFocus}
        disabled={disabled}
      >
        {rovingFocus ? (
          <RovingFocusGroup
            asChild
            {...rovingFocusGroupScope}
            orientation='vertical'
            loop={loop}
          >
            <ul
              {...props}
              ref={ref}
              role='group'
              className={cn(listClassName, className)}
            />
          </RovingFocusGroup>
        ) : (
          <ul
            {...props}
            ref={ref}
            role='group'
            className={cn(listClassName, className)}
          />
        )}
      </ListContext>
    );
  }
);
List.displayName = LIST_GROUP_NAME;
