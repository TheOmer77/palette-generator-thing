import type { CurveValue, Point } from '@/types/bezierCurve';

export const getBezierCurveParams = (curveValue: CurveValue, width: number) => {
  if (curveValue.length !== 4)
    throw new Error('Invalid number of points. Expected exactly 4 points.');

  const startCoordinate = [0, width] satisfies Point;
  const endCoordinate = [width, 0] satisfies Point;
  const startBezierHandle = [
    width * curveValue[0],
    width * (1 - curveValue[1]),
  ] satisfies Point;
  const endBezierHandle = [
    width * curveValue[2],
    width * (1 - curveValue[3]),
  ] satisfies Point;
  return {
    startCoordinate,
    endCoordinate,
    startBezierHandle,
    endBezierHandle,
  };
};

/**
 * Calculate the Y position on a cubic Bezier curve given an X position.
 *
 * @param curveValue - An array of 4 numbers representing the cubic Bezier curve.
 * @param xPos - The X position for which to find the corresponding Y position,
 * from 0 (start of the curve) to 1 (end of the curve).
 * @returns The Y position on the cubic Bezier curve.
 */
export const getBezierCurvePointY = (curveValue: CurveValue, xPos: number) => {
  if (curveValue.length !== 4)
    throw new Error('Cubic Bezier curve should have exactly 4 points.');
  if (xPos < 0 || xPos > 1)
    throw new Error('X position should be a number between 0 and 1.');

  const { startCoordinate, startBezierHandle, endCoordinate, endBezierHandle } =
    getBezierCurveParams(curveValue, 1);

  const t = findTValueFromX(
    xPos,
    startCoordinate[0],
    startBezierHandle[0],
    endBezierHandle[0],
    endCoordinate[0]
  );

  return cubicBezierInterpolation(
    t,
    startCoordinate[1],
    startBezierHandle[1],
    endBezierHandle[1],
    endCoordinate[1]
  );
};

// HELPER FUNCTIONS - THANKS CHATGPT

/**
 * Finds the parameter `t` given an X value on a cubic Bezier curve.
 * @param x - The X value for which to find the parameter t.
 * @param x0 - The X coordinate of the first control point.
 * @param x1 - The X coordinate of the second control point.
 * @param x2 - The X coordinate of the third control point.
 * @param x3 - The X coordinate of the fourth control point.
 * @returns The parameter `t` corresponding to the given X value.
 * @throws Will throw an error if a valid `t` value cannot be found within the
 * maximum number of iterations.
 */
const findTValueFromX = (
  x: number,
  x0: number,
  x1: number,
  x2: number,
  x3: number
) => {
  const epsilon = 1e-6,
    maxIterations = 100;
  let t0 = 0,
    t1 = 1;

  for (let i = 0; i < maxIterations; i++) {
    const xGuess = cubicBezierInterpolation((t0 + t1) / 2, x0, x1, x2, x3);
    if (Math.abs(xGuess - x) < epsilon) return (t0 + t1) / 2;

    if (xGuess > x) t1 = (t0 + t1) / 2;
    else t0 = (t0 + t1) / 2;
  }

  throw new Error(
    'Failed to find a t value for the given X within the maximum number of iterations.'
  );
};

const cubicBezierInterpolation = (
  t: number,
  p0: number,
  p1: number,
  p2: number,
  p3: number
) => {
  const u = 1 - t;
  const uSqr = u * u,
    uCub = uSqr * u,
    tSqr = t * t,
    tCub = tSqr * t;

  const term1 = uCub * p0,
    term2 = 3 * uSqr * t * p1,
    term3 = 3 * u * tSqr * p2,
    term4 = tCub * p3;

  return term1 + term2 + term3 + term4;
};
