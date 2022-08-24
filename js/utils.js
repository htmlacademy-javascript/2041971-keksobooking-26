const ALERT_SHOW_TIME = 5000;
const RERENDER_DELAY = 500;

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

const setElementValue = (data, element, attribute) => {
  if (data) {
    element[attribute] = data;
  } else {
    element.remove();
  }
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('alert-container');

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const debounce = (callback, timeoutDelay = RERENDER_DELAY) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {getRandomPositiveFloat, getRandomPositiveInteger, setElementValue, showAlert, isEscapeKey, debounce};
