const body = document.querySelector('body');
const getMessageSuccess = () => {
  const messageTemplateElement = document.querySelector('#success')
    .content
    .querySelector('.success');
  const message = messageTemplateElement.cloneNode(true);
  body.append(message);
};
export {getMessageSuccess};
