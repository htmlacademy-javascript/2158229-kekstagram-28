import { isEscapeKey } from './util.js';

const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');

let isOpened = false;

const getMessageType = () => document.querySelector('.error, .success');

const onCloseMessage = () => {
  const message = getMessageType();
  if (message) {
    message.remove();
    isOpened = false;
  }

  document.removeEventListener('click', onOutsideClick);
  document.removeEventListener('keydown', onMessageKeydown);
};

const openErrorMessage = () => {
  if (!isOpened) {
    const error = errorTemplate.cloneNode(true);
    document.body.append(error);
    const errorButton = document.querySelector('.error__button');
    errorButton.addEventListener('click', onCloseMessage);

    document.addEventListener('click', onOutsideClick);
    document.addEventListener('keydown', onMessageKeydown);

    isOpened = true;
  }
};

const openSuccessMessage = () => {
  if (!isOpened) {
    const success = successTemplate.cloneNode(true);
    document.body.append(success);
    const successButton = document.querySelector('.success__button');
    successButton.addEventListener('click', onCloseMessage);

    document.addEventListener('click', onOutsideClick);
    document.addEventListener('keydown', onMessageKeydown);

    isOpened = true;
  }
};

function onMessageKeydown(evt) {
  if (isEscapeKey(evt) && getMessageType()) {
    evt.preventDefault();
    onCloseMessage();
  }
}

function onOutsideClick(evt) {
  const type = getMessageType();
  if (evt.target === type) {
    onCloseMessage();
  }
}

export { getMessageType, openSuccessMessage, openErrorMessage };
