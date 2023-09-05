export const getStepDifference = (
  num1: number,
  num2: number,
  steps: number
) => {
  if (steps < 2) throw new Error('Number of steps should be at least 2.');
  return (num2 - num1) / (steps - 1);
};

export const calculateSteps = (num1: number, num2: number, steps: number) => {
  const stepSize = getStepDifference(num1, num2, steps);
  return [...Array(steps).keys()].map(key => num1 + stepSize * key);
};
