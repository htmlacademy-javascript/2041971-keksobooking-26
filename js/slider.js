import {pristine} from './validation.js';

const MinPriceDictionary = {
  MIN_FOR_BUNGALO: 0,
  MIN_FOR_FLAT: 1000,
  MIN_FOR_HOTEL: 3000,
  MIN_FOR_HOUSE: 5000,
  MIN_FOR_PALACE: 10000,
};
const MAX_PRICE = 100000;
const SLIDER_STEP = 1;
const DIGITS = 0;
const formElement = document.querySelector('.ad-form');
const sliderElement = formElement.querySelector('.ad-form__slider');

const initiateSlider = () => {
  const typeElement = formElement.querySelector('#type');
  const priceElement = formElement.querySelector('#price');
  priceElement.min = MinPriceDictionary.MIN_FOR_FLAT;

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
    pristine.validate(priceElement);
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
};

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

export {initiateSlider, resetSlider};
