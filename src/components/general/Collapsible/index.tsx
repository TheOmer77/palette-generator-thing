import { forwardRef } from 'react';
import {
  CollapsibleContent,
  CollapsibleContentProps,
  Root,
} from '@radix-ui/react-collapsible';
import { Primitive } from '@radix-ui/react-primitive';

import { cn } from 'utils';

export interface CollapsibleProps extends CollapsibleContentProps {
  open?: boolean;
}

export const Collapsible = forwardRef<HTMLDivElement, CollapsibleProps>(
  ({ open = false, asChild, className, children, ...props }, ref) => {
    return (
      <Root asChild open={open}>
        <CollapsibleContent
          {...props}
          asChild
          ref={ref}
          className={cn(
            `overflow-hidden data-[state=closed]:animate-slideUp
data-[state=open]:animate-slideDown`,
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
