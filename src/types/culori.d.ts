import { type Mode, differenceEuclidean } from 'culori/fn';
import { type ConvertFn } from 'culori/src/converter';

declare module 'culori/fn' {
  // For some reason this function is missing in the culori type declaration.
  function toGamut(
    dest?: Mode,
    mode?: Mode,
    delta?: typeof differenceEuclidean,
    jnd?: number
  ): ConvertFn;
}
