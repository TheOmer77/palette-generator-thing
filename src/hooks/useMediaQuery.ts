import { useDebugValue, useEffect, useState } from 'react';

const useMediaQuery = (media: string) => {
  const [value, setValue] = useState<boolean>(
    typeof window !== 'undefined' && window.matchMedia(media).matches
  );

  useEffect(() => {
    const eventListener = (e: MediaQueryListEvent) => setValue(e.matches);

    window.matchMedia(media).addEventListener('change', eventListener);

    return () =>
      window.matchMedia(media).removeEventListener('change', eventListener);
  }, [media]);

  useDebugValue(value);

  return value;
};

export default useMediaQuery;
