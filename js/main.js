import { getData } from './api.js';
import { showAlert } from './util.js';
import { createGallery } from './gallery.js';
import { onPhotoUploadFormSubmit, closePhotoUploadForm } from './form.js';
import { showFilters, setFilterClickHandler } from './filter.js';

getData()
  .then((pictures) => {
    createGallery(pictures);
    showFilters();
    setFilterClickHandler(pictures);
  })
  .catch((err) => {
    showAlert(err.message);
  });

onPhotoUploadFormSubmit(closePhotoUploadForm);
