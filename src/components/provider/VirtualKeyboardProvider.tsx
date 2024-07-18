import { useEffect, useState, type PropsWithChildren } from 'react';

import { VirtualKeyboardContext } from '@/hooks/useVirtualKeyboardOpen';

export const VirtualKeyboardProvider = ({ children }: PropsWithChildren) => {
  const [virtualKeyboardOpen, setVirtualKeyboardOpen] = useState(false);
  useEffect(() => {
    const listener = () =>
      setVirtualKeyboardOpen(
        !!visualViewport && window.innerHeight > visualViewport?.height
      );

    visualViewport?.addEventListener('resize', listener);
    return () => visualViewport?.removeEventListener('resize', listener);
  }, []);

  return (
    <VirtualKeyboardContext.Provider value={virtualKeyboardOpen}>
      {children}
    </VirtualKeyboardContext.Provider>
  );
};
