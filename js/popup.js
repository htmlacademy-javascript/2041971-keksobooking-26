const cardTemplateElement = document.querySelector('#card')
  .content
  .querySelector('.popup');

const setElementValue = (data, element, attribute) => {
  if (data) {
    element[attribute] = data;
  } else {
    element.remove();
  }
};

const HtmlAttribute = {
  TEXT_CONTENT: 'textContent',
  SRC: 'src',
};

const renderCards = (hotel) => {

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
    switch (hotel.offer.rooms) {
      case 1:
        hotel.offer.rooms += ' комната';
        break;
      case 5:
        hotel.offer.rooms += ' комнат';
        break;
      default:
        hotel.offer.rooms += ' комнаты';
    }

    switch (hotel.offer.guests) {
      case 1:
        hotel.offer.guests += '  гостя';
        break;
      default:
        hotel.offer.guests += ' гостей';
    }
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

  if (hotel.offer.features) {
    hotel.offer.features.forEach((feature) => {
      const featureListItemElement = popupFeaturesElement.querySelector(`.popup__feature--${feature}`);
      featureListFragment.append(featureListItemElement);
    });
    popupFeaturesElement.textContent = '';
    popupFeaturesElement.appendChild(featureListFragment);
  } else {
    popupFeaturesElement.textContent = '';
  }
  if (hotel.offer.type) {
    switch (hotel.offer.type) {
      case 'flat':
        popupTypeElement.textContent = 'Квартира';
        break;
      case 'bungalow':
        popupTypeElement.textContent = 'Бунгало';
        break;
      case 'house':
        popupTypeElement.textContent = 'Дом';
        break;
      case 'palace':
        popupTypeElement.textContent = 'Дворец';
        break;
      case 'hotel':
        popupTypeElement.textContent = 'Отель';
        break;
    }
  } else {
    popupTypeElement.remove();
  }

  if (hotel.offer.photos) {
    if (hotel.offer.photos.length > 1) {
      popupPhotosElement.removeChild(popupPhotosImgElement);
      hotel.offer.photos.forEach((photo) => {
        const photoCopy = popupPhotosImgElement.cloneNode(true);
        photoCopy.src = photo;
        popupPhotosElement.append(photoCopy);
      });
    } else {
      popupPhotosImgElement.src = hotel.offer.photos[0];
    }
  } else {
    popupPhotosElement.remove();
  }
  return cardElement;
};

export {renderCards};
