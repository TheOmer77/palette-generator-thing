'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';

import { useComputedBaseColors } from '@/hooks/useComputedBaseColors';
import { useReadonlyTheme } from '@/store/useReadonlyTheme';
import { getPaletteColor, overlayColors } from '@/lib/colorUtils';

const lightBgColor = '#ffffff',
  fallbackColor = '#000000';

const nodeIsVaulOverlay = (node: Node): node is HTMLDivElement =>
  node instanceof HTMLDivElement &&
  node.attributes.getNamedItem('vaul-overlay') !== null;

const ThemeColorMetaContent = () => {
  const { neutral } = useComputedBaseColors();
  const { resolvedTheme } = useReadonlyTheme();

  const [overlayOpacity, setOverlayOpacity] = useState(0);

  const darkBgColor = useMemo(() => getPaletteColor(neutral, 950), [neutral]);
  const themeColorMetaValue = useMemo(() => {
    if (!resolvedTheme) return fallbackColor;

    if (resolvedTheme === 'dark') return darkBgColor;
    if (overlayOpacity <= 0) return lightBgColor;
    return overlayColors(lightBgColor, darkBgColor, overlayOpacity * 0.5);
  }, [darkBgColor, overlayOpacity, resolvedTheme]);

  useEffect(() => {
    const overlayStyleObserver = new MutationObserver(([mutation]) => {
      if (nodeIsVaulOverlay(mutation.target)) {
        const opacity = Number(mutation.target.style.opacity);
        setOverlayOpacity(opacity);
      }
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
        setOverlayOpacity(1);
      }
      if (removedOverlay) {
        overlayStyleObserver.disconnect();
        setOverlayOpacity(0);
      }
    });

    overlayMountObserver.observe(document.body, { childList: true });
    return () => {
      overlayMountObserver.disconnect();
      overlayStyleObserver.disconnect();
    };
  }, []);

  return <meta name='theme-color' content={themeColorMetaValue} />;
};

export const ThemeColorMeta = () => (
  <Suspense>
    <ThemeColorMetaContent />
  </Suspense>
);
