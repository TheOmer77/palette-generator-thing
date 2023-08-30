import { calculateSteps, getStepDifference } from 'utils/calculateSteps';

const MIN_SHADE_NAME = 0,
  MAX_SHADE_NAME = 1000;
const minL = 8,
  maxL = 100;

export const shadeNames = [
  MIN_SHADE_NAME + getStepDifference(MIN_SHADE_NAME, MAX_SHADE_NAME, 11) / 2,
  ...calculateSteps(MIN_SHADE_NAME, MAX_SHADE_NAME, 11).slice(1, 10),
  MAX_SHADE_NAME - getStepDifference(MIN_SHADE_NAME, MAX_SHADE_NAME, 11) / 2,
];
export const shades = [
  maxL - getStepDifference(minL, maxL, 11) / 2,
  ...calculateSteps(maxL, minL, 11).slice(1, 10),
  minL + getStepDifference(minL, maxL, 11) / 2,
];
