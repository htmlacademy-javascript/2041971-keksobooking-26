import { getMessageSuccess } from './messages.js';

const getData = async (onSuccess, onFail) => {
  try {
    const response = await fetch(
      'https://26.javascript.pages.academy/keksobooking/data'
    );

    if (!response.ok) {
      throw new Error('Не удалось загрузить объявления');
    }

    const offers = await response.json();
    onSuccess(offers);
  } catch (error) {
    onFail(error.message);
  }
};

const sendData = async (onSuccess, onFail, body) => {
  try {
    const response = await fetch(
      'https://26.javascript.pages.academy/keksobooking',
      {
        mathod: 'POST',
        body,
      }
    );

    if (!response.ok) {
      throw new Error('Не удалось отправить форму. Попробуйте еще раз');
    }

    onSuccess();
    getMessageSuccess();
  } catch (error) {
    onFail(error.message);
  }
};

export {getData, sendData};
