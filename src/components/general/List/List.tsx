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

interface ListProps extends ComponentPropsWithoutRef<'ul'> {
  disabled?: boolean;
  rovingFocus?: boolean;
  loop?: RovingFocusGroupProps['loop'];
  dir?: RovingFocusGroupProps['dir'];
}

const listClassName = `flex w-full flex-col space-y-px rounded-lg`;

export const List = forwardRef<HTMLUListElement, ScopedProps<ListProps>>(
  (
    {
      __scopeToggleGroup,
      disabled = false,
      rovingFocus = true,
      loop = false,
      className,
      ...props
    },
    ref
  ) => {
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeToggleGroup);

    return (
      <ListContext
        scope={__scopeToggleGroup}
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
