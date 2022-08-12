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
const ICON_SIZE = [52, 52];
const ICON_ANCHOR = [26, 52];


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
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: ICON_SIZE,
  iconAnchor: ICON_ANCHOR,
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
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
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
