'use client';

import type { PropsWithChildren } from 'react';

import { ThemeProvider } from './ThemeProvider';

export const Provider = ({ children }: PropsWithChildren) => (
  <ThemeProvider>{children}</ThemeProvider>
);
