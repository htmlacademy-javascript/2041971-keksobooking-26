import {createCardHotels} from './data.js';
const mapCanvas = document.querySelector('.map__canvas');

const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const cardHotels = createCardHotels();
//const similarListFragment = document.createDocumentFragment();
const similarListHotels = [];
const setElementValue = (data, element, attribute) => {
  if (data) {
    element[attribute] = data;
  } else {
    element.remove();
  }
};

cardHotels.forEach(({offer, author}) => {
  const cardElement = cardTemplate.cloneNode(true);
  const popupType = cardElement.querySelector('.popup__type');
  const popupPhotos =  cardElement.querySelector('.popup__photos');
  const popupPhotosImg =  cardElement.querySelector('.popup__photos img');
  const popupFeatures = cardElement.querySelector('.popup__features');
  const featureListFragment = document.createDocumentFragment();
  const popupPrice = cardElement.querySelector('.popup__text--price');
  const popupCapacity = cardElement.querySelector('.popup__text--capacity');
  const popupTime = cardElement.querySelector('.popup__text--time');

  setElementValue(offer.title, cardElement.querySelector('.popup__title'), 'textContent');
  setElementValue(offer.address, cardElement.querySelector('.popup__text--address'), 'textContent');
  setElementValue(offer.description, cardElement.querySelector('.popup__description'), 'textContent');
  setElementValue(author.avatar, cardElement.querySelector('.popup__avatar'), 'src');

  if (offer.price) {
    popupPrice.textContent = `${offer.price} ₽/ночь`;
  } else {
    popupPrice.remove();
  }

  if (offer.rooms && offer.guests) {
    switch (offer.rooms) {
      case 1:
        offer.rooms += ' комната';
        break;
      case 5:
        offer.rooms += ' комнат';
        break;
      default:
        offer.rooms += ' комнаты';
    }

    switch (offer.guests) {
      case 1:
        offer.guests += '  гостя';
        break;
      default:
        offer.guests += ' гостей';
    }
    popupCapacity.textContent = `${offer.rooms} для ${offer.guests} `;
  } else {
    popupCapacity.remove();
  }

  if (offer.checkin && offer.checkout) {
    popupTime.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  } else {
    popupTime.remove();
  }

  if (offer.features) {
    offer.features.forEach((feature) => {
      const featureListItem = popupFeatures.querySelector(`.popup__feature--${feature}`);
      featureListFragment.append(featureListItem);
    });
    popupFeatures.textContent = '';
    popupFeatures.appendChild(featureListFragment);
  } else {
    popupFeatures.textContent = '';
  }
  if (offer.type) {
    switch (offer.type) {
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
  } else {
    popupType.remove();
  }

  if (offer.photos) {
    if (offer.photos.length > 1) {
      popupPhotos.removeChild(popupPhotosImg);
      offer.photos.forEach((photo) => {
        const photoCopy = popupPhotosImg.cloneNode(true);
        photoCopy.src = photo;
        popupPhotos.append(photoCopy);
      });
    } else {
      popupPhotosImg.src = offer.photos;
    }
  } else {
    popupPhotos.remove();
  }

  //similarListFragment.appendChild(cardElement);
  similarListHotels.push(cardElement);
});

mapCanvas.appendChild(similarListHotels[3]);
