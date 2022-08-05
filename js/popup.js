import {createCardHotels} from './data.js';
const mapCanvas = document.querySelector('.map__canvas');

const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const cardHotels = createCardHotels();
const similarListHotels = [];

cardHotels.forEach((hotel) => {
  const cardElement = cardTemplate.cloneNode(true);
  const popupType = cardElement.querySelector('.popup__type');
  const popupPhotos =  cardElement.querySelector('.popup__photos');
  const popupPhotosImg =  cardElement.querySelector('.popup__photos img');

  cardElement.querySelector('.popup__title').textContent = hotel.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = hotel.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${hotel.offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__text--capacity').textContent = `${hotel.offer.rooms} комнаты для ${offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${hotel.offer.checkin}, выезд до ${offer.checkout}`;
  cardElement.querySelector('.popup__features').textContent = hotel.offer.features;
  cardElement.querySelector('.popup__description').textContent = hotel.offer.description;
  cardElement.querySelector('.popup__avatar').src = hotel.author.avatar;

  switch (hotel.offer.type) {
    case 'flat':
      popupType.textContent = 'Квартира';
      break;
    case 'bungalow':
      popupType.textContent = 'Бунгало';
      break;
    case 'house':
      popupType.textContent = 'Дом';
      break;
    case 'palace':
      popupType.textContent = 'Дворец';
      break;
    case 'hotel':
      popupType.textContent = 'Отель';
      break;
  }

  if (hotel.offer.photos.length > 1) {
    popupPhotos.removeChild(popupPhotosImg);
    hotel.offer.photos.forEach((photo) => {
      const photoCopy = popupPhotosImg.cloneNode(true);
      photoCopy.src = photo;
      popupPhotos.append(photoCopy);
    });
  } else {
    popupPhotosImg.src = hotel.offer.photos;
  }

  for (const data of hotel) {
    if (hotel[data] === undefined) {
}

  }
  similarListHotels.push(cardElement);
});

mapCanvas.appendChild(similarListHotels[0]);
console.log (mapCanvas);
