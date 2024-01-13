'use client';

import { forwardRef } from 'react';
import {
  Primitive,
  type ComponentPropsWithoutRef,
} from '@radix-ui/react-primitive';

import { RadioGroupContext, type RadioGroupValue } from './context';

export type RadioGroupProps = RadioGroupValue &
  ComponentPropsWithoutRef<typeof Primitive.div>;

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ value, onValueChange, children, ...props }, ref) => (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
      <Primitive.div {...props} role='radiogroup' ref={ref}>
        {children}
      </Primitive.div>
    </RadioGroupContext.Provider>
  )
);
RadioGroup.displayName = 'RadioGroup';