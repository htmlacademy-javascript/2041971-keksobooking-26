const COMMERCIAL_ROOM = '100';
const NOT_FOR_GUESTS = '0';
const MIN_FOR_BUNGALO = 0;
const MIN_FOR_FLAT = 1000;
const MIN_FOR_HOTEL = 3000;
const MIN_FOR_HOUSE = 5000;
const MIN_FOR_PALACE = 10000;
const CAPACITY_CARRENT = 1;

const formElement = document.querySelector('.ad-form');
const priceElement = formElement.querySelector('#price');
const typeElement = formElement.querySelector('#type');
const timeInElement = formElement.querySelector('#timein');
const timeOutElement = formElement.querySelector('#timeout');
const roomNumberElement = formElement.querySelector('#room_number');
const capacityElement = formElement.querySelector('#capacity');

timeInElement.addEventListener('change', () => {
  timeOutElement.value = timeInElement.value;
});

timeOutElement.addEventListener('change', () => {
  timeInElement.value = timeOutElement.value;
});

const pristine = new Pristine(formElement, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
});

priceElement.min = MIN_FOR_FLAT;
priceElement.placeholder = MIN_FOR_FLAT;
capacityElement.value = CAPACITY_CARRENT;

const setMinPriceListener = () => {
  typeElement.addEventListener('change', () => {
    priceElement.value = '';
    switch (typeElement.value) {
      case 'bungalow':
        priceElement.min = MIN_FOR_BUNGALO;
        priceElement.placeholder = MIN_FOR_BUNGALO;
        break;
      case 'hotel':
        priceElement.min = MIN_FOR_HOTEL;
        priceElement.placeholder = MIN_FOR_HOTEL;
        break;
      case 'house':
        priceElement.min = MIN_FOR_HOUSE;
        priceElement.placeholder = MIN_FOR_HOUSE;
        break;
      case 'palace':
        priceElement.min = MIN_FOR_PALACE;
        priceElement.placeholder = MIN_FOR_PALACE;
        break;
      case 'flat':
        priceElement.min = MIN_FOR_FLAT;
        priceElement.placeholder = MIN_FOR_FLAT;
        break;
    }
  });
};
setMinPriceListener();
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

formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
