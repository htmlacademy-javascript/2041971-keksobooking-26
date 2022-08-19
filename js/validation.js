import {sendData} from './api.js';
import {getMessageSuccess, getMessageError} from './messages.js';

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

const CAPACITY_CARRENT = 1;
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
});

priceElement.min = MinPriceDictionary.MIN_FOR_FLAT;
priceElement.placeholder = MinPriceDictionary.MIN_FOR_FLAT;
capacityElement.value = CAPACITY_CARRENT;

const setMinPriceListener = () => {
  typeElement.addEventListener('change', () => {
    priceElement.value = '';
    switch (typeElement.value) {
      case 'bungalow':
        priceElement.min = MinPriceDictionary.MIN_FOR_BUNGALO;
        priceElement.placeholder = MinPriceDictionary.MIN_FOR_BUNGALO;
        break;
      case 'hotel':
        priceElement.min = MinPriceDictionary.MIN_FOR_HOTEL;
        priceElement.placeholder = MinPriceDictionary.MIN_FOR_HOTEL;
        break;
      case 'house':
        priceElement.min = MinPriceDictionary.MIN_FOR_HOUSE;
        priceElement.placeholder = MinPriceDictionary.MIN_FOR_HOUSE;
        break;
      case 'palace':
        priceElement.min = MinPriceDictionary.MIN_FOR_PALACE;
        priceElement.placeholder = MinPriceDictionary.MIN_FOR_PALACE;
        break;
      case 'flat':
        priceElement.min = MinPriceDictionary.MIN_FOR_FLAT;
        priceElement.placeholder = MinPriceDictionary.MIN_FOR_FLAT;
        break;
    }
  });
};

setMinPriceListener();

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

sliderElement.noUiSlider.on('update', () => {
  priceElement.value = sliderElement.noUiSlider.get();
});

typeElement.addEventListener('change', (evt) => {
  switch (evt.target.selected) {
    case 'bungalow':
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: MinPriceDictionary.MIN_FOR_BUNGALO,
        },
        start: MinPriceDictionary.MIN_FOR_BUNGALO,
      });
      break;
    case 'hotel':
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: MinPriceDictionary.MIN_FOR_HOTEL,
        },
        start: MinPriceDictionary.MIN_FOR_HOTEL,
      });
      break;
    case 'house':
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: MinPriceDictionary.MIN_FOR_HOUSE,
        },
        start: MinPriceDictionary.MIN_FOR_HOUSE,
      });
      break;
    case 'palace':
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: MinPriceDictionary.MIN_FOR_PALACE,
        },
        start: MinPriceDictionary.MIN_FOR_PALACE,
      });
      break;
    case 'flat':
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: MinPriceDictionary.MIN_FOR_PALACE,
        },
        start: MinPriceDictionary.MIN_FOR_FLAT,
      });
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

const sendOnSuccess = () => {
  getMessageSuccess();
  formElement.reset();
};

const showError = () => {
  getMessageError();
};
pristine.validate();

formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    const formData = new FormData(evt.target);
    sendData(sendOnSuccess, showError, formData);
  }
});

export {formElement};
