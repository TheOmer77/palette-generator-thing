'use client';

import type { PropsWithChildren } from 'react';

import { ThemeProvider } from './ThemeProvider';
import { VirtualKeyboardProvider } from './VirtualKeyboardProvider';

export const Provider = ({ children }: PropsWithChildren) => (
  <ThemeProvider>
    <VirtualKeyboardProvider>{children}</VirtualKeyboardProvider>
  </ThemeProvider>
);
