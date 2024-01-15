import { createContext } from 'react';

export type RadioGroupValue = {
  value?: string;
  onValueChange?: (newValue?: string) => void;
};

const initialState: RadioGroupValue = {};

export const RadioGroupContext = createContext<RadioGroupValue>(initialState);
