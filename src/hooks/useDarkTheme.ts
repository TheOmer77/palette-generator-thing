import { useEffect, useState } from 'react';

const useDarkTheme = () => {
  const [value, setValue] = useState<boolean>(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    const eventListener = (e: MediaQueryListEvent) => setValue(e.matches);

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', eventListener);

    return () =>
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', eventListener);
  }, []);

  return value;
};

export default useDarkTheme;
