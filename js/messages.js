import {isEscapeKey} from './utils.js';

const bodyElement = document.querySelector('body');

const getMessageSuccess = () => {
  const messageTemplateElement = document.querySelector('#success')
    .content
    .querySelector('.success');
  const messageElement = messageTemplateElement.cloneNode(true);
  bodyElement.append(messageElement);

  const successMessageElement = messageElement.querySelector('.success__message');

  const onMessageEscDown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      onDocumentClickKeydown();
    }
  };

  const onDocumentClick = (evt) => {
    if (evt.target.closest('.success__message') !== successMessageElement) {
      onDocumentClickKeydown();
    }
  };

  function onDocumentClickKeydown () {
    messageElement.classList.add('hidden');
    document.removeEventListener('keydown', onMessageEscDown);
    document.removeEventListener('click', onDocumentClick);
  }

  document.addEventListener('keydown', onMessageEscDown);
  document.addEventListener('click', onDocumentClick);
};

const getMessageError = () => {
  const messageTemplateElement = document.querySelector('#error')
    .content
    .querySelector('.error');
  const messageElement = messageTemplateElement.cloneNode(true);
  bodyElement.append(messageElement);

  const errorMessageElement = messageElement.querySelector('.error__message');
  const errorButtonElement = messageElement.querySelector('.error__button');

  const onMessageEscDown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      onErrorButtonClick();
    }
  };

  const onDocumentClick = (evt) => {
    if (evt.target.closest('.error__message') !== errorMessageElement) {
      onErrorButtonClick();
    }
  };

  function onErrorButtonClick () {
    messageElement.classList.add('hidden');
    errorButtonElement.removeEventListener('click', onErrorButtonClick);
    document.removeEventListener('keydown', onMessageEscDown);
    document.removeEventListener('click', onDocumentClick);
  }

  errorButtonElement.addEventListener('click', onErrorButtonClick);
  document.addEventListener('keydown', onMessageEscDown);
  document.addEventListener('click', onDocumentClick);
};

export {getMessageSuccess, getMessageError};
