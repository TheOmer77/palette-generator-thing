import { useDebugValue } from 'react';

import useMediaQuery from './useMediaQuery';

const useDarkTheme = () => {
  const value = useMediaQuery('(prefers-color-scheme: dark)');
  useDebugValue(value);
  return value;
};

export default useDarkTheme;
