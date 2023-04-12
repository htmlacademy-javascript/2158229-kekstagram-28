import { uploadUserPhoto } from './upload-photo.js';
import { sendData } from './api.js';
import { isEscapeKey } from './util.js';
import { resetScale } from './scale.js';
import { resetEffects } from './effects.js';
import { pristineValidate, pristineReset, isTextFieldFocused } from './form-validation.js';
import { getMessageType, openSuccessMessage, openErrorMessage } from './upload-messages.js';

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const photoUploadForm = document.querySelector('.img-upload__form');
const photoEditForm = photoUploadForm.querySelector('.img-upload__overlay');
const photoUploadButton = photoUploadForm.querySelector('.img-upload__input');
const photoCloseButton = photoUploadForm.querySelector('.img-upload__cancel');
const submitButton = photoEditForm.querySelector('.img-upload__submit');

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !isTextFieldFocused() && !getMessageType()) {
    evt.preventDefault();
    onClosePhotoUploadForm();
  }
}

const onOpenPhotoUploadForm = () => {
  photoEditForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  uploadUserPhoto();
};

photoUploadButton.addEventListener('change', onOpenPhotoUploadForm);

function onClosePhotoUploadForm() {
  photoUploadForm.reset();
  resetScale();
  resetEffects();
  pristineReset();
  photoEditForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

photoCloseButton.addEventListener('click', onClosePhotoUploadForm);

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
        .then(() => {
          openSuccessMessage();
          onClosePhotoUploadForm();
        })
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

export { onPhotoUploadFormSubmit, onClosePhotoUploadForm };
