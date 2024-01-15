import { calculateSteps, getStepDifference } from '@/lib/calculateSteps';

export const MIN_SHADE = 0,
  MAX_SHADE = 1000;
export const MIN_MAIN_SHADE = 200,
  MAX_MAIN_SHADE = 800;
const minL = 0,
  maxL = 100;

export const shades = [
  MIN_SHADE + getStepDifference(MIN_SHADE, MAX_SHADE, 11) / 2,
  ...calculateSteps(MIN_SHADE, MAX_SHADE, 11).slice(1, 10),
  MAX_SHADE - getStepDifference(MIN_SHADE, MAX_SHADE, 11) / 2,
];
export const shadesLightnessValues = [
  maxL - getStepDifference(minL, maxL, 11) / 2,
  ...calculateSteps(maxL, minL, 11).slice(1, 10),
  minL + getStepDifference(minL, maxL, 11) / 2,
];
