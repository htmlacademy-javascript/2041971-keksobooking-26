const getRandomPositiveFloat = (a, b, digits = 1) => {
  const min = Math.min(Math.abs(a), Math.abs(b));
  const max = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (max - min) + min;
  return +result.toFixed(digits);
};

const getRandomPositiveInteger = (a, b) => {
  const min = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const max = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (max - min + 1) + min;
  return Math.floor(result);
};

const DESCRIPTIONS = [
  'Отель с общим лаунджем и видом на сад.',
  'Отель расположен в сердце Москвы. К услугам гостей круглосуточная стойка регистрации.',
  'Парам особенно нравится расположение.', 
  'К услугам гостей этогоотеля ресторан и номера с кондиционером и собственной ванной комнатой.',
  'Отель, отремонтированный в декабря 2015 года, расположен в центре популярного района.',
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

const CHECKIN = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECKOUT = [
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

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
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
const HOTELS_COUNT = 10;

const getRandomElement = (elements) => elements [getRandomPositiveInteger(0, elements.length - 1)];
const idAvatars = Array.from({length: MAX_ID}, (v,k)=> ++k).sort();

const getRandomAvatarId = () => {
  let id = idAvatars.shift();
  if (id < MAX_ID) {
    id = `0${id}`;}
  return id;

};

const getRandomFeature = () => {
  const features = FEATURES.sort();
  const feature = features.shift();
  return feature;
};

const getRandomPhoto = () => {
  const photos = getRandomElement(PHOTOS);
  return photos;
};

const getLocation = () => {
 return { 
    lat: getRandomPositiveFloat(MIN_LAT, MAX_LAT, DIGITS),
    lng:getRandomPositiveFloat(MIN_LNG, MAX_LNG, DIGITS), 
};
};

// const getRandomLng = () => {
//     return getRandomPositiveFloat(MIN_LNG, MAX_LNG, DIGITS);
// };

const createDescriptionHotel = () => {
  const coordinates = getLocation();
  return {
    author: {
      avatar: `img/avatars/user${getRandomAvatarId()}.png`,
    },
    offer: {
      title: getRandomElement(TITLES),
      address: coordinates,
      price: getRandomPositiveInteger(MIN_PRICE, MAX_PRICE),
      type: getRandomElement(TYPES),
      rooms: getRandomPositiveInteger(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomPositiveInteger(MIN_GUESTS, MAX_GUESTS),
      checkin: getRandomElement(CHECKIN),
      checkout: getRandomElement(CHECKOUT),
      features: Array.from({length: getRandomPositiveInteger(0, FEATURES.length)}, getRandomFeature),
      description: getRandomElement(DESCRIPTIONS),
      photos: Array.from({length: getRandomPositiveInteger(0, PHOTOS.length)}, getRandomPhoto),
    },
    location: coordinates,
};
};

const hotels = Array.from({length:HOTELS_COUNT}, createDescriptionHotel);
console.log(hotels);
