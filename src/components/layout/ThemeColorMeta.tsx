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
import { useModal } from '@/hooks/useModal';
import { useReadonlyTheme } from '@/store/useReadonlyTheme';
import { animateOverlayColors } from '@/lib/animateOverlayColors';
import { getPaletteColor, overlayColors } from '@/lib/colorUtils';
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
  const { currentModal, closeModal } = useModal();

  const ref = useRef<ElementRef<'meta'>>(null);
  const lastDragOpacity = useRef<number>(0);

  const darkBgColor = useMemo(() => getPaletteColor(neutral, 950), [neutral]);

  const setThemeColorValue = useCallback(
    (overlayOpacity: number) => {
      if (!resolvedTheme) return;

      if (resolvedTheme === 'dark')
        return ref.current?.setAttribute?.('content', darkBgColor);
      if (overlayOpacity <= 0)
        return ref.current?.setAttribute?.('content', LIGHT_BG_COLOR);

      ref.current?.setAttribute?.(
        'content',
        overlayColors(LIGHT_BG_COLOR, darkBgColor, overlayOpacity * 0.5)
      );
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
    animateThemeColorValue(+(currentModal !== null));
  }, [animateThemeColorValue, currentModal]);

  useEffect(() => {
    const overlayStyleObserver = new MutationObserver(([mutation]) => {
      if (!nodeIsVaulOverlay(mutation.target)) return;

      const opacity = +mutation.target.style.opacity;
      const drawerIsDragged =
        mutation.target.nextElementSibling?.classList.contains(
          DRAWER_DRAG_CLASS
        );

      if (drawerIsDragged) {
        // No transition needed while dragging
        lastDragOpacity.current = opacity;
        return setThemeColorValue(opacity);
      }
      if (opacity === 0) return closeModal();
      animateThemeColorValue(opacity);
    });

    const overlayMountObserver = new MutationObserver(mutations => {
      const addedOverlay = mutations
          .reduce((arr, curr) => [...arr, ...curr.addedNodes], [] as Node[])
          .find(nodeIsVaulOverlay),
        removedOverlay = mutations
          .reduce((arr, curr) => [...arr, ...curr.removedNodes], [] as Node[])
          .find(nodeIsVaulOverlay);

      if (addedOverlay)
        overlayStyleObserver.observe(addedOverlay, {
          attributeFilter: ['style'],
        });
      if (removedOverlay) overlayStyleObserver.disconnect();
    });

    setThemeColorValue(lastDragOpacity.current);
    const existingOverlay = [...document.body.childNodes].find(
      nodeIsVaulOverlay
    );
    if (existingOverlay)
      overlayStyleObserver.observe(existingOverlay, {
        attributeFilter: ['style'],
      });

    overlayMountObserver.observe(document.body, { childList: true });
    return () => {
      overlayMountObserver.disconnect();
      overlayStyleObserver.disconnect();
    };
  }, [animateThemeColorValue, closeModal, setThemeColorValue]);

  return (
    <>
      <meta
        ref={ref}
        name='theme-color'
        content={LIGHT_BG_COLOR}
        {...(!resolvedTheme && { media: '(prefers-color-scheme: light)' })}
      />
      {!resolvedTheme && <meta name='theme-color' content={darkBgColor} />}
    </>
  );
};

export const ThemeColorMeta = () => (
  <Suspense>
    <ThemeColorMetaContent />
  </Suspense>
);
