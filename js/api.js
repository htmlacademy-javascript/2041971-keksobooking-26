const Url = {
  GET: 'https://26.javascript.pages.academy/keksobooking/data',
  SEND: 'https://26.javascript.pages.academy/keksobooking',
};
const ErrorMessage = {
  GET_ERROR:'Не удалось загрузить объявления',
  SEND_ERROR: 'Не удалось отправить форму. Попробуйте еще раз'
};

const getData = async (onSuccess, onFail) => {
  try {
    const response = await fetch(Url.GET);

    if (!response.ok) {
      throw new Error(ErrorMessage.GET_ERROR);
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
      Url.SEND,
      {
        method: 'POST',
        body: body,
      }
    );

    if (!response.ok) {
      throw new Error(Url.SEND_ERROR);
    }
    onSuccess();
  } catch (error) {
    onFail(error);
  }
};

export {getData, sendData};
