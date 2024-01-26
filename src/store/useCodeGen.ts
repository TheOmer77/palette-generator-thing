import { create } from 'zustand';

import type { codeFormats, colorFormats } from '@/constants';

export type CodeGenState = {
  /** Format for generated theme code. */
  format: keyof typeof codeFormats;
  /** Color format for generated code.
   * If format is `none` or `custom`, has no effect. */
  colorFormat: keyof typeof colorFormats;
};

export type CodeGenActions = {
  setFormat: (format: CodeGenState['format']) => void;
  setColorFormat: (colorFormat: CodeGenState['colorFormat']) => void;
};

export type CodeGenStore = CodeGenState & CodeGenActions;

export const useCodeGen = create<CodeGenStore>(set => ({
  format: 'none',
  colorFormat: 'hex',

  setFormat: format => set({ format }),
  setColorFormat: colorFormat => set({ colorFormat }),
}));
