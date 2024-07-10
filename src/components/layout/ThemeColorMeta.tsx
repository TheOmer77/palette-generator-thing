'use client';

import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type ElementRef,
} from 'react';

import { useComputedBaseColors } from '@/hooks/useComputedBaseColors';
import { useReadonlyTheme } from '@/store/useReadonlyTheme';
import { animateOverlayColors } from '@/lib/animateOverlayColors';
import { getPaletteColor, overlayColors } from '@/lib/colorUtils';
import { FALLBACK_COLOR } from '@/constants/fallbackColor';
import type { CurveValue } from '@/types/bezierCurve';

const LIGHT_BG_COLOR = '#ffffff';
const DRAWER_TRANSITION_CURVE = [0.32, 0.72, 0, 1] satisfies CurveValue,
  DRAWER_TRANSITION_DURATION = 500, // in milliseconds - 0.5s
  DRAWER_OVERLAY_OPACITY = 0.5,
  DRAWER_DRAG_CLASS = 'vaul-dragging';

const nodeIsVaulOverlay = (node: Node): node is HTMLDivElement =>
  node instanceof HTMLDivElement &&
  node.attributes.getNamedItem('vaul-overlay') !== null;

const ThemeColorMetaContent = () => {
  const { neutral } = useComputedBaseColors();
  const { resolvedTheme } = useReadonlyTheme();

  const ref = useRef<ElementRef<'meta'>>(null);
  const lastDragOpacity = useRef<number>(0);

  const darkBgColor = useMemo(() => getPaletteColor(neutral, 950), [neutral]);

  const getThemeColorValue = useCallback(
    (overlayOpacity: number) => {
      if (!resolvedTheme) return FALLBACK_COLOR;

      if (resolvedTheme === 'dark') return darkBgColor;
      if (overlayOpacity <= 0) return LIGHT_BG_COLOR;
      return overlayColors(LIGHT_BG_COLOR, darkBgColor, overlayOpacity * 0.5);
    },
    [darkBgColor, resolvedTheme]
  );

  const animateThemeColorValue = useCallback(
    async (targetOpacity: number) => {
      if (resolvedTheme === 'dark') return;
      await animateOverlayColors(
        {
          baseColor: LIGHT_BG_COLOR,
          overlayColor: darkBgColor,
          initialOpacity: lastDragOpacity.current * DRAWER_OVERLAY_OPACITY,
          targetOpacity: targetOpacity * DRAWER_OVERLAY_OPACITY,
          duration: DRAWER_TRANSITION_DURATION,
          transitionCurve: DRAWER_TRANSITION_CURVE,
        },
        color => ref.current?.setAttribute?.('content', color)
      );
      lastDragOpacity.current = targetOpacity;
    },
    [darkBgColor, resolvedTheme]
  );

  useEffect(() => {
    const overlayStyleObserver = new MutationObserver(([mutation]) => {
      if (!nodeIsVaulOverlay(mutation.target)) return;
      if (
        !mutation.target.nextElementSibling?.classList.contains(
          DRAWER_DRAG_CLASS
        )
      ) {
        return animateThemeColorValue(+mutation.target.style.opacity);
      }

      // Drawer is being dragged - no transition needed
      const opacity = +mutation.target.style.opacity;
      lastDragOpacity.current = opacity;
      ref.current?.setAttribute?.('content', getThemeColorValue(opacity));
    });

    const overlayMountObserver = new MutationObserver(mutations => {
      const addedOverlay = mutations
          .reduce((arr, curr) => [...arr, ...curr.addedNodes], [] as Node[])
          .find(nodeIsVaulOverlay),
        removedOverlay = mutations
          .reduce((arr, curr) => [...arr, ...curr.removedNodes], [] as Node[])
          .find(nodeIsVaulOverlay);

      if (addedOverlay) {
        overlayStyleObserver.observe(addedOverlay, {
          attributeFilter: ['style'],
        });
        animateThemeColorValue(1);
      }
      if (removedOverlay) overlayStyleObserver.disconnect();
    });

    overlayMountObserver.observe(document.body, { childList: true });
    return () => {
      overlayMountObserver.disconnect();
      overlayStyleObserver.disconnect();
    };
  }, [animateThemeColorValue, getThemeColorValue]);

  if (!resolvedTheme) return null;
  return <meta name='theme-color' content={getThemeColorValue(0)} ref={ref} />;
};

export const ThemeColorMeta = () => (
  <Suspense>
    <ThemeColorMetaContent />
  </Suspense>
);
