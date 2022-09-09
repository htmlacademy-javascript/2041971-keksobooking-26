import {sendData} from './api.js';
import {getMessageSuccess, getMessageError} from './messages.js';
import {resetMap} from './map.js';
import {resetSlider} from './slider.js';
import {resetPhoto} from './add-photo.js';
import {resetFilterForm} from './filters.js';

const COMMERCIAL_ROOM = '100';
const NOT_FOR_GUESTS = '0';
const formElement = document.querySelector('.ad-form');
const priceElement = formElement.querySelector('#price');
const timeInElement = formElement.querySelector('#timein');
const timeOutElement = formElement.querySelector('#timeout');
const roomNumberElement = formElement.querySelector('#room_number');
const capacityElement = formElement.querySelector('#capacity');
const submitButtonElement = formElement.querySelector('.ad-form__submit');
const resetButtonElement = formElement.querySelector('.ad-form__reset');

const pristine = new Pristine(formElement, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorClass: 'has-danger',
}, );

timeInElement.addEventListener('change', () => {
  timeOutElement.value = timeInElement.value;
});

timeOutElement.addEventListener('change', () => {
  timeInElement.value = timeOutElement.value;
});

const validatePrice = () => Number(priceElement.value) >= Number(priceElement.min);

const validateCapacity = () => {
  const isValidCommercial = capacityElement.value === NOT_FOR_GUESTS &&
  roomNumberElement.value === COMMERCIAL_ROOM;
  const isValidCapacity = capacityElement.value <= roomNumberElement.value &&
  capacityElement.value !== NOT_FOR_GUESTS &&
  roomNumberElement.value !== COMMERCIAL_ROOM;

  return (isValidCommercial || isValidCapacity);
};
const onRoomsChange = () => {
  pristine.validate(capacityElement);
  pristine.validate(roomNumberElement);
};
capacityElement.addEventListener('change', onRoomsChange);
roomNumberElement.addEventListener('change', onRoomsChange);

pristine.addValidator(priceElement, validatePrice, 'Меньше допустимого значения');
pristine.addValidator(capacityElement, validateCapacity, 'Недопустимое количество гостей');
pristine.addValidator(roomNumberElement, validateCapacity, 'Недопустимое количество комнат');

const onFormReset = () => {
  formElement.reset();
  resetSlider();
  resetFilterForm();
  resetMap();
  resetPhoto();
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

const onSuccess = () => {
  unblockSubmitButton();
  getMessageSuccess();
  onFormReset();
};

const onError = () => {
  unblockSubmitButton();
  getMessageError();
};

formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitButton();
    const formData = new FormData(formElement);
    sendData(onSuccess, onError, formData);
  }
});

export {pristine};
