import type { CurveValue } from './bezierCurve';

export type GeneratePaletteOptions = {
  minLightness?: number;
  maxLightness?: number;
  lightnessCurve?: CurveValue;
};
