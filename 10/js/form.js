/* Формы загрузки и редактирования изображения */

import { isEscapeKey } from './util.js';
import {resetScale} from './scale.js';
import {resetEffects} from './effects.js';
import { pristineValidate, pristineReset, isTextFieldFocused } from './form-validation.js';

const photoUploadForm = document.querySelector('.img-upload__form');
const photoEditForm = photoUploadForm.querySelector('.img-upload__overlay');
const photoUploadButton = photoUploadForm.querySelector('.img-upload__input');
const photoCloseButton = photoUploadForm.querySelector('.img-upload__cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !isTextFieldFocused()) {
    evt.preventDefault();
    closeImgUploadForm();
  }
};

const openImgUploadForm = () => {
  photoEditForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

photoUploadButton.addEventListener('change', openImgUploadForm);

function closeImgUploadForm() {
  photoUploadForm.reset();
  resetScale();
  resetEffects();
  pristineReset();
  photoEditForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

photoCloseButton.addEventListener('click', closeImgUploadForm);

const onPhotoUploadFormSubmit = (evt) => {
  if (!pristineValidate()) {
    evt.preventDefault();
  }
};

photoUploadForm.addEventListener('submit', onPhotoUploadFormSubmit);
