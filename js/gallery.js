import { openBigPhoto } from './comments.js';
import { renderThumbnails } from './thumbnails.js';

const photosContainer = document.querySelector('.pictures');


const createGallery = (pictures) => {
  renderThumbnails(pictures);
  photosContainer.addEventListener('click', (evt) => {
    const activePicture = evt.target.closest('.picture');
    if (activePicture) {
      evt.preventDefault();
      const activePictureId = pictures.find((picture) => picture.id === +activePicture.dataset.id);
      openBigPhoto(activePictureId);
    }
  });
};

export { createGallery };

