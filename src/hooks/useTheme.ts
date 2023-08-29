import useGlobalState from './useGlobalState';

const useTheme = () => {
  const [{ baseColor }] = useGlobalState();

  return [baseColor];
};

export default useTheme;
