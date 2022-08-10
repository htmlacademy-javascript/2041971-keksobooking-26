const getRandomPositiveFloat = (firstNumber, secondNumber, digits = 1) => {
  const min = Math.min(Math.abs(firstNumber), Math.abs(secondNumber));
  const max = Math.max(Math.abs(firstNumber), Math.abs(secondNumber));
  const result = Math.random() * (max - min) + min;
  return +result.toFixed(digits);
};

const getRandomPositiveInteger = (firstNumber, secondNumber) => {
  const min = Math.ceil(Math.min(Math.abs(firstNumber), Math.abs(secondNumber)));
  const max = Math.floor(Math.max(Math.abs(firstNumber), Math.abs(secondNumber)));
  const result = Math.random() * (max - min + 1) + min;
  return Math.floor(result);
};

export {getRandomPositiveFloat, getRandomPositiveInteger};
