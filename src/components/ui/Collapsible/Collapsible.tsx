'use client';

import { forwardRef } from 'react';
import {
  CollapsibleContent,
  Root,
  type CollapsibleContentProps,
} from '@radix-ui/react-collapsible';
import { Primitive } from '@radix-ui/react-primitive';

import { cn } from '@/lib/utils';

export type CollapsibleProps = CollapsibleContentProps & { open?: boolean };

export const Collapsible = forwardRef<HTMLDivElement, CollapsibleProps>(
  ({ open = false, asChild, className, children, ...props }, ref) => {
    return (
      <Root asChild open={open}>
        <CollapsibleContent
          {...props}
          asChild
          ref={ref}
          className={cn(
            `data-[state=closed]:animate-collapse-out
data-[state=open]:animate-collapse-in`,
            className
          )}
        >
          <Primitive.div asChild={asChild}>{children}</Primitive.div>
        </CollapsibleContent>
      </Root>
    );
  }
);
Collapsible.displayName = 'Collapsible';
