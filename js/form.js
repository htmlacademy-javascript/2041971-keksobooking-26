const formElement = document.querySelector('.ad-form');
const fieldsetElements = formElement.querySelectorAll('fieldset');
const mapFiltersFormElement = document.querySelector('.map__filters');
const mapFiltersSelectElements = mapFiltersFormElement.querySelectorAll('select');
const mapFeaturesElement = mapFiltersFormElement.querySelector('.map__features');

const deactivatePage = () => {
  //formElement.classList.add('ad-form--disabled');
  //mapFiltersFormElement.classList.add('ad-form--disabled');
  fieldsetElements.forEach((element) => element.setAttribute('disabled', 'disabled'));
  mapFiltersSelectElements.forEach((element) => element.setAttribute('disabled', 'disabled'));
  mapFeaturesElement.setAttribute('disabled', 'disabled');
};

const activateFilters = () => {
  mapFiltersFormElement.classList.remove('ad-form--disabled');
  mapFiltersSelectElements.forEach((element) => element.removeAttribute('disabled'));
  mapFeaturesElement.removeAttribute('disabled');
};

const activatePage = () => {
  formElement.classList.remove('ad-form--disabled');
  fieldsetElements.forEach((element) => element.removeAttribute('disabled'));
  activateFilters();
};


export {deactivatePage, activateFilters, activatePage};
