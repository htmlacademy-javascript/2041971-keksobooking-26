const formElement = document.querySelector('.ad-form');
const fieldsetElements = formElement.querySelectorAll('fieldset');
const mapFiltersFormElement = document.querySelector('.map__filters');
const mapFiltersSelectElements = mapFiltersFormElement.querySelectorAll('select');
const submitButtonElement = formElement.querySelector('.ad-form__submit');

const sendForm = () => {
  submitButtonElement.addEventListener('click', (evt) => {
    evt.preventDefault();
  });
};
sendForm();

const deactivatePage = () => {
  formElement.classList.add('ad-form--disabled');
  mapFiltersFormElement.classList.add('ad-form--disabled');
  fieldsetElements.forEach((element) => element.setAttribute('disabled', 'disabled'));
  mapFiltersSelectElements.forEach((element) => element.setAttribute('disabled', 'disabled'));
};

const activatePage = () => {
  formElement.classList.remove('ad-form--disabled');
  mapFiltersFormElement.remove('ad-form--disabled');
  fieldsetElements.forEach((element) => element.removeAttribute('disabled'));
  mapFiltersSelectElements.forEach((element) => element.removeAttribute('disabled'));
};

export {deactivatePage, activatePage};
