import {activatePage} from './form.js';
import {formElement} from './validation.js';
import {cardHotels} from './data.js';
import {renderCards} from './popup.js';

const addressElement = formElement.querySelector('#address');
const ADDRESS_DEFAULT = {
  lat: 35.68950,
  lng: 139.69171,
};
const SCALE = 10;
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

const getAddress = (coordinates) => {
  const curretAddress = Object.values(coordinates).map((coordinate) => coordinate.toFixed(5));
  addressElement.value = curretAddress;
};

const map = L.map('map-canvas')
  .on('load', () => {
    activatePage();
    getAddress(ADDRESS_DEFAULT);
  })
  .setView(ADDRESS_DEFAULT, SCALE);


L.tileLayer(
  Url.TILE_LAYER,
  {
    attribution: `&copy; <a href=${Url.ATTRIBUTION}>OpenStreetMap</a> contributors`,
  },
).addTo(map);

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

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  const coordinates = evt.target.getLatLng();
  getAddress(coordinates);
});

const ordinaryPinIcon = L.icon({
  iconUrl: Url.ORDINARY_ICON,
  iconSize: IconSize.ORDINARY_SIZE,
  iconAnchor: IconSize.ORDINARY_ANCHOR,
});

const markerGroup = L.layerGroup().addTo(map);

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

cardHotels.forEach((hotel) => {
  getOrdinaryMarkers(hotel);
});
