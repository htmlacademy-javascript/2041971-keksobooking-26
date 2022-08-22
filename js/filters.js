//import {getOrdinaryMarkers} from './map/js';

const mapFiltersFormElement = document.querySelector('.map__filters');
const housingTipeElement = mapFiltersFormElement.querySelector('#housing-type');

const onHousingTypeClick = (hotels) => {
  console.log(housingTipeElement.value);
  hotels.map((hotel) => hotel.offer.type).find(housingTipeElement.value);

};
housingTipeElement.addEventListener('change', onHousingTypeClick);
