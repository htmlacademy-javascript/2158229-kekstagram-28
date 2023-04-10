import { sendData } from './api.js';
import { isEscapeKey } from './util.js';
import { resetScale } from './scale.js';
import { resetEffects } from './effects.js';
import { pristineValidate, pristineReset, isTextFieldFocused } from './form-validation.js';
import { getMessageType, openSuccessMessage, openErrorMessage } from './upload-messages.js';

const photoUploadForm = document.querySelector('.img-upload__form');
const photoEditForm = photoUploadForm.querySelector('.img-upload__overlay');
const photoUploadButton = photoUploadForm.querySelector('.img-upload__input');
const photoCloseButton = photoUploadForm.querySelector('.img-upload__cancel');
const submitButton = photoEditForm.querySelector('.img-upload__submit');

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !isTextFieldFocused() && !getMessageType()) {
    evt.preventDefault();
    closePhotoUploadForm();
  }
}

const openPhotoUploadForm = () => {
  photoEditForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

photoUploadButton.addEventListener('change', openPhotoUploadForm);

function closePhotoUploadForm() {
  photoUploadForm.reset();
  resetScale();
  resetEffects();
  pristineReset();
  photoEditForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

photoCloseButton.addEventListener('click', closePhotoUploadForm);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const onPhotoUploadFormSubmit = () => {
  photoUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristineValidate()) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(openSuccessMessage)
        .then(closePhotoUploadForm)
        .catch(
          () => {
            openErrorMessage();
          }
        )
        .finally(unblockSubmitButton);
    }
  });
};

photoUploadForm.addEventListener('submit', onPhotoUploadFormSubmit);

export { onPhotoUploadFormSubmit, closePhotoUploadForm };
