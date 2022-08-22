import {sendData} from './api.js';
import {getMessageSuccess, getMessageError} from './messages.js';
import {resetMap} from './map.js';

const MinPriceDictionary = {
  MIN_FOR_BUNGALO: 0,
  MIN_FOR_FLAT: 1000,
  MIN_FOR_HOTEL: 3000,
  MIN_FOR_HOUSE: 5000,
  MIN_FOR_PALACE: 10000,
};
const COMMERCIAL_ROOM = '100';
const NOT_FOR_GUESTS = '0';
const MAX_PRICE = 100000;
const SLIDER_STEP = 1;
const DIGITS = 0;

const formElement = document.querySelector('.ad-form');
const priceElement = formElement.querySelector('#price');
const typeElement = formElement.querySelector('#type');
const timeInElement = formElement.querySelector('#timein');
const timeOutElement = formElement.querySelector('#timeout');
const roomNumberElement = formElement.querySelector('#room_number');
const capacityElement = formElement.querySelector('#capacity');
const sliderElement = formElement.querySelector('.ad-form__slider');
const submitButtonElement = formElement.querySelector('.ad-form__submit');
const resetButtonElement = formElement.querySelector('.ad-form__reset');

timeInElement.addEventListener('change', () => {
  timeOutElement.value = timeInElement.value;
});

timeOutElement.addEventListener('change', () => {
  timeInElement.value = timeOutElement.value;
});

const pristine = new Pristine(formElement, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorClass: 'has-danger',
}, );

noUiSlider.create(sliderElement, {
  range: {
    min: MinPriceDictionary.MIN_FOR_FLAT,
    max: MAX_PRICE,
  },
  start: MinPriceDictionary.MIN_FOR_FLAT,
  step: SLIDER_STEP,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(DIGITS);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

const resetSlider = () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: MinPriceDictionary.MIN_FOR_FLAT,
      max: MAX_PRICE,
    },
    start: MinPriceDictionary.MIN_FOR_FLAT,
    step: SLIDER_STEP,
  });
};

sliderElement.noUiSlider.on('update', () => {
  priceElement.value = sliderElement.noUiSlider.get();
});

const onTypeElementClick = (price) => {
  priceElement.min = price;
  priceElement.placeholder = price;
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: price,
      max: MAX_PRICE,
    },
    start: price,
  });
};

typeElement.addEventListener('change', (evt) => {
  priceElement.value = '';
  switch (evt.target.value) {
    case 'bungalow':
      onTypeElementClick(MinPriceDictionary.MIN_FOR_BUNGALO);
      break;
    case 'hotel':
      onTypeElementClick(MinPriceDictionary.MIN_FOR_HOTEL);
      break;
    case 'house':
      onTypeElementClick(MinPriceDictionary.MIN_FOR_HOUSE);
      break;
    case 'palace':
      onTypeElementClick(MinPriceDictionary.MIN_FOR_PALACE);
      break;
    case 'flat':
      onTypeElementClick(MinPriceDictionary.MIN_FOR_FLAT);
      break;
  }
});


const validatePrice = () => {
  priceElement.addEventListener('input', () => +priceElement.value >= +priceElement.min);
  return +priceElement.value >= +priceElement.min;
};

const validateCapacity = () => {
  const isValidCommercial = capacityElement.value === NOT_FOR_GUESTS &&
  roomNumberElement.value === COMMERCIAL_ROOM;
  const isValidCapacity = capacityElement.value <= roomNumberElement.value &&
  capacityElement.value !== NOT_FOR_GUESTS &&
  roomNumberElement.value !== COMMERCIAL_ROOM;

  if (isValidCommercial || isValidCapacity) {
    return true;
  } else {
    return false;
  }
};


pristine.addValidator(priceElement, validatePrice, 'Меньше допустимого значения');
pristine.addValidator(capacityElement, validateCapacity, 'Недопустимое количество гостей');
pristine.addValidator(roomNumberElement, validateCapacity, 'Недопустимое количество комнат');

const onFormReset = () => {
  formElement.reset();
  resetSlider();
  resetMap();
};

resetButtonElement.addEventListener('click', (evt) => {
  evt.preventDefault();
  onFormReset();
});

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'Опубликовать';
};

const sendOnSuccess = () => {
  unblockSubmitButton();
  getMessageSuccess();
  onFormReset();
};

const showError = () => {
  unblockSubmitButton();
  getMessageError();
};

formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitButton();
    const formData = new FormData(formElement);
    sendData(sendOnSuccess, showError, formData);
  }
});

export {formElement};
