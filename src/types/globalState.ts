import { codeFormats, colorFormats } from '@/constants';

export type GlobalState = {
  codeGen: {
    /** Format for generated theme code. */
    format: keyof typeof codeFormats;
    /** Color format for generated code.
     * If format is `none` or `custom`, has no effect. */
    colorFormat: keyof typeof colorFormats;
  };
};
