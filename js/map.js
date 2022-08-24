import {activatePage} from './form.js';
import {renderCards} from './popup.js';
import {showAlert} from './utils.js';

const ADDRESS_DEFAULT = {
  lat: 35.68950,
  lng: 139.69171,
};
const IconSize = {
  MAIN_SIZE: [52, 52],
  MAIN_ANCHOR: [26, 52],
  ORDINARY_SIZE: [40, 40],
  ORDINARY_ANCHOR: [20, 40],
};
const Url = {
  TILE_LAYER: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  ATTRIBUTION: 'https://www.openstreetmap.org/copyright',
  MAIN_ICON: './img/main-pin.svg',
  ORDINARY_ICON: './img/pin.svg',
};
const SCALE = 10;
const DIGITS = 5;
const MAP_CANVAS = 'map-canvas';
const HOTEL_COUNT = 10;
const formElement = document.querySelector('.ad-form');
const addressElement = formElement.querySelector('#address');

const map = L.map(MAP_CANVAS);
const markerGroup = L.layerGroup().addTo(map);

const mainPinIcon = L.icon({
  iconUrl: Url.MAIN_ICON,
  iconSize: IconSize.MAIN_SIZE,
  iconAnchor: IconSize.MAIN_ANCHOR,
});

const mainPinMarker = L.marker(
  ADDRESS_DEFAULT,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const ordinaryPinIcon = L.icon({
  iconUrl: Url.ORDINARY_ICON,
  iconSize: IconSize.ORDINARY_SIZE,
  iconAnchor: IconSize.ORDINARY_ANCHOR,
});

const getAddress = (coordinates) => {
  addressElement.value = `${coordinates.lat.toFixed(DIGITS)},${coordinates.lng.toFixed(DIGITS)}`;
};

const loadMap = ()  => {
  activatePage();
  getAddress(ADDRESS_DEFAULT);
};

const moveendMainPinMarker = (evt) => {
  const coordinates = evt.target.getLatLng();
  getAddress(coordinates);
};

const getOrdinaryMarkers = (hotel) => {
  const lat = hotel.location.lat;
  const lng = hotel.location.lng;
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      ordinaryPinIcon,
    },
  );
  marker
    .addTo(markerGroup)
    .bindPopup(renderCards(hotel));
};

const renderMarkers = (offers) => {
  map.closePopup();
  markerGroup.clearLayers();
  offers.forEach(getOrdinaryMarkers);
};

const getMap = (data) => {
  map.on('load', loadMap)
    .setView(ADDRESS_DEFAULT, SCALE);

  L.tileLayer(
    Url.TILE_LAYER,
    {
      attribution: `&copy; <a href=${Url.ATTRIBUTION}>OpenStreetMap</a> contributors`,
    },
  ).addTo(map);

  mainPinMarker.addTo(map);
  mainPinMarker.on('moveend', moveendMainPinMarker);

  if (data) {
    data.slice(0, HOTEL_COUNT).forEach((hotel) => {
      getOrdinaryMarkers(hotel);
    });
  } else {
    showAlert('Не удалось загрузить объявления');
  }
};

const resetMap = () => {
  map.setView(
    {
      lat: ADDRESS_DEFAULT.lat,
      lng: ADDRESS_DEFAULT.lng,
    });
  mainPinMarker.setLatLng(
    {
      lat: ADDRESS_DEFAULT.lat,
      lng: ADDRESS_DEFAULT.lng,
    }, SCALE);
  map.closePopup();
  getAddress(ADDRESS_DEFAULT);
};

export {getMap, resetMap, renderMarkers};
