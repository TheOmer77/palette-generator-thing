import { createContext, useContext } from 'react';

export const VirtualKeyboardContext = createContext(false);
export const useVirtualKeyboardOpen = () => useContext(VirtualKeyboardContext);
