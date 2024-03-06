'use client';

import { forwardRef, type ElementRef } from 'react';
import {
  Select as SelectRoot,
  SelectValue,
  type SelectProps as SelectRootProps,
  type SelectTriggerProps,
} from '@radix-ui/react-select';

import { SelectContent } from './SelectContent';
import { SelectTrigger } from './SelectTrigger';

export type SelectProps = SelectRootProps &
  SelectTriggerProps & {
    label?: string;
  };

export const Select = forwardRef<ElementRef<typeof SelectTrigger>, SelectProps>(
  (
    {
      value,
      defaultValue,
      onValueChange,
      open,
      defaultOpen,
      onOpenChange,
      dir,
      name,
      autoComplete,
      disabled,
      required,
      label,
      children,
      ...props
    },
    ref
  ) => (
    <SelectRoot
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      dir={dir}
      name={name}
      autoComplete={autoComplete}
      disabled={disabled}
      required={required}
    >
      <SelectTrigger {...props} ref={ref}>
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>{children}</SelectContent>
    </SelectRoot>
  )
);
Select.displayName = 'Select';
