import { createContext } from 'react';

export interface RadioGroupValue {
  value?: string;
  onValueChange?: (newValue?: string) => void;
}

const initialState: RadioGroupValue = {};

export const RadioGroupContext = createContext<RadioGroupValue>(initialState);
