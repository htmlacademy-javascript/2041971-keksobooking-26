const COMMERCIAL_ROOM = '100';
const NOT_FOR_GUESTS = '0';
const MIN_FOR_BUNGALO = 0;
const MIN_FOR_FLAT = 1000;
const MIN_FOR_HOTEL = 3000;
const MIN_FOR_HOUSE = 5000;
const MIN_FOR_PALACE = 10000;

const form = document.querySelector('.ad-form');
const price = form.querySelector('#price');
const type = form.querySelector('#type');
const timeIn = form.querySelector('#timein');
const timeOut = form.querySelector('#timeout');
const roomNumber = form.querySelector('#room_number');
const capacity = form.querySelector('#capacity');

timeIn.addEventListener('change', () => {
  timeOut.value = timeIn.value;
});

timeOut.addEventListener('change', () => {
  timeIn.value = timeOut.value;
});

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
});

price.min = MIN_FOR_FLAT;
price.placeholder = MIN_FOR_FLAT;

const setMinPrice = () => {
  type.addEventListener('change', () => {
    price.value = '';
    switch (type.value) {
      case 'bungalow':
        price.min = MIN_FOR_BUNGALO;
        price.placeholder = MIN_FOR_BUNGALO;
        break;
      case 'hotel':
        price.min = MIN_FOR_HOTEL;
        price.placeholder = MIN_FOR_HOTEL;
        break;
      case 'house':
        price.min = MIN_FOR_HOUSE;
        price.placeholder = MIN_FOR_HOUSE;
        break;
      case 'palace':
        price.min = MIN_FOR_PALACE;
        price.placeholder = MIN_FOR_PALACE;
        break;
      case 'flat':
        price.min = MIN_FOR_FLAT;
        price.placeholder = MIN_FOR_FLAT;
        break;
    }
  });
};
setMinPrice();
const validatePrice = () => {
  price.addEventListener('input', () => +price.value >= +price.min);
  if (price.value) {
    return +price.value >= +price.min;
  }
};

const validateCapacity = () => {
  if (
    capacity.value === NOT_FOR_GUESTS &&
    roomNumber.value === COMMERCIAL_ROOM
  ) {
    return true;
  } else if (
    capacity.value <= roomNumber.value &&
    capacity.value !== NOT_FOR_GUESTS &&
    roomNumber.value !== COMMERCIAL_ROOM
  ) {
    return true;
  } else {
    return false;
  }
};

pristine.addValidator(price, validatePrice, 'Меньше допустимого значения');
pristine.addValidator(capacity, validateCapacity, 'Недопустимое количество гостей');

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
