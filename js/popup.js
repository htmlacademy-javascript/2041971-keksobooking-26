import {cardHotels} from './data.js';
const mapCanvasElement = document.querySelector('.map__canvas');

const cardTemplateElement = document.querySelector('#card')
  .content
  .querySelector('.popup');

const similarListHotels = [];

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

const renderCards = () =>{
  cardHotels.forEach(({offer, author}) => {
    const cardElement = cardTemplateElement.cloneNode(true);
    const popupTypeElement = cardElement.querySelector('.popup__type');
    const popupPhotosElement =  cardElement.querySelector('.popup__photos');
    const popupPhotosImgElement =  cardElement.querySelector('.popup__photos img');
    const popupFeaturesElement = cardElement.querySelector('.popup__features');
    const popupPriceElement = cardElement.querySelector('.popup__text--price');
    const popupCapacityElement = cardElement.querySelector('.popup__text--capacity');
    const popupTimeElement = cardElement.querySelector('.popup__text--time');

    setElementValue(offer.title, cardElement.querySelector('.popup__title'), HtmlAttribute.TEXT_CONTENT);
    setElementValue(offer.address, cardElement.querySelector('.popup__text--address'), HtmlAttribute.TEXT_CONTENT);
    setElementValue(offer.description, cardElement.querySelector('.popup__description'), HtmlAttribute.TEXT_CONTENT);
    setElementValue(author.avatar, cardElement.querySelector('.popup__avatar'), HtmlAttribute.SRC);

    if (offer.price) {
      popupPriceElement.textContent = `${offer.price} ₽/ночь`;
    } else {
      popupPriceElement.remove();
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
      popupCapacityElement.textContent = `${offer.rooms} для ${offer.guests} `;
    } else {
      popupCapacityElement.remove();
    }

    if (offer.checkin && offer.checkout) {
      popupTimeElement.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
    } else {
      popupTimeElement.remove();
    }

    const featureListFragment = document.createDocumentFragment();

    if (offer.features) {
      offer.features.forEach((feature) => {
        const featureListItemElement = popupFeaturesElement.querySelector(`.popup__feature--${feature}`);
        featureListFragment.append(featureListItemElement);
      });
      popupFeaturesElement.textContent = '';
      popupFeaturesElement.appendChild(featureListFragment);
    } else {
      popupFeaturesElement.textContent = '';
    }
    if (offer.type) {
      switch (offer.type) {
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

    if (offer.photos) {
      if (offer.photos.length > 1) {
        popupPhotosElement.removeChild(popupPhotosImgElement);
        offer.photos.forEach((photo) => {
          const photoCopy = popupPhotosImgElement.cloneNode(true);
          photoCopy.src = photo;
          popupPhotosElement.append(photoCopy);
        });
      } else {
        popupPhotosImgElement.src = offer.photos[0];
      }
    } else {
      popupPhotosElement.remove();
    }
    similarListHotels.push(cardElement);
  });
  mapCanvasElement.appendChild(similarListHotels[3]);
};


export {renderCards};
