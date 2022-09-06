import {setElementValue} from './utils.js';

const HtmlAttribute = {
  TEXT_CONTENT: 'textContent',
  SRC: 'src',
};
const RoomVariations = {
  ONE_ROOM: ' комната',
  HUNDRED_ROOMS: ' комнат',
  DEFAULT_ROOMS: ' комнаты',
};
const GuestVariations = {
  ONE_GUEST: ' гостя',
  DEFAULT_GUESTS: ' гостей',
};
const RoomsNumber = {
  ONE: 1,
  HUNDRED: 100,
};

const cardTemplateElement = document.querySelector('#card')
  .content
  .querySelector('.popup');

const createRoomsVariation = (hotel) => {
  switch (hotel.offer.rooms) {
    case RoomsNumber.ONE:
      hotel.offer.rooms += RoomVariations.ONE_ROOM;
      break;
    case RoomsNumber.HUNDRED:
      hotel.offer.rooms += RoomVariations.HUNDRED_ROOMS;
      break;
    default:
      hotel.offer.rooms += RoomVariations.DEFAULT_ROOMS;
  }
};

const createGuestsVariation = (hotel) => {
  switch (hotel.offer.guests) {
    case 1:
      hotel.offer.guests += GuestVariations.ONE_GUEST;
      break;
    default:
      hotel.offer.guests += GuestVariations.DEFAULT_GUESTS;
  }
};

const createHotelType = (data, element) => {
  if (data) {
    switch (data) {
      case 'flat':
        element.textContent = 'Квартира';
        break;
      case 'bungalow':
        element.textContent = 'Бунгало';
        break;
      case 'house':
        element.textContent = 'Дом';
        break;
      case 'palace':
        element.textContent = 'Дворец';
        break;
      case 'hotel':
        element.textContent = 'Отель';
        break;
    }
  } else {
    element.remove();
  }
};

const createHotelFeatures = (data, element, featuresList) => {
  if (data) {
    data.forEach((feature) => {
      const featureListItemElement = element.querySelector(`.popup__feature--${feature}`);
      featuresList.append(featureListItemElement);
    });
    element.textContent = '';
    element.appendChild(featuresList);
  } else {
    element.textContent = '';
  }
};

const createHotelPhotos = (data, element, imgElement) => {
  if (data) {
    if (data.length > 1) {
      element.removeChild(imgElement);
      data.forEach((photo) => {
        const photoCopy = imgElement.cloneNode(true);
        photoCopy.src = photo;
        element.append(photoCopy);
      });
    } else {
      imgElement.src = data[0];
    }
  } else {
    element.remove();
  }
};

const renderCard = (hotel) => {
  const cardElement = cardTemplateElement.cloneNode(true);
  const popupTypeElement = cardElement.querySelector('.popup__type');
  const popupPhotosElement =  cardElement.querySelector('.popup__photos');
  const popupPhotosImgElement =  cardElement.querySelector('.popup__photos img');
  const popupFeaturesElement = cardElement.querySelector('.popup__features');
  const popupPriceElement = cardElement.querySelector('.popup__text--price');
  const popupCapacityElement = cardElement.querySelector('.popup__text--capacity');
  const popupTimeElement = cardElement.querySelector('.popup__text--time');

  setElementValue(hotel.offer.title, cardElement.querySelector('.popup__title'), HtmlAttribute.TEXT_CONTENT);
  setElementValue(hotel.offer.address, cardElement.querySelector('.popup__text--address'), HtmlAttribute.TEXT_CONTENT);
  setElementValue(hotel.offer.description, cardElement.querySelector('.popup__description'), HtmlAttribute.TEXT_CONTENT);
  setElementValue(hotel.author.avatar, cardElement.querySelector('.popup__avatar'), HtmlAttribute.SRC);

  if (hotel.offer.price) {
    popupPriceElement.textContent = `${hotel.offer.price} ₽/ночь`;
  } else {
    popupPriceElement.remove();
  }

  if (hotel.offer.rooms && hotel.offer.guests) {
    createRoomsVariation(hotel);
    createGuestsVariation(hotel);
    popupCapacityElement.textContent = `${hotel.offer.rooms} для ${hotel.offer.guests} `;
  } else {
    popupCapacityElement.remove();
  }

  if (hotel.offer.checkin && hotel.offer.checkout) {
    popupTimeElement.textContent = `Заезд после ${hotel.offer.checkin}, выезд до ${hotel.offer.checkout}`;
  } else {
    popupTimeElement.remove();
  }

  const featureListFragment = document.createDocumentFragment();

  createHotelFeatures(hotel.offer.features, popupFeaturesElement, featureListFragment);
  createHotelType(hotel.offer.type, popupTypeElement);
  createHotelPhotos(hotel.offer.photos, popupPhotosElement, popupPhotosImgElement);

  return cardElement;
};

export {renderCard};
