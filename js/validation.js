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
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error',
});

price.min = 1000;
price.placeholder = 1000;
const setMinPrice = () => {
  type.addEventListener('change', () => {
    price.value = '';
    price.min = 1000;
    price.placeholder = 1000;
    switch (type.value) {
      case 'bungalow':
        price.min = 0;
        price.placeholder = 0;
        break;
      case 'hotel':
        price.min = 3000;
        price.placeholder = 3000;
        break;
      case 'house':
        price.min = 5000;
        price.placeholder = 5000;
        break;
      case 'palace':
        price.min = 10000;
        price.placeholder = 10000;
        break;
      case 'flat':
      default:
        price.min = 1000;
        price.placeholder = 1000;
        break;
    }
  });
};

const validateCapacity = () => {
  roomNumber.addEventListener('change', () => {
    switch (roomNumber.value) {
      case 1:

    }
  });
};

const validatePrice = () => {
  setMinPrice();
  price.addEventListener('input', () => +price.value >= +price.min);
  if (price.value) {
    return +price.value >= +price.min;
  }
};


pristine.addValidator(price, validatePrice, 'Меньше допустимого значения');


form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
