import { getBezierCurvePointY } from '@/lib/bezierCurve';
import { calculateSteps, getStepDifference } from '@/lib/calculateSteps';
import type { CurveValue } from '@/types/bezierCurve';

export const MIN_SHADE = 0,
  MAX_SHADE = 1000;
export const MIN_MAIN_SHADE = 100,
  MAX_MAIN_SHADE = 900;
export const MIN_ACTIVE_SHADE = 50,
  MAX_ACTIVE_SHADE = 950;

export const DEFAULT_CURVE = [0.1, 0, 0.95, 1] satisfies CurveValue,
  DEFAULT_NEUTRAL_CURVE = [0.1, 0, 0.95, 1] satisfies CurveValue,
  LINEAR_CURVE = [0, 0, 1, 1] satisfies CurveValue;

export const DEFAULT_MIN_LIGHTNESS = 0,
  DEFAULT_MAX_LIGHTNESS = 100;

export const shades = [
  MIN_SHADE + getStepDifference(MIN_SHADE, MAX_SHADE, 11) / 2,
  ...calculateSteps(MIN_SHADE, MAX_SHADE, 11).slice(1, 10),
  MAX_SHADE - getStepDifference(MIN_SHADE, MAX_SHADE, 11) / 2,
];

// TODO: Separate lightness value for neutral palette, using DEFAULT_CURVE
export const shadesLightnessValues = shades.map(
  shade =>
    DEFAULT_MIN_LIGHTNESS +
    getBezierCurvePointY(DEFAULT_NEUTRAL_CURVE, shade / 1000) *
      (DEFAULT_MAX_LIGHTNESS - DEFAULT_MIN_LIGHTNESS)
);
