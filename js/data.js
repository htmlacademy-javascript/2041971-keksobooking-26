import {getRandomPositiveFloat, getRandomPositiveInteger} from './util.js';

const DESCRIPTIONS = [
  'Отель с общим лаунджем и видом на сад.',
  'Отель расположен в сердце Москвы. К услугам гостей круглосуточная стойка регистрации.',
  'Парам особенно нравится расположение.',
  'К услугам гостей этого отеля ресторан и номера с кондиционером и собственной ванной комнатой.',
  'Отель, отремонтированный в декабре 2015 года, расположен в центре популярного района.',
  'Гости отеля Toggle suidobashi TOKYO могут отдохнуть на террасе.',
];

const TITLES = [
  'toggle hotel suidobashi TOKYO',
  'Keikyu EX Inn Tokyo Nihombashi',
  'Shibuya Tobu Hotel',
  'Hotel Wing International Premium Tokyo Yotsuya',
  'Sotetsu Fresa Inn Tokyo-Kyobashi',
  'hotel MONday Premium Ueno Okachimachi',
];

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const CHECKIN_VARIANTS = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECKOUT_VARIANTS = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const URL = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/';
const PHOTOS = [
  `${URL}duonguyen-8LrGtIxxa4w.jpg`,
  `${URL}brandon-hoogenboom-SNxQGWxZQi0.jpg`,
  `${URL}claire-rendall-b6kAwr1i0Iw.jpg`,
];

const MIN_PRICE = 2000;
const MAX_PRICE = 50000;
const MIN_ROOMS = 1;
const MAX_ROOMS = 5;
const MIN_GUESTS = 1;
const MAX_GUESTS = 5;
const MIN_LAT = 35.65000;
const MAX_LAT = 35.70000;
const MIN_LNG = 139.70000;
const MAX_LNG = 139.80000;
const DIGITS = 5;
const MAX_ID = 10;
const MIN_FEATURES = 1;
const MIN_PHOTOS = 1;

const getRandomElement = (elements) => elements [getRandomPositiveInteger(0, elements.length - 1)];

const getRandomPhoto = () => {
  const photos = getRandomElement(PHOTOS);
  return photos;
};

const getLocation = () => ({
  lat: getRandomPositiveFloat(MIN_LAT, MAX_LAT, DIGITS),
  lng:getRandomPositiveFloat(MIN_LNG, MAX_LNG, DIGITS),
});


const getFeatures = () => {
  const copyFeatures = FEATURES.slice().sort();
  const getRandomFeature = () => {
    const feature = copyFeatures.shift();
    return feature;
  };
  return Array.from({length: getRandomPositiveInteger(MIN_FEATURES, FEATURES.length)}, getRandomFeature);
};

const createDescriptionHotel = (avatarId) => {
  const coordinates = getLocation();

  return {
    author: {
      avatar: `img/avatars/user${avatarId}.png`,
    },
    offer: {
      title: getRandomElement(TITLES),
      address: JSON.stringify(coordinates),
      price: getRandomPositiveInteger(MIN_PRICE, MAX_PRICE),
      type: getRandomElement(TYPES),
      rooms: getRandomPositiveInteger(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomPositiveInteger(MIN_GUESTS, MAX_GUESTS),
      checkin: getRandomElement(CHECKIN_VARIANTS),
      checkout: getRandomElement(CHECKOUT_VARIANTS),
      features: getFeatures(),
      description: getRandomElement(DESCRIPTIONS),
      photos: Array.from({length: getRandomPositiveInteger(MIN_PHOTOS, PHOTOS.length)}, getRandomPhoto),
    },
    location: coordinates,
  };
};

const cardHotels =  Array.from({length: MAX_ID}, (_,i) => {
  const id = `${i+1}`;
  const idAvatar = id.padStart(2, '0');
  return createDescriptionHotel(idAvatar);
});

export {cardHotels};
