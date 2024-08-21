import type { CurveValue } from '@/types/bezierCurve';

import { getBezierCurvePointY } from './bezierCurve';
import { overlayColors } from './colorUtils';

type AnimateOverlayColorsOptions = {
  baseColor: string;
  overlayColor: string;
  /** Initial overlay opacity, at the start of the animation. */
  initialOpacity: number;
  /** Final overlay opacity, at the end of the animation. */
  targetOpacity: number;
  /** Duration in milliseconds. */
  duration: number;
  transitionCurve?: CurveValue;
};
type AnimateOverlayColorsCallback = (color: string) => void;

const updateOverlayColors = (
  options: AnimateOverlayColorsOptions,
  cb: AnimateOverlayColorsCallback,
  startTimestamp: number,
  currentTimestamp: number,
  resolveFn: () => void
) => {
  const {
    baseColor,
    overlayColor,
    initialOpacity,
    targetOpacity,
    duration,
    transitionCurve = [0, 0, 1, 1],
  } = options;

  const elapsed = currentTimestamp - startTimestamp;
  const progress = Math.min(elapsed / duration, 1);

  const currentOpacity =
    initialOpacity +
    (targetOpacity - initialOpacity) *
      (1 -
        getBezierCurvePointY(
          transitionCurve,
          Math.min(Math.max(progress, 0), 1)
        ));
  const currentColor = overlayColors(baseColor, overlayColor, currentOpacity);
  cb(currentColor);

  if (progress >= 1) return resolveFn();
  requestAnimationFrame(timestamp =>
    updateOverlayColors(options, cb, startTimestamp, timestamp, resolveFn)
  );
};

export const animateOverlayColors = async (
  options: AnimateOverlayColorsOptions,
  cb: AnimateOverlayColorsCallback
) => {
  const startTimestamp = performance.now();
  return await new Promise<void>(resolve =>
    requestAnimationFrame(timestamp =>
      updateOverlayColors(options, cb, startTimestamp, timestamp, resolve)
    )
  );
};
