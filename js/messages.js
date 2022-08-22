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
    if (isEscapeKey) {
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
    if (isEscapeKey) {
      evt.preventDefault();
      onErrorButttonClick();
    }
  };

  const onDocumentClick = (evt) => {
    if (evt.target.closest('.error__message') !== errorMessageElement) {
      onErrorButttonClick();
    }
  };

  function onErrorButttonClick () {
    messageElement.classList.add('hidden');
    errorButtonElement.removeEventListener('click', onErrorButttonClick);
    document.removeEventListener('keydown', onMessageEscDown);
    document.removeEventListener('click', onDocumentClick);
  }

  errorButtonElement.addEventListener('click', onErrorButttonClick);
  document.addEventListener('keydown', onMessageEscDown);
  document.addEventListener('click', onDocumentClick);
};

export {getMessageSuccess, getMessageError};
