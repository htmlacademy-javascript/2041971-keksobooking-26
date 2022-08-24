import {renderMarkers} from './map.js';
import {debounce} from './utils.js';

const FILTER_DEFAULT = 'any';
const HOTELS_COUNT = 10;

const Price = {
  MEDIUM: 10000,
  HIGH: 50000,
};

const mapFiltersFormElement = document.querySelector('.map__filters');
const housingTipeElement = mapFiltersFormElement.querySelector('#housing-type');
const housingPriceElement = mapFiltersFormElement.querySelector('#housing-price');
const housingRoomsElement = mapFiltersFormElement.querySelector('#housing-rooms');
const housingGuestsElement = mapFiltersFormElement.querySelector('#housing-guests');

const filterByTipe = (type) => housingTipeElement.value === FILTER_DEFAULT || housingTipeElement.value === type;
const filterByRoom = (rooms) => housingRoomsElement.value === FILTER_DEFAULT || Number(housingRoomsElement.value) === rooms;
const filterByGuests = (guests) => housingGuestsElement.value === FILTER_DEFAULT || Number(housingGuestsElement.value) === guests;
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

const onFilterChange = (data) => {
  const filteredOffers = data.filter(({offer}) => filterByTipe(offer.type)
      && filterByRoom(offer.rooms)
      && filterByGuests(offer.guests)
      && filterByPrice(offer.price)
      && filterByFeatures(offer.features));
  renderMarkers(filteredOffers.slice(0, HOTELS_COUNT));

};

const initFilter = (data) => {
  mapFiltersFormElement.addEventListener('change', debounce(() => onFilterChange(data)));
  mapFiltersFormElement.addEventListener('reset', debounce(() => onFilterChange(data)));
};

export {initFilter};
