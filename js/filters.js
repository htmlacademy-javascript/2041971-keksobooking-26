import {debounce} from './utils.js';
import {renderMarkers} from './map.js';

const FILTER_DEFAULT = 'any';
const HOTELS_COUNT = 10;
const Price = {
  MEDIUM: 10000,
  HIGH: 50000,
};

const mapFiltersFormElement = document.querySelector('.map__filters');
const housingTypeElement = mapFiltersFormElement.querySelector('#housing-type');
const housingPriceElement = mapFiltersFormElement.querySelector('#housing-price');
const housingRoomsElement = mapFiltersFormElement.querySelector('#housing-rooms');
const housingGuestsElement = mapFiltersFormElement.querySelector('#housing-guests');
const mapFiltersSelectElements = mapFiltersFormElement.querySelectorAll('select');
const mapFeaturesElement = mapFiltersFormElement.querySelector('.map__features');

let offers = [];

const activateFilters = (data) => {
  offers = data;
  mapFiltersFormElement.classList.remove('ad-form--disabled');
  mapFiltersSelectElements.forEach((element) => element.removeAttribute('disabled'));
  mapFeaturesElement.removeAttribute('disabled');
};

const filterByType = (type) => housingTypeElement.value === FILTER_DEFAULT || housingTypeElement.value === type;
const filterByRoom = (rooms) => housingRoomsElement.value === FILTER_DEFAULT || Number(rooms) === Number(housingRoomsElement.value);
const filterByGuests = (guests) => housingGuestsElement.value === FILTER_DEFAULT || Number(guests) === Number(housingGuestsElement.value);
const filterByPrice = (price) => {
  switch (housingPriceElement.value) {
    case FILTER_DEFAULT:
      return true;
    case 'low':
      return price < Price.MEDIUM;
    case 'middle':
      return (price < Price.HIGH && price >= Price.MEDIUM);
    case 'high':
      return price > Price.HIGH;
  }
};
const filterByFeatures = (features) => {
  const checkBoxFeatures = mapFiltersFormElement.querySelectorAll('.map__features :checked');
  if (checkBoxFeatures.length && features) {
    return Array.from(checkBoxFeatures).every((checkFeatures) => features.includes(checkFeatures.value));
  }
  return checkBoxFeatures.length === 0;
};

const filterOffers = () => {
  console.log(offers);
  const filteredOffers = [];
  for (const offer of offers) {
    if (filteredOffers.length >= HOTELS_COUNT) {
      break;
    }

    if (filterByType(offer.offer.type)
        && filterByRoom(offer.offer.rooms)
        && filterByGuests(offer.offer.guests)
        && filterByPrice(offer.offer.price)
        && filterByFeatures(offer.offer.features)
    ) {
      filteredOffers.push(offer);
    }
  }
  console.log(filteredOffers);
  return filteredOffers;
};

const setFilterChange = () => {
  mapFiltersFormElement.addEventListener('change', () => debounce(renderMarkers(filterOffers())));
};

export {activateFilters, setFilterChange};
