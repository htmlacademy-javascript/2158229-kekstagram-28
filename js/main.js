import { getData } from './api.js';
import { showAlert } from './util.js';
import { createGallery } from './gallery.js';
import { onPhotoUploadFormSubmit, closePhotoUploadForm } from './form.js';

getData()
  .then((pictures) => {
    createGallery(pictures);
  })
  .catch((err) => {
    showAlert(err.message);
  });

onPhotoUploadFormSubmit(closePhotoUploadForm);
