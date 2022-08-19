const body = document.querySelector('body');
const getMessageSuccess = () => {
  const messageTemplateElement = document.querySelector('#success')
    .content
    .querySelector('.success');
  const message = messageTemplateElement.cloneNode(true);
  body.append(message);
};

const getMessageError = () => {
  const messageTemplateElement = document.querySelector('#error')
    .content
    .querySelector('.error');
  const message = messageTemplateElement.cloneNode(true);
  body.append(message);
};

export {getMessageSuccess, getMessageError};
