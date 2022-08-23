import {clearMap, getOrdinaryMarkers} from './map.js';
import {debounce} from './utils.js';

const FILTER_DEFAULT = 'any';
const ADS_COUNT = 10;

const Price = {
  MEDIUM: 10000,
  HIGH: 50000,
};

const mapFiltersFormElement = document.querySelector('.map__filters');
const housingTipeElement = mapFiltersFormElement.querySelector('#housing-type');
const housingPriceElement = mapFiltersFormElement.querySelector('#housing-price');
const housingRoomsElement = mapFiltersFormElement.querySelector('#housing-rooms');
const housingGuestsElement = mapFiltersFormElement.querySelector('#housing-guests');
//const housingFeaturesElement = mapFiltersFormElement.querySelector('#housing-features');

const typeFilter = (hotel, type) => type === FILTER_DEFAULT || type === hotel.offer.type;

const roomsFilter = (hotel, rooms) => rooms === FILTER_DEFAULT || parseInt(rooms, 10) === hotel.offer.rooms;

const guestsFilter = (hotel, guests) => guests === FILTER_DEFAULT || parseInt(guests, 10) === hotel.offer.guests;

const priceFilter = (hotel, price) => {
  switch (price) {
    case FILTER_DEFAULT:
      return true;
    case 'low':
      return hotel.offer.price < Price.MEDIUM;
    case 'middle':
      return (hotel.offer.price < Price.HIGH && hotel.offer.price >= Price.MEDIUM);
    case 'high':
      return hotel.offer.price > Price.HIGH;
  }
};

const featuresFilter = (hotel, selectedFeatures) => {
  if (!selectedFeatures.length) {
    return true;
  }

  if (hotel.offer.features) {
    return Array.from(selectedFeatures).every((element) => !hotel.offer.features.includes(element.value));
  }
  return false;
};

const filterAds = (data) => {
  const selectedType = housingTipeElement.value;
  const selectedRooms = housingRoomsElement.value;
  const selectedGuests = housingGuestsElement.value;
  const selectedPrice = housingPriceElement.value;
  const selectedFeatures = Array.from(mapFiltersFormElement.querySelectorAll('input[type="checkbox"]:checked'));

  return data
    .filter((hotel) => typeFilter(hotel, selectedType)
      && roomsFilter(hotel, selectedRooms)
      && guestsFilter(hotel, selectedGuests)
      && priceFilter(hotel, selectedPrice)
      && featuresFilter(hotel, selectedFeatures))
    .slice(0, ADS_COUNT);
};

const onFilterChange = (data) => {
  clearMap();
  const matchedAds = filterAds(data);
  getOrdinaryMarkers(matchedAds);
};

const initFilter = (data) => {
  mapFiltersFormElement.addEventListener('change', debounce(() => onFilterChange(data)));
  mapFiltersFormElement.addEventListener('reset', debounce(() => onFilterChange(data)));
};

export {initFilter};
