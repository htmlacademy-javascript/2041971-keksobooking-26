const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.querySelectorAll('fieldset');
const mapFiltersForm = document.querySelector('.map__filters');
const mapFiltersFormElements = mapFiltersForm.querySelectorAll('select');

const deactivatePage = () => {
  adForm.classList.add('ad-form--disabled');
  mapFiltersForm.classList.add('ad-form--disabled');
  adFormElements.forEach((element) => element.setAttribute('disabled', 'disabled'));
  mapFiltersFormElements.forEach((element) => element.setAttribute('disabled', 'disabled'));
};
deactivatePage();

const activatePage = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFiltersForm.remove('ad-form--disabled');
  adFormElements.forEach((element) => element.removeAttribute('disabled'));
  mapFiltersFormElements.forEach((element) => element.removeAttribute('disabled'));
};
activatePage();
